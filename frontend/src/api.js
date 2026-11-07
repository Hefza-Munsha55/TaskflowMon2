import axios from 'axios';

// One axios instance used by the whole app. It automatically attaches the JWT.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Turns any error into a friendly message string
export const errMsg = (e) => e.response?.data?.message || 'Something went wrong. Please try again.';

export default api;
