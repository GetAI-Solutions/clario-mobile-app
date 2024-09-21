import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddEmail from '../addEmail';
import { signup } from '../../../services/authService'; 
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemeProvider } from '../../../context/ThemeContext'; 

jest.mock('../../../services/authService', () => ({
  signup: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

// Mock the route
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(() => mockNavigation),
}));

describe('AddEmail Screen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useRoute.mockReturnValue({
      params: {
        email: 'test@example.com',
        password: 'password123',
      },
    });
  });

  test('renders AddEmail screen elements correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <ThemeProvider>
        <AddEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    expect(getByText('Complete your signup')).toBeTruthy();
    expect(getByText('Please provide your full name and country to finish your registration.')).toBeTruthy();
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByText('Signup')).toBeTruthy();
  });

  test('disables the signup button if full name is not entered', () => {
    const { getByText } = render(
      <ThemeProvider>
        <AddEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const signupButton = getByText('Signup');
    expect(signupButton.props.accessibilityState.disabled).toBe(true); 
  });

  test('enables the signup button when full name is entered', () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <AddEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const fullNameInput = getByPlaceholderText('Full Name');
    fireEvent.changeText(fullNameInput, 'John Doe');

    const signupButton = getByText('Signup');
    expect(signupButton.props.accessibilityState.disabled).toBe(false); 
  });

  test('calls signup service and navigates to Login on successful signup', async () => {
    signup.mockResolvedValueOnce({ status: 200 });

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <AddEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const fullNameInput = getByPlaceholderText('Full Name');
    const signupButton = getByText('Signup');

    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        email: 'test@example.com',
        user_name: 'John Doe',
        password: 'password123',
        country: 'Ethiopia', 
        preferred_language: 'en',
      });
      expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
  });

  test('shows alert when signup fails with 400 error', async () => {
    signup.mockResolvedValueOnce({ status: 400 });
    jest.spyOn(Alert, 'alert');

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <AddEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const fullNameInput = getByPlaceholderText('Full Name');
    const signupButton = getByText('Signup');

    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Email already registered!');
    });
  });

  test('shows appropriate error alert when network error occurs', async () => {
    signup.mockRejectedValueOnce(new Error('Network Error'));
    jest.spyOn(Alert, 'alert');

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <AddEmail navigation={mockNavigation} />
      </ThemeProvider>
    );

    const fullNameInput = getByPlaceholderText('Full Name');
    const signupButton = getByText('Signup');

    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Network Error', 'No response received from the server. Please check your internet connection.');
    });
  });
});
