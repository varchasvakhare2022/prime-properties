import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = authService.getUser();
          setUser(userData);
          
          // Verify token is still valid by fetching current user
          try {
            await authService.getCurrentUser();
          } catch (error) {
            // Token is invalid, logout
            authService.logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const userData = await authService.login(username, password);
      setUser(userData);
      
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, name, email, password, role) => {
    try {
      setError(null);
      setLoading(true);
      
      await authService.register(username, name, email, password, role);
      
      // Auto-login after successful registration
      const userData = await authService.login(username, password);
      setUser(userData);
      
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (credential) => {
    try {
      setError(null);
      setLoading(true);
      
      const userData = await authService.googleLogin(credential);
      setUser(userData);
      
      return userData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    googleLogin,
    logout,
    clearError,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'CUSTOMER',
    isDeveloper: user?.role === 'DEVELOPER',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
