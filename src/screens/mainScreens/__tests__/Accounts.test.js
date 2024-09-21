import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserContext from '../../../context/UserContext';
import AccountSecurityScreen from '../Accounts';
import { updateUser } from '../../../services/apiService';

jest.mock('../../services/apiService', () => ({
  updateUser: jest.fn(),
}));

const mockUser = {
  uid: '123',
  user_name: 'John Doe',
  email: 'john@example.com',
  profileImage: 'https://via.placeholder.com/100',
};

const mockSetUser = jest.fn();

describe('AccountSecurityScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and allows updating user information', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <AccountSecurityScreen />
      </UserContext.Provider>
    );

    // Check initial values
    expect(getByPlaceholderText('Full Name').props.value).toBe(mockUser.user_name);
    expect(getByPlaceholderText('Email').props.value).toBe(mockUser.email);

    // Change values
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'Jane Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'jane@example.com');

    // Mock the API response
    updateUser.mockResolvedValueOnce({ status: 200 });

    // Save changes
    fireEvent.press(getByText('Save Changes'));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        user_id: mockUser.uid,
        email: 'jane@example.com',
        user_name: 'Jane Doe',
        phone_no: '', // Assuming phoneNumber is not set in the mock
        profileImage: mockUser.profileImage,
      });
      expect(mockSetUser).toHaveBeenCalledWith({
        ...mockUser,
        user_name: 'Jane Doe',
        email: 'jane@example.com',
      });
    });

    // Confirm success alert (if applicable)
    // This would require you to mock Alert.alert if you want to check for it
  });

  it('handles profile image change', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <AccountSecurityScreen />
      </UserContext.Provider>
    );

    // Mock the image picker response
    jest.mock('expo-image-picker', () => ({
      launchImageLibraryAsync: jest.fn().mockResolvedValue({
        canceled: false,
        assets: [{ uri: 'https://example.com/new-image.png' }],
      }),
    }));

    // Change profile image
    fireEvent.press(getByText('Change Picture'));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        ...mockUser,
        profileImage: 'https://example.com/new-image.png',
      });
    });
  });
});
