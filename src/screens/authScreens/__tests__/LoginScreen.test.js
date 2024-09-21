import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../LoginScreen';
import { loginUser } from '../../../services/authService';
import UserContext from '../../../context/UserContext';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock async storage utilities
jest.mock('../../../utils/storageUtils', () => ({
  storeUserData: jest.fn(),
}));


jest.mock('@react-native-async-storage/async-storage', () => ({
  removeItem: jest.fn(),
}));

jest.mock('../../../services/authService', () => ({
  loginUser: jest.fn(),
}));

describe('Login Screen', () => {
  it('should render the login screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    expect(getByText('Log in to your account')).toBeTruthy();
    expect(getByPlaceholderText('Email Address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should update email and password input fields', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('should toggle password visibility', () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />);
    const passwordInput = getByPlaceholderText('Password');
    const toggleButton = getByTestId('togglePasswordVisibility');
    
    fireEvent.press(toggleButton);
    expect(passwordInput.props.secureTextEntry).toBe(false); // Password should be visible
  });

  it('should call loginUser with correct credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        login_type: 'email',
      });
    });
  });

  it('should show error message on invalid login', async () => {
    loginUser.mockRejectedValueOnce({
      response: { status: 401, data: { message: 'Invalid email or password' } },
    });

    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    fireEvent.changeText(emailInput, 'wrong@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Invalid email or password.')).toBeTruthy();
    });
  });
});
