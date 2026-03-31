import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Next JS or Expo handles process.env automatically if prefixed with EXPO_PUBLIC_
let currentBaseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: currentBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const updateBaseUrl = async (newUrl) => {
    let finalUrl = newUrl;
    if (finalUrl && finalUrl.endsWith('/')) {
        finalUrl = finalUrl.slice(0, -1);
    }
    currentBaseUrl = finalUrl || process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    api.defaults.baseURL = currentBaseUrl;
    await AsyncStorage.setItem('customApiUrl', currentBaseUrl);
};

export const loadBaseUrl = async () => {
    const saved = await AsyncStorage.getItem('customApiUrl');
    if (saved) {
        currentBaseUrl = saved;
        api.defaults.baseURL = saved;
    }
};

export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${currentBaseUrl}/${cleanPath}`;
};

export default api;
