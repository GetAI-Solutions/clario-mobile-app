import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserContext  from '../../../context/UserContext';
import FeedbackScreen from '../FeedbackScreen';
import { submitFeedback } from '../../../services/apiService';

jest.mock('../../../services/apiService', () => ({
  submitFeedback: jest.fn(),
}));

const mockUser = {
  uid: '123',
};

describe('FeedbackScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and submits feedback', async () => {
    const { getByText, getByPlaceholderText } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <FeedbackScreen navigation={{ navigate: jest.fn() }} />
      </UserContext.Provider>
    );

    // Input a comment
    const commentInput = getByPlaceholderText('Your message here');
    fireEvent.changeText(commentInput, 'Great app!');

    // Mock the submitFeedback response
    submitFeedback.mockResolvedValueOnce({ status: 200 });

    // Submit the feedback
    fireEvent.press(getByText('Send Feedback'));

    // Check for loading indicator
    expect(getByText('Send Feedback')).toBeDisabled();
    expect(getByText('Sending...')).toBeTruthy();

    await waitFor(() => {
      expect(submitFeedback).toHaveBeenCalledWith(mockUser.uid, 'Great app!');
      expect(getByText('Duly Noted!')).toBeTruthy(); // Check modal appears
    });
  });

  it('handles submission errors', async () => {
    const { getByText, getByPlaceholderText } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <FeedbackScreen navigation={{ navigate: jest.fn() }} />
      </UserContext.Provider>
    );

    // Input a comment
    const commentInput = getByPlaceholderText('Your message here');
    fireEvent.changeText(commentInput, 'Great app!');

    // Mock the submitFeedback response to throw an error
    submitFeedback.mockRejectedValueOnce(new Error('Network error'));

    // Submit the feedback
    fireEvent.press(getByText('Send Feedback'));

    await waitFor(() => {
      expect(submitFeedback).toHaveBeenCalledWith(mockUser.uid, 'Great app!');
      expect(getByText('Failed to submit feedback. Please try again later.')).toBeTruthy(); // Check for error alert
    });
  });
});
