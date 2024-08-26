import axios from 'axios';
import { BASEURL } from './api';

export const uploadBarcode = async (formData) => {
  const response = await axios.post(`${BASEURL}/common/upload-barcode`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getProductSummary = async (bar_code, userID) => {
  const response = await axios.post(
    `${BASEURL}/products/get-product-summary`,
    new URLSearchParams({ bar_code, userID }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  return response.data;
};

export const updateUser = async (preferences) => {
  const response = await axios.patch(`${BASEURL}/users/update-user-preference`,
    preferences,
    {
      headers: { 'Content-Type': 'application/json' }
    },
  )
  return response
}

export const chatPerplexityAi = async (bar_code, product_name) => {
  const response = await axios.post(`${BASEURL}/common/get-details-from-perplexity`,
    new URLSearchParams({ bar_code, product_name }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  )
  return response
}