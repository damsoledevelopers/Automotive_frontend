import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/apiService';

export const AuthContext = createContext(null);

// User roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  MECHANICS: 'mechanics',
  SUPER_ADMIN: 'superadmin',
  GARAGE: 'garage',
  SHIPPING: 'shipping'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for logout events (from API interceptor)
    const handleLogout = () => {
      setUser(null);
      setIsAuthenticated(false);
      setError('Session expired. Please login again.');
    };

    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, []);

  /**
   * Register new user
   */
  const register = useCallback(async (name, email, password, role) => {
    try {
      setLoading(true);
      setError(null);

      if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
      }

      if (!Object.values(USER_ROLES).includes(role)) {
        throw new Error('Invalid role selected');
      }

      // Call API
      const result = await authService.register({ name, email, password, role });
      
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Registration failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login user
   */
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Call API
      const result = await authService.login(email, password);
      
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Login failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Google OAuth login
   */
  const googleLogin = useCallback(async (googleToken) => {
    try {
      setLoading(true);
      setError(null);

      const result = await authService.googleLogin(googleToken);
      
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Google login failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get current user profile
   */
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const result = await authService.getProfile();
      setUser(result.user);
      return result;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    try {
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Get dashboard path based on role
   */
  const getDashboardPath = useCallback((role) => {
    const paths = {
      [USER_ROLES.CUSTOMER]: '/',
      [USER_ROLES.VENDOR]: '/vendor/dashboard',
      [USER_ROLES.MECHANICS]: '/mechanics/dashboard',
      [USER_ROLES.SUPER_ADMIN]: '/admin/dashboard',
      [USER_ROLES.GARAGE]: '/garage/dashboard',
      [USER_ROLES.SHIPPING]: '/shipping/dashboard'
    };
    return paths[role] || '/';
  }, []);

  const value = {
    user,
    loading,
    error,
    register,
    login,
    googleLogin,
    logout,
    getProfile,
    clearError,
    getDashboardPath,
    isAuthenticated,
    isCustomer: user?.role === USER_ROLES.CUSTOMER,
    isVendor: user?.role === USER_ROLES.VENDOR,
    isMechanics: user?.role === USER_ROLES.MECHANICS,
    isSuperAdmin: user?.role === USER_ROLES.SUPER_ADMIN,
    isGarage: user?.role === USER_ROLES.GARAGE,
    isShipping: user?.role === USER_ROLES.SHIPPING,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
