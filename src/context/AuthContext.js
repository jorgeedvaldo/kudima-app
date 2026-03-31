import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { loadBaseUrl } from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/login', {
        email,
        password,
      });
      const token = response.data.access_token;
      const user = response.data.user;
      
      setUserToken(token);
      setUserInfo(user);
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (e) {
      console.log(`Login error: ${e}`);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, phone, password, isProfessional) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/register', {
        name,
        email,
        phone,
        password,
        password_confirmation: password,
        role: isProfessional ? 'professional' : 'client'
      });
      const token = response.data.access_token;
      const user = response.data.user;
      
      setUserToken(token);
      setUserInfo(user);
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (e) {
      console.log(`Register error: ${e}`);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post('/api/logout');
    } catch (e) {
      console.log(`Logout API error: ${e}, clearing local storage anyway.`);
    }
    setUserToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/api/profile', profileData);
      const updatedUser = response.data.user;
      setUserInfo(updatedUser);
      await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (e) {
      console.log(`Update profile error: ${e}`);
      throw e;
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      await loadBaseUrl(); // Load custom URL first
      let token = await AsyncStorage.getItem('userToken');
      let user = await AsyncStorage.getItem('userInfo');
      
      if (token && user) {
        setUserToken(token);
        setUserInfo(JSON.parse(user));
        
        // Fetch fresh user data to get the latest avatar_url
        try {
          const res = await api.get('/api/user');
          setUserInfo(res.data);
          await AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
        } catch (fetchErr) {
          console.log(`Failed to fetch fresh user data: ${fetchErr}`);
        }
      }
    } catch (e) {
      console.log(`IsLoggedIn error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{
      login, register, logout, updateProfile, isLoading, userToken, userInfo
    }}>
        {children}
    </AuthContext.Provider>
  );
};
