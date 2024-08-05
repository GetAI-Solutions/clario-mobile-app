import axios from 'axios';

export const BASEURL = "https://get-ai-backend-07319a694f3a.herokuapp.com/get-ai-service"

const api = axios.create({
  baseURL: 'https://get-ai-backend-07319a694f3a.herokuapp.com/get-ai-service/',
});

export const config = {
  headers: {
    "Content-Type": "application/json",
  }
}

export default api;
