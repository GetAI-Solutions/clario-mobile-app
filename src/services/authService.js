import axios from 'axios';
import { BASEURL } from './api';

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASEURL}/users/login`, loginData);
    return response.data;
  } catch (error) {
    // Re-throw the error to be caught by handleLogin
    throw error;
  }
};

export const signup = async (data) => {
  try {
    return axios.post(`${BASEURL}/users/signup`, data);
  } catch (error) {
    throw error
  }
    
  };
  
  export const sendOtp = async (email) => {
    const otpData = new URLSearchParams();
    otpData.append('email', email);
  
    return axios.post(`${BASEURL}/users/send-otp`, otpData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };