// Authentication service for API calls
// Handle Railway internal URLs - they should not be used for frontend API calls
// ENFORCE HTTPS to prevent mixed content errors

import HTTPSEnforcer from '../utils/httpsEnforcer.js';

// Get secure API URL using centralized HTTPS enforcer
const API_BASE_URL = HTTPSEnforcer.getSecureAPIUrl();

class AuthService {
  // Login user
  async login(username, password) {
    try {
      const requestBody = { username, password };
      console.log('Login request body:', requestBody);
      console.log('Login URL:', `${API_BASE_URL}/auth/login`);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Login response status:', response.status);
      console.log('Login response headers:', response.headers);
      
      const data = await response.json();
      console.log('Login response data:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store JWT token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        name: data.name,
        email: data.email,
        role: data.role
      }));

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Google OAuth login
  async googleLogin(credential) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Google authentication failed');
      }

      // Store JWT token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        username: data.user.username,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role
      }));

      return data.user;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user info');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('token');
  }

  // Get stored user info
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get auth headers for API calls
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}

export default new AuthService();