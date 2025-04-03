import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Use proxy URL in development, CloudFlare Worker URL in production
const isDevelopment = import.meta.env.DEV;

// Set the CloudFlare Worker URL for production
const CLOUDFLARE_WORKER_URL = 'https://debt-collection-glocke.workers.dev';

// In GitHub Pages (production), use the CloudFlare Worker as a CORS proxy
const isGitHubPages = !isDevelopment && window.location.hostname.includes('github.io');

// API base URL fallback if environment variable is not set
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://collect-ai-service-337679415316.us-central1.run.app';

// Determine the base URL based on the environment
let baseURL: string;
if (isDevelopment) {
  baseURL = '/api'; // This will be proxied via Vite
} else if (isGitHubPages) {
  baseURL = CLOUDFLARE_WORKER_URL; // Use CloudFlare Worker for GitHub Pages
} else {
  baseURL = apiBaseUrl; // Direct API URL for other production environments
}

console.log('API Base URL:', baseURL); // For debugging

// Create a custom Axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Add X-Requested-With header for CORS proxies if on GitHub Pages
    ...(isGitHubPages ? { 'X-Requested-With': 'XMLHttpRequest' } : {})
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