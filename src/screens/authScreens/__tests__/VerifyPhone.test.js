import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import VerifyPhone from '../../../screens/authScreens/verifyPhone'; 
import { Alert } from 'react-native';
import { sendOtp } from '../../../services/authService'; 
import { useRoute } from '@react-navigation/native';

// Mock the necessary modules
jest.mock('../../../services/authService');
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe('VerifyPhone Screen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {
        email: 'test@example.com',
        otp: '123456',
        password: 'password123',
      },
    });
  });

  test('renders VerifyPhone screen elements correctly', () => {
    const { getByText, getAllByPlaceholderText } = render(
      <VerifyPhone navigation={{ navigate: mockNavigate }} />
    );

    expect(getByText('Confirm Your Email')).toBeTruthy();
    expect(getByText('We\'ve sent a code to test@example.com')).toBeTruthy();
    expect(getAllByPlaceholderText('').length).toBe(6); // 6 OTP inputs
    expect(getByText('Verify')).toBeTruthy();
  });

  test('validates OTP and navigates to EmailSignup on success', async () => {
    jest.spyOn(Alert, 'alert');

    const { getAllByPlaceholderText, getByText } = render(
      <VerifyPhone navigation={{ navigate: mockNavigate }} />
    );

    const otpInputs = getAllByPlaceholderText('');
    otpInputs.forEach((input, index) => {
      fireEvent.changeText(input, String(index + 1)); 
    });

    fireEvent.press(getByText('Verify'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'OTP verified successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('EmailSignup', {
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('shows error on invalid OTP', async () => {
    jest.spyOn(Alert, 'alert');

    const { getAllByPlaceholderText, getByText } = render(
      <VerifyPhone navigation={{ navigate: mockNavigate }} />
    );

    const otpInputs = getAllByPlaceholderText('');
    otpInputs.forEach((input, index) => {
      fireEvent.changeText(input, String(index)); // Fill inputs with '012345'
    });

    fireEvent.press(getByText('Verify'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid OTP. Please try again.');
    });
  });

  test('resend OTP and updates current OTP on success', async () => {
    jest.spyOn(Alert, 'alert');
    sendOtp.mockResolvedValueOnce({ data: { otp: '654321' } });

    const { getByText } = render(
      <VerifyPhone navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.press(getByText('Resend'));

    await waitFor(() => {
      expect(sendOtp).toHaveBeenCalledWith('test@example.com');
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'A new OTP has been sent to your email.');
    });
  });

  test('shows error alert if resend OTP fails', async () => {
    jest.spyOn(Alert, 'alert');
    sendOtp.mockRejectedValueOnce(new Error('Failed to resend OTP'));

    const { getByText } = render(
      <VerifyPhone navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.press(getByText('Resend'));

    await waitFor(() => {
      expect(sendOtp).toHaveBeenCalledWith('test@example.com');
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to resend OTP. Please try again later.');
    });
  });

  test('resend button is disabled during countdown', async () => {
    const { getByText } = render(
      <VerifyPhone navigation={{ navigate: mockNavigate }} />
    );

    expect(getByText(/Resend \(30s\)/)).toBeTruthy(); // Countdown is at 30 seconds

    await waitFor(
      () => {
        expect(getByText('Resend')).toBeTruthy(); // Countdown is finished and button is enabled
      },
      { timeout: 31000 } // 31 seconds to simulate countdown
    );
  });
});
