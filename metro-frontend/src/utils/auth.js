import {jwtDecode} from "jwt-decode";

const TOKEN_KEY = "token";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const isLoggedIn = () => !!getToken();

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    // Extract user email and fetch role 
    return localStorage.getItem('userRole'); 
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const setUserRole = (role) => {
  localStorage.setItem('userRole', role);
};

