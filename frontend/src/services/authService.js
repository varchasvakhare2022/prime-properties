// Authentication service for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://prime-properties-production.up.railway.app';

class AuthService {
  // Login user
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

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
      throw error;
    }
  }

  // Register user
  async register(username, name, email, password, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
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