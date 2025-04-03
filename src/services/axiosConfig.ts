import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Use proxy URL in development, direct URL in production
const isDevelopment = import.meta.env.DEV;
// Set a fallback API URL in case the environment variable is not available
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://collect-ai-service-337679415316.us-central1.run.app';

const baseURL = isDevelopment 
  ? '/api' // This will be proxied via Vite
  : apiBaseUrl;

console.log('API Base URL:', baseURL); // For debugging

// Create a custom Axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add withCredentials if your API requires cookies/authentication
  // withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can modify the request config here (e.g., add auth tokens)
    console.log('Request URL:', config.url); // For debugging
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response.data;
  },
  (error: AxiosError) => {
    // Handle errors here (e.g., redirect to login on 401)
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 