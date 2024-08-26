import axios from 'axios';
import { BASEURL } from './api';

export const loginUser = async (loginData) => {
  const response = await axios.post(`${BASEURL}/users/login`, loginData);
  return response.data;
};

export const signup = async (data) => {
    return axios.post(`${BASEURL}/users/signup`, data);
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