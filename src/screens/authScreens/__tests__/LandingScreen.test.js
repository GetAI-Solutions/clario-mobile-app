import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Landing from '../LandingScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('Landing Screen', () => {
  it('should render the correct elements', () => {
    const { getByText, getByTestId } = render(<Landing />);
    expect(getByText('Create your GetAI account')).toBeTruthy();
    expect(getByText('GetAI is an AI-powered barcode scanner...')).toBeTruthy();
    expect(getByText('Sign up')).toBeTruthy();
    expect(getByText('Log in')).toBeTruthy();
  });

  it('should navigate to Signup screen when Sign up button is pressed', () => {
    const navigation = useNavigation();
    const { getByText } = render(<Landing />);
    const signupButton = getByText('Sign up');
    
    fireEvent.press(signupButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Signup');
  });

  it('should navigate to Login screen when Log in button is pressed', () => {
    const navigation = useNavigation();
    const { getByText } = render(<Landing />);
    const loginButton = getByText('Log in');
    
    fireEvent.press(loginButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('should open Terms and Privacy Policy links', () => {
    const { getByText } = render(<Landing />);
    const termsLink = getByText('Terms of Service');
    
    fireEvent.press(termsLink);
    // You may want to mock Linking.openURL if needed
  });
});
