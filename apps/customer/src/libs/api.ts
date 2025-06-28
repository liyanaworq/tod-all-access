import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
});

// Request interceptor to add token for UserCustomer
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('customerToken'); // stored from login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
