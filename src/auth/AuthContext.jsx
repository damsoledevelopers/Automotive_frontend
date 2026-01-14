import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const register = useCallback(async (name, email, password, role) => {
    try {
      setLoading(true);
      setError(null);

      // Validate inputs
      if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
      }

      if (!Object.values(USER_ROLES).includes(role)) {
        throw new Error('Invalid role selected');
      }

      // Check if user already exists (in a real app, this would be an API call)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find(u => u.email === email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (in a real app, this would be an API call)
      existingUsers.push({ ...newUser, password }); // In production, password should be hashed
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Set user without password
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Get users from localStorage (in a real app, this would be an API call)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Set user without password
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        createdAt: foundUser.createdAt
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
    logout,
    getDashboardPath,
    isAuthenticated: !!user,
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
