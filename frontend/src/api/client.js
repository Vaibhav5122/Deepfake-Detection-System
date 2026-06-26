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

export default client;
