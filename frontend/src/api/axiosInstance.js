import axios from 'axios';

const API = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'https://pagepicks-3.onrender.com/api',
headers: {
    'Content-Type': 'application/json',
},
});

export default API;