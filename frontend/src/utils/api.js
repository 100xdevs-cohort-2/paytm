import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear storage and redirect
      localStorage.clear();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;

