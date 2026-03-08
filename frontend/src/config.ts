import axios from 'axios';

export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000').replace(/\/+$/, ''); // Remove trailing slash if present

export const api = axios.create({
  withCredentials: true,
});