import axios from 'axios';
import { BASEURL } from './api';

export const uploadBarcode = async (formData) => {
  const response = await axios.post(`${BASEURL}/upload-barcode`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getProductSummary = async (bar_code, userID) => {
  const response = await axios.post(
    `${BASEURL}/get-product-summary`,
    new URLSearchParams({ bar_code, userID }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  return response.data;
};