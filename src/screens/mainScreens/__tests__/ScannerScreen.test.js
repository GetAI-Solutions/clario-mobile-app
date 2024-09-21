import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductContext  from '../../../context/ProductContext';
import UserContext  from '../../../context/UserContext';
import ScannerScreen from '../ScannerScreen';
import { getProductSummary } from '../../../services/apiService';

jest.mock('expo-barcode-scanner', () => ({
  requestPermissionsAsync: jest.fn(),
  BarCodeScanner: jest.fn(({ onBarCodeScanned }) => (
    <TouchableOpacity onPress={() => onBarCodeScanned({ type: 'barcode', data: '12345' })}>
      <Text>Scan</Text>
    </TouchableOpacity>
  )),
}));

jest.mock('../../../services/apiService', () => ({
  getProductSummary: jest.fn(),
}));

const mockSetProducts = jest.fn();
const mockUser = { uid: '123' };

describe('ScannerScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('requests camera permissions and scans a barcode', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <ProductContext.Provider value={{ setProducts: mockSetProducts }}>
          <ScannerScreen navigation={{ navigate: jest.fn() }} />
        </ProductContext.Provider>
      </UserContext.Provider>
    );

    // Mocking permission response
    BarCodeScanner.requestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });

    await waitFor(() => {
      expect(getByText('Scan')).toBeTruthy();
    });

    // Mocking product summary response
    getProductSummary.mockResolvedValueOnce({ product: { id: '12345', name: 'Test Product' } });

    // Simulate scanning a barcode
    fireEvent.press(getByText('Scan'));

    await waitFor(() => {
      expect(getProductSummary).toHaveBeenCalledWith('12345', mockUser.uid);
      expect(mockSetProducts).toHaveBeenCalled();
      expect(getByText('Test Product')).toBeTruthy(); // Assuming you navigate to a ProductDetails screen displaying this product
    });
  });

  it('handles errors during product scanning', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <ProductContext.Provider value={{ setProducts: mockSetProducts }}>
          <ScannerScreen navigation={{ navigate: jest.fn() }} />
        </ProductContext.Provider>
      </UserContext.Provider>
    );

    BarCodeScanner.requestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });

    await waitFor(() => {
      expect(getByText('Scan')).toBeTruthy();
    });

    // Mocking product summary error
    getProductSummary.mockRejectedValueOnce({ response: { status: 404 } });

    // Simulate scanning a barcode
    fireEvent.press(getByText('Scan'));

    await waitFor(() => {
      expect(getProductSummary).toHaveBeenCalledWith('12345', mockUser.uid);
      expect(getByText('No product found')).toBeTruthy(); // Assuming this is the error message displayed
    });
  });

  it('denies camera access', async () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <ProductContext.Provider value={{ setProducts: mockSetProducts }}>
          <ScannerScreen navigation={{ navigate: jest.fn() }} />
        </ProductContext.Provider>
      </UserContext.Provider>
    );

    // Mocking permission response
    BarCodeScanner.requestPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });

    await waitFor(() => {
      expect(getByText('No access to camera')).toBeTruthy();
    });
  });
});
