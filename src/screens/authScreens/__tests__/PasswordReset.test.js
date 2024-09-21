import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PasswordReset from '../../../screens/authScreens/PasswordReset'; 
import { Alert } from 'react-native';
import { updatePassword } from '../../../services/apiService'; 
import { useRoute } from '@react-navigation/native';

// Mock the required modules
jest.mock('../../../services/apiService');
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe('PasswordReset Screen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useRoute.mockReturnValue({
      params: {
        email: 'test@example.com',
      },
    });
  });

  test('renders PasswordReset screen elements correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <PasswordReset navigation={{ navigate: mockNavigate }} />
    );

    expect(getByText('Password Reset')).toBeTruthy();
    expect(getByPlaceholderText('New Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Reset Password')).toBeTruthy();
  });

  test('shows error if passwords do not match', () => {
    jest.spyOn(Alert, 'alert');

    const { getByPlaceholderText, getByText } = render(
      <PasswordReset navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.changeText(getByPlaceholderText('New Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password321');

    fireEvent.press(getByText('Reset Password'));

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Passwords do not match!');
  });

  test('calls updatePassword and navigates to Login on successful password reset', async () => {
    jest.spyOn(Alert, 'alert');
    updatePassword.mockResolvedValue({ status: 200 }); // Mock successful API response

    const { getByPlaceholderText, getByText } = render(
      <PasswordReset navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.changeText(getByPlaceholderText('New Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');

    fireEvent.press(getByText('Reset Password'));

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Password has been reset!');
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
  });

  test('shows error alert on failed password reset', async () => {
    jest.spyOn(Alert, 'alert');
    updatePassword.mockRejectedValueOnce(new Error('Failed to reset password')); // Mock failed API response

    const { getByPlaceholderText, getByText } = render(
      <PasswordReset navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.changeText(getByPlaceholderText('New Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');

    fireEvent.press(getByText('Reset Password'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Something went wrong. Please try again.');
    });
  });

  test('displays loading indicator when reset button is pressed', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <PasswordReset navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.changeText(getByPlaceholderText('New Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');

    fireEvent.press(getByText('Reset Password'));

    expect(getByTestId('loading-indicator')).toBeTruthy(); // Loading indicator should show when button is pressed
  });
});
