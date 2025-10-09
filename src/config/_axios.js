import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || "https://highway-burger-api.onrender.com/api";
export const CDN_URL = import.meta.env.VITE_CDN_URL || "https://highway-burger-api.onrender.com";

const Services = axios.create({
  baseURL: String(BASE_API_URL),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

Services.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Services.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
 
export default Services;