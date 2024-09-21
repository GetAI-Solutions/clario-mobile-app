import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupEmail from '../../../screens/authScreens/SignupEmail'; 
import { sendOtp } from '../../../services/authService';
import { ThemeProvider } from '../../../context/ThemeContext'; 

// Mock the sendOtp service
jest.mock('../../../services/authService', () => ({
  sendOtp: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe('SignupEmail Screen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders SignupEmail screen elements correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <SignupEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    expect(getByPlaceholderText('Email Address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
  });

  test('shows error if email and password are not provided', async () => {
    const { getByText } = render(
      <ThemeProvider>
        <SignupEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(sendOtp).not.toHaveBeenCalled();
    });
  });

  test('sends OTP and navigates to VerifyEmail when valid email and password are entered', async () => {
    sendOtp.mockResolvedValueOnce({ data: { otp: '123456' } });

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <SignupEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const continueButton = getByText('Continue');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(sendOtp).toHaveBeenCalledWith('test@example.com');
      expect(mockNavigate).toHaveBeenCalledWith('VerifyEmail', {
        email: 'test@example.com',
        password: 'password123',
        otp: '123456',
      });
    });
  });

  test('shows a loading indicator while the OTP is being sent', async () => {
    sendOtp.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <ThemeProvider>
        <SignupEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const continueButton = getByText('Continue');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(continueButton);

    // Check if the loading indicator is visible
    expect(queryByTestId('loading-indicator')).toBeTruthy();
  });
});
