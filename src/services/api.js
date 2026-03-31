// Re-use the centralized axios instance from api/axios.js
// This ensures all requests use the dynamic base URL and have the auth token
import api from '../api/axios';

export const dataService = {
    getCategories: async () => {
        const response = await api.get('/api/categories');
        const data = response.data;
        return Array.isArray(data) ? data : (data?.data || []);
    },
    getServices: async (filters = {}) => {
        const response = await api.get('/api/services', { params: filters });
        const data = response.data;
        return Array.isArray(data) ? data : (data?.data || []);
    },
    getProfessionals: async (categoryId = null) => {
        const params = categoryId ? { category_id: categoryId } : {};
        const response = await api.get('/api/professionals', { params });
        const data = response.data;
        return Array.isArray(data) ? data : (data?.data || []);
    },
    getProfessionalDetails: async (id) => {
        const response = await api.get(`/api/professionals/${id}`);
        const data = response.data;
        // Could be { data: {...} } or the object directly
        return data?.data || data;
    },
};

export const orderService = {
    getRequests: async () => {
        const response = await api.get('/api/requests');
        const data = response.data;
        return Array.isArray(data) ? data : (data?.data || []);
    },
    createRequest: async (requestData) => {
        const response = await api.post('/api/requests', requestData);
        return response.data;
    }
};

export default api;
