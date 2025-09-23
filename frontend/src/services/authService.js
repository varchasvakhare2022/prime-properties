import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const authService = {
  login: (username, password) => {
    return axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
  },

  registerCustomer: (userData) => {
    return axios.post(`${API_URL}/auth/register/customer`, userData);
  },

  registerDeveloper: (userData) => {
    return axios.post(`${API_URL}/auth/register/developer`, userData);
  },

  register: (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
  }
};

// Add request interceptor to include JWT token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default authService;
