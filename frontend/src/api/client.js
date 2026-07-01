import axios from 'axios';

// Fallback to local FastAPI default port 8000 if VITE_API_URL is not set in .env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-Key': import.meta.env.VITE_API_KEY || '',
    },
});

// Request interceptor to handle auth token and Content-Type overriding
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // If request payload is not a FormData instance, default to JSON
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
