import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserContext  from '../../../context/UserContext';
import { ProductContext } from '../../context/ProductContext';
import UploadScreen from '../UploadScreen';
import * as ImagePicker from 'expo-image-picker';
import { uploadBarcode, getProductSummary } from '../../../services/apiService';

jest.mock('expo-image-picker');
jest.mock('../../../services/apiService', () => ({
  uploadBarcode: jest.fn(),
  getProductSummary: jest.fn(),
}));

const mockUser = {
  uid: '123',
};

const mockSetProducts = jest.fn();

describe('UploadScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and allows image upload', async () => {
    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <ProductContext.Provider value={{ setProducts: mockSetProducts }}>
          <UploadScreen />
        </ProductContext.Provider>
      </UserContext.Provider>
    );

    // Simulate image selection
    ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: 'mockImageUri' }],
    });

    uploadBarcode.mockResolvedValueOnce({ product_barcode: '1234567890' });
    getProductSummary.mockResolvedValueOnce({ product: { name: 'Test Product' } });

    fireEvent.press(getByText('Upload Image'));

    await waitFor(() => {
      expect(getByRole('activityindicator')).toBeTruthy(); // Check if loading indicator is visible
    });

    await waitFor(() => {
      expect(uploadBarcode).toHaveBeenCalled();
      expect(getProductSummary).toHaveBeenCalledWith('1234567890', mockUser.uid);
    });

    expect(mockSetProducts).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ name: 'Test Product' })]));
  });

  it('handles errors correctly', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <ProductContext.Provider value={{ setProducts: mockSetProducts }}>
          <UploadScreen />
        </ProductContext.Provider>
      </UserContext.Provider>
    );

    // Simulate image selection
    ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: 'mockImageUri' }],
    });

    uploadBarcode.mockRejectedValueOnce({ response: { status: 404 } });

    fireEvent.press(getByText('Upload Image'));

    await waitFor(() => {
      expect(getByText('Try another image')).toBeTruthy(); // Check if error message is shown
    });
  });
});
