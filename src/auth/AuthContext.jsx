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
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        
        if (token && storedUser) {
          const userData = JSON.parse(storedUser);
          // Set user immediately from localStorage for faster initial render
          setUser(userData);
          setIsAuthenticated(true);
          
          // Verify token is still valid by fetching profile (non-blocking)
          try {
            const profile = await authService.getProfile();
            // Handle different response structures
            let user = null;
            if (profile.data?.data?.user) {
              user = profile.data.data.user;
            } else if (profile.data?.user) {
              user = profile.data.user;
            } else if (profile.user) {
              user = profile.user;
            } else if (profile.data) {
              user = profile.data;
            } else {
              user = profile;
            }
            
            if (user && (user.role || userData.role)) {
              // Ensure role is set
              if (!user.role && userData.role) {
                user.role = userData.role;
              }
              setUser(user);
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('userRole', user.role);
            } else if (userData.role) {
              // If profile doesn't have role but localStorage does, keep it
              userData.role = userData.role;
              setUser(userData);
            }
          } catch (error) {
            // If profile fetch fails, keep the user from localStorage
            // Only clear if it's a 401 (unauthorized) error
            if (error.response?.status === 401 || error.response?.status === 403) {
              console.error('Token validation failed:', error);
              localStorage.removeItem('user');
              localStorage.removeItem('authToken');
              localStorage.removeItem('userRole');
              setUser(null);
              setIsAuthenticated(false);
            } else {
              // Network error or other issue - keep user from localStorage
              console.warn('Profile fetch failed, using cached user:', error);
            }
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        // Only clear if there's a critical error
        if (err.message?.includes('JSON')) {
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
        }
        setIsAuthenticated(false);
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
  const register = useCallback(async (name, email, password, role, vendorDetails = null) => {
    try {
      setLoading(true);
      setError(null);

      if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
      }

      if (!Object.values(USER_ROLES).includes(role)) {
        throw new Error('Invalid role selected');
      }

      // Build user data object
      const userData = { name, email, password, role };
      
      // Add vendorDetails if provided (required for vendor role)
      if (vendorDetails) {
        userData.vendorDetails = vendorDetails;
      }

      // Call API
      const result = await authService.register(userData);
      
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
      
      // Extract user from result (handle different response structures)
      const user = result.user || result.data?.user || result;
      setUser(user);
      setIsAuthenticated(true);
      
      // Update localStorage
      if (result.token) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
      }
      
      // Notify cart context about auth state change
      if (typeof window !== 'undefined') {
        const { notifyAuthStateChange } = require('../contexts/CartContext');
        notifyAuthStateChange();
      }
      
      return { user, token: result.token };
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
      // Extract user from result (handle different response structures)
      const userData = result.data?.user || result.user || result.data || result;
      setUser(userData);
      
      // Update localStorage
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.role);
      }
      
      return result;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update user in context (called after profile update)
   */
  const updateUser = useCallback((userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', userData.role);
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
    updateUser,
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
