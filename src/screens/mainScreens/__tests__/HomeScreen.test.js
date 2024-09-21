import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen'; 
import { ProductContext } from '../../context/ProductContext';
import { fetchHomePageProducts } from '../../../services/apiService'; 

jest.mock('../../services/apiService'); 

const mockNavigation = {
  navigate: jest.fn(),
};

const MockProvider = ({ children }) => {
  return (
      <ProductContext.Provider value={{ setProducts: jest.fn() }}>
        {children}
      </ProductContext.Provider>
  );
};

describe('HomeScreen', () => {
  beforeEach(() => {
    fetchHomePageProducts.mockClear();
  });

  it('renders loading state initially', () => {
    const { getByText } = render(
      <MockProvider>
        <HomeScreen navigation={mockNavigation} />
      </MockProvider>
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('displays an error message on API failure', async () => {
    fetchHomePageProducts.mockRejectedValue(new Error('Failed to load products.'));

    const { getByText } = render(
      <MockProvider>
        <HomeScreen navigation={mockNavigation} />
      </MockProvider>
    );

    await waitFor(() => expect(getByText('Failed to load products.')).toBeTruthy());
  });

  it('renders products when fetched successfully', async () => {
    const mockProducts = [
      {
        section: 'Popular Today',
        items: [
          { product_name: 'Product 1', product_brand: 'Brand A', image_url: 'url1' },
          { product_name: 'Product 2', product_brand: 'Brand B', image_url: 'url2' },
        ],
      },
    ];

    fetchHomePageProducts.mockResolvedValue(mockProducts);

    const { getByText } = render(
      <MockProvider>
        <HomeScreen navigation={mockNavigation} />
      </MockProvider>
    );

    await waitFor(() => expect(getByText('Popular Today')).toBeTruthy());
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });

  it('navigates to ProductDetails on product press', async () => {
    const mockProducts = [
      {
        section: 'Popular Today',
        items: [
          { product_name: 'Product 1', product_brand: 'Brand A', image_url: 'url1' },
        ],
      },
    ];

    mockFetchHomePageProducts.mockResolvedValue(mockProducts);

    const { getByText } = render(
      <MockProvider>
        <HomeScreen navigation={mockNavigation} />
      </MockProvider>
    );

    await waitFor(() => expect(getByText('Product 1')).toBeTruthy());
    fireEvent.press(getByText('Product 1'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetails', { product: mockProducts[0].items[0] });
  });
});
