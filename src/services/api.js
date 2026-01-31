import axios from 'axios';

// In React Native with Expo, getting environment variables can be tricky without extra setup.
// For simplicity and to ensure it works with the user's request, we'll assign it directly 
// or read from process.env if available (requires configuration).
// For this task, I will default to the requested URL if env is not loaded.
const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor to add token to requests
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const authService = {
    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    logout: async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error', error);
        }
    },
    getUser: async () => {
        const response = await api.get('/user');
        return response.data;
    },
    updateProfile: async (userData) => {
        try {
            const response = await api.put('/user/profile', userData); // Assuming standard update endpoint
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
};

export const dataService = {
    getCategories: async () => {
        const response = await api.get('/categories');
        return response.data;
    },
    getServices: async (filters = {}) => {
        // filters: { category_id, professional_id, search }
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/services?${params}`);
        return response.data;
    },
    getProfessionals: async (categoryId = null) => {
        const url = categoryId ? `/professionals?category_id=${categoryId}` : '/professionals';
        const response = await api.get(url);
        return response.data;
    },
    getProfessionalDetails: async (id) => {
        const response = await api.get(`/professionals/${id}`);
        return response.data;
    },
    getPopularServices: async () => {
        // Assuming we might filter or just get all for now as per docs
        const response = await api.get('/services');
        // In a real scenario we might filter for "popular" client-side or if API supports it
        return response.data;
    }
};

export default api;
