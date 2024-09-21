import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OTPPage from '../../../screens/authScreens/OTPPage'; 
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe('OTPPage Screen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {
        otp: '123456', 
        email: 'test@example.com',
      },
    });
  });

  test('renders OTPPage screen elements correctly', () => {
    const { getByText, getAllByPlaceholderText } = render(
      <OTPPage navigation={{ navigate: mockNavigate }} />
    );

    expect(getByText('Confirm Your Email')).toBeTruthy();
    expect(getByText("We've sent a code to test@example.com")).toBeTruthy();
    expect(getAllByPlaceholderText('')).toHaveLength(6); 
    expect(getByText('Verify')).toBeTruthy();
  });

  test('disables the verify button when all OTP fields are not filled', () => {
    const { getByText } = render(<OTPPage navigation={{ navigate: mockNavigate }} />);

    const verifyButton = getByText('Verify');
    expect(verifyButton.props.accessibilityState.disabled).toBe(true); 
  });

  test('enables the verify button when all OTP fields are filled', () => {
    const { getByText, getAllByPlaceholderText } = render(
      <OTPPage navigation={{ navigate: mockNavigate }} />
    );

    const otpInputs = getAllByPlaceholderText('');
    otpInputs.forEach((input, index) => fireEvent.changeText(input, `${index + 1}`));

    const verifyButton = getByText('Verify');
    expect(verifyButton.props.accessibilityState.disabled).toBe(false); 
  });

  test('alerts success and navigates to PasswordReset on correct OTP', async () => {
    jest.spyOn(Alert, 'alert');

    const { getByText, getAllByPlaceholderText } = render(
      <OTPPage navigation={{ navigate: mockNavigate }} />
    );

    const otpInputs = getAllByPlaceholderText('');
    ['1', '2', '3', '4', '5', '6'].forEach((digit, index) =>
      fireEvent.changeText(otpInputs[index], digit)
    );

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'OTP verified successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('PasswordReset', { email: 'test@example.com' });
    });
  });

  test('shows error alert on incorrect OTP', async () => {
    jest.spyOn(Alert, 'alert');

    const { getByText, getAllByPlaceholderText } = render(
      <OTPPage navigation={{ navigate: mockNavigate }} />
    );

    const otpInputs = getAllByPlaceholderText('');
    ['6', '5', '4', '3', '2', '1'].forEach((digit, index) =>
      fireEvent.changeText(otpInputs[index], digit)
    ); // Enter incorrect OTP

    const verifyButton = getByText('Verify');
    fireEvent.press(verifyButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid OTP. Please try again.');
    });
  });
});
