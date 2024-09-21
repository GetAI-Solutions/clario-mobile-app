import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserContext  from '../../../context/UserContext';
import SettingsScreen from '../Settings';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-native-push-notification', () => ({
  requestPermissions: jest.fn(),
}));

const mockUser = {
  uid: '123',
  preferred_language: 'en',
};

const mockSetUser = jest.fn();

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and allows toggling notifications', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <SettingsScreen />
      </UserContext.Provider>
    );

    const notificationSwitch = getByText('Notifications').parent.findByType(Switch);
    expect(notificationSwitch.props.value).toBe(false); // Default state

    // Toggle the switch
    fireEvent.press(notificationSwitch);
    
    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
      expect(getByText('Notifications have been turned on')).toBeTruthy();
    });

    // Toggle it off
    fireEvent.press(notificationSwitch);

    await waitFor(() => {
      expect(getByText('Notifications have been turned off')).toBeTruthy();
    });
  });

  it('allows changing the language', async () => {
    const { getByText, getByTestId } = render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <SettingsScreen />
      </UserContext.Provider>
    );

    // Open language modal
    fireEvent.press(getByText('Languages'));

    // Mock axios response for language change
    axios.patch.mockResolvedValueOnce({ status: 200 });

    // Change language to French
    fireEvent.press(getByText('French'));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(`${BASEURL}/users/update-user-preference`, {
        user_id: mockUser.uid,
        preferred_language: 'fr',
      });
      expect(mockSetUser).toHaveBeenCalledWith({
        ...mockUser,
        preferred_language: 'fr',
      });
      expect(getByText('Language preference updated successfully')).toBeTruthy();
    });
  });

  it('toggles dark mode', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <SettingsScreen />
      </UserContext.Provider>
    );

    const darkModeSwitch = getByText('Dark Mode').parent.findByType(Switch);
    expect(darkModeSwitch.props.value).toBe(false); // Default state

    // Toggle the switch to enable dark mode
    fireEvent.press(darkModeSwitch);
    expect(mockSetUser).toHaveBeenCalled(); // Assuming the toggleTheme updates user state
  });
});
