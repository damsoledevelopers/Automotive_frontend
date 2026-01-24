import api from '../utils/api';

/**
 * Authentication Service - Handles all auth-related API calls
 */

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password, role }
   * @returns {Promise}
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      // Backend returns { success: true, data: { user, token } }
      const result = response.data.data || response.data;
      const { token, user } = result;
      
      // Store token and user data
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.join(', ') || 
                          error.message || 
                          'Registration failed';
      throw new Error(errorMessage);
    }
  },

  /**
   * Login with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Backend returns { success: true, data: { user, token } }
      const result = response.data.data || response.data;
      const { token, user } = result;
      
      // Store token and user data
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.join(', ') || 
                          error.message || 
                          'Login failed';
      throw new Error(errorMessage);
    }
  },

  /**
   * Google OAuth login
   * @param {string} googleToken - Google OAuth token from frontend
   * @returns {Promise}
   */
  googleLogin: async (googleToken) => {
    try {
      const response = await api.post('/auth/google-login', { token: googleToken });
      const { token, user } = response.data;
      
      // Store token and user data
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  },

  /**
   * Get current user profile
   * @returns {Promise}
   */
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      // Backend returns { success: true, data: user }
      const user = response.data.data || response.data.user || response.data;
      
      // Update user in localStorage
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return { data: { user }, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  /**
   * Logout - clear local storage
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Get stored JWT token
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  /**
   * Get stored user data
   * @returns {Object|null}
   */
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

/**
 * User Service - Handles all user-related API calls
 */

export const userService = {
  /**
   * Get all users
   * @returns {Promise}
   */
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  /**
   * Get user by ID
   * @param {string} userId
   * @returns {Promise}
   */
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  /**
   * Update user by ID
   * @param {string} userId
   * @param {Object} userData
   * @returns {Promise}
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      // Backend returns { success: true, data: { user } }
      const result = response.data.data || response.data;
      
      // If updating current user, update localStorage
      const currentUser = authService.getUser();
      if (currentUser && (currentUser.id === userId || currentUser._id === userId)) {
        const updatedUser = result.user || result;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.join(', ') || 
                          error.message || 
                          'Failed to update user';
      throw new Error(errorMessage);
    }
  },

  /**
   * Delete user by ID
   * @param {string} userId
   * @returns {Promise}
   */
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },
};

/**
 * Cart Service - Handles all cart-related API calls
 */
export const cartService = {
  /**
   * Get user's cart
   * @returns {Promise}
   */
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      // Backend returns { success: true, data: { cart } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  },

  /**
   * Add item to cart
   * @param {Object} item - Cart item data
   * @returns {Promise}
   */
  addItem: async (item) => {
    try {
      const response = await api.post('/cart/items', item);
      // Backend returns { success: true, data: { cart } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  },

  /**
   * Update cart item quantity
   * @param {string} productId
   * @param {number} quantity
   * @param {string} partNumber - Optional part number
   * @returns {Promise}
   */
  updateItem: async (productId, quantity, partNumber = null) => {
    try {
      const response = await api.put('/cart/items', { productId, quantity, partNumber });
      // Backend returns { success: true, data: { cart } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update cart item');
    }
  },

  /**
   * Remove item from cart
   * @param {string} productId
   * @param {string} partNumber - Optional part number
   * @returns {Promise}
   */
  removeItem: async (productId, partNumber = null) => {
    try {
      const response = await api.delete('/cart/items', { 
        data: { productId, partNumber } 
      });
      // Backend returns { success: true, data: { cart } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
    }
  },

  /**
   * Clear cart
   * @returns {Promise}
   */
  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      // Backend returns { success: true, data: { cart } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  },
};

/**
 * Order Service - Handles all order-related API calls
 */
export const orderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data
   * @returns {Promise}
   */
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      // Backend returns { success: true, data: { order } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  },

  /**
   * Get all orders for current user
   * @param {Object} filters - Optional filters (e.g., { status: 'Delivered' })
   * @returns {Promise}
   */
  getOrders: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) {
        params.append('status', filters.status);
      }
      const queryString = params.toString();
      const url = queryString ? `/orders?${queryString}` : '/orders';
      const response = await api.get(url);
      // Backend returns { success: true, data: { orders } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  },

  /**
   * VENDOR: Get vendor orders
   * @param {Object} filters - Optional filters (e.g., { status: 'Delivered' })
   * @returns {Promise}
   */
  getVendorOrders: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) {
        params.append('status', filters.status);
      }
      const queryString = params.toString();
      const url = queryString ? `/vendor/orders?${queryString}` : '/vendor/orders';
      const response = await api.get(url);
      // Backend returns { success: true, data: { orders, summary } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch vendor orders');
    }
  },

  /**
   * Get order by ID
   * @param {string} orderId
   * @returns {Promise}
   */
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  },

  /**
   * Update order status
   * @param {string} orderId
   * @param {string} status
   * @param {string} cancellationReason - Optional cancellation reason
   * @returns {Promise}
   */
  updateOrderStatus: async (orderId, status, cancellationReason = null) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, {
        status,
        cancellationReason
      });
      // Backend returns { success: true, data: { order } }
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update order');
    }
  },

  /**
   * Delete order
   * @param {string} orderId
   * @returns {Promise}
   */
  deleteOrder: async (orderId) => {
    try {
      const response = await api.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete order');
    }
  },
};

/**
 * Product Service - Handles all product-related API calls
 */
export const productService = {
  /**
   * Get all products (admin only)
   * @param {Object} filters - Optional filters (e.g., { status: 'pending' } or { approved: false })
   * @returns {Promise}
   */
  getAdminProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      // Support both status and approved for backward compatibility
      if (filters.status) {
        params.append('status', filters.status);
      } else if (filters.approved !== undefined) {
        // Convert boolean to string for query parameter
        params.append('approved', filters.approved === false ? 'false' : String(filters.approved));
      }
      if (filters.vendorId) {
        params.append('vendorId', filters.vendorId);
      }
      if (filters.category) {
        params.append('category', filters.category);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.page) {
        params.append('page', filters.page);
      }
      if (filters.limit) {
        params.append('limit', filters.limit);
      }
      if (filters.isActive !== undefined) {
        params.append('isActive', filters.isActive);
      }
      
      const queryString = params.toString();
      const url = queryString ? `/admin/products?${queryString}` : '/admin/products';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  /**
   * Approve product (admin only)
   * @param {string} productId
   * @returns {Promise}
   */
  approveProduct: async (productId) => {
    try {
      const response = await api.put(`/admin/products/${productId}/approve`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to approve product');
    }
  },

  /**
   * Reject product (admin only)
   * @param {string} productId
   * @returns {Promise}
   */
  rejectProduct: async (productId) => {
    try {
      const response = await api.put(`/admin/products/${productId}/reject`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reject product');
    }
  },

  /**
   * Get user products (approved products only)
   * @param {Object} filters - Optional filters
   * @returns {Promise}
   */
  getUserProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.subCategory) params.append('subCategory', filters.subCategory);
      if (filters.search) params.append('search', filters.search);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      
      const queryString = params.toString();
      const url = queryString ? `/products?${queryString}` : '/products';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  /**
   * Get product by ID
   * @param {string} productId
   * @returns {Promise}
   */
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  },

  /**
   * Get all categories
   * @returns {Promise}
   */
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  /**
   * Get subcategories for a category
   * @param {string} category
   * @returns {Promise}
   */
  getSubCategories: async (category) => {
    try {
      const response = await api.get(`/categories/${encodeURIComponent(category)}/subcategories`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch subcategories');
    }
  },

  /**
   * Get category with subcategories and sample products
   * @param {string} category
   * @returns {Promise}
   */
  getCategoryWithSubCategories: async (category) => {
    try {
      const response = await api.get(`/categories/${encodeURIComponent(category)}/with-subcategories`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch category with subcategories');
    }
  },

  /**
   * VENDOR: Create new product
   * @param {Object} productData - Product data
   * @returns {Promise}
   */
  createVendorProduct: async (productData) => {
    try {
      const response = await api.post('/vendor/products', productData);
      return response.data.data || response.data;
    } catch (error) {
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.join(', ');
        throw new Error(errorMessages || error.response?.data?.message || 'Validation failed');
      }
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  },

  /**
   * VENDOR: Get own products
   * @param {Object} filters - Optional filters
   * @returns {Promise}
   */
  getVendorProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.approved !== undefined) params.append('approved', filters.approved);
      if (filters.search) params.append('search', filters.search);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      
      const queryString = params.toString();
      const url = queryString ? `/vendor/products?${queryString}` : '/vendor/products';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  /**
   * VENDOR: Update own product
   * @param {string} productId
   * @param {Object} productData
   * @returns {Promise}
   */
  updateVendorProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/vendor/products/${productId}`, productData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  },

  /**
   * VENDOR: Delete own product
   * @param {string} productId
   * @returns {Promise}
   */
  deleteVendorProduct: async (productId) => {
    try {
      const response = await api.delete(`/vendor/products/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  },
};

/**
 * Category Service - Handles all category-related API calls
 */
export const categoryService = {
  /**
   * ADMIN: Create new category
   * @param {Object} categoryData - Category data
   * @returns {Promise}
   */
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/admin/categories', categoryData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create category');
    }
  },

  /**
   * ADMIN: Get all categories
   * @param {Object} filters - Optional filters
   * @returns {Promise}
   */
  getAdminCategories: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.parentCategory !== undefined) params.append('parentCategory', filters.parentCategory);
      if (filters.isActive !== undefined) params.append('isActive', filters.isActive);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/categories?${queryString}` : '/admin/categories';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  /**
   * ADMIN: Get category by ID
   * @param {string} categoryId
   * @returns {Promise}
   */
  getCategoryById: async (categoryId) => {
    try {
      const response = await api.get(`/admin/categories/${categoryId}`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch category');
    }
  },

  /**
   * ADMIN: Update category
   * @param {string} categoryId
   * @param {Object} categoryData
   * @returns {Promise}
   */
  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await api.put(`/admin/categories/${categoryId}`, categoryData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update category');
    }
  },

  /**
   * ADMIN: Delete category
   * @param {string} categoryId
   * @returns {Promise}
   */
  deleteCategory: async (categoryId) => {
    try {
      const response = await api.delete(`/admin/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete category');
    }
  },

  /**
   * PUBLIC: Get all active categories (for frontend)
   * @returns {Promise}
   */
  getActiveCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  /**
   * PUBLIC: Get all active categories as flat list (for vendor forms, filters)
   * @returns {Promise}
   */
  getAllActiveCategoriesFlat: async () => {
    try {
      const response = await api.get('/categories/flat');
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch all active categories (flat)');
    }
  },
};

/**
 * Mechanic & Garage Service - Handles all mechanic and garage-related API calls
 */
export const mechanicGarageService = {
  /**
   * ADMIN: Create a new mechanic
   * @param {Object} mechanicData - { name, email, specialization, location, phone, status }
   * @returns {Promise}
   */
  createMechanic: async (mechanicData) => {
    try {
      const response = await api.post('/admin/mechanics', mechanicData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create mechanic');
    }
  },

  /**
   * ADMIN: Get all mechanics
   * @param {Object} filters - Optional filters
   * @returns {Promise}
   */
  getAllMechanics: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/mechanics?${queryString}` : '/admin/mechanics';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch mechanics');
    }
  },

  /**
   * ADMIN: Get mechanic by ID
   * @param {string} mechanicId
   * @returns {Promise}
   */
  getMechanicById: async (mechanicId) => {
    try {
      const response = await api.get(`/admin/mechanics/${mechanicId}`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch mechanic');
    }
  },

  /**
   * ADMIN: Update mechanic
   * @param {string} mechanicId
   * @param {Object} mechanicData
   * @returns {Promise}
   */
  updateMechanic: async (mechanicId, mechanicData) => {
    try {
      const response = await api.put(`/admin/mechanics/${mechanicId}`, mechanicData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update mechanic');
    }
  },

  /**
   * ADMIN: Delete mechanic
   * @param {string} mechanicId
   * @returns {Promise}
   */
  deleteMechanic: async (mechanicId) => {
    try {
      const response = await api.delete(`/admin/mechanics/${mechanicId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete mechanic');
    }
  },

  /**
   * ADMIN: Create a new garage
   * @param {Object} garageData - { name, email, location, phone, status }
   * @returns {Promise}
   */
  createGarage: async (garageData) => {
    try {
      const response = await api.post('/admin/garages', garageData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create garage');
    }
  },

  /**
   * ADMIN: Get all garages
   * @param {Object} filters - Optional filters
   * @returns {Promise}
   */
  getAllGarages: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/garages?${queryString}` : '/admin/garages';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch garages');
    }
  },

  /**
   * ADMIN: Get garage by ID
   * @param {string} garageId
   * @returns {Promise}
   */
  getGarageById: async (garageId) => {
    try {
      const response = await api.get(`/admin/garages/${garageId}`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch garage');
    }
  },

  /**
   * ADMIN: Update garage
   * @param {string} garageId
   * @param {Object} garageData
   * @returns {Promise}
   */
  updateGarage: async (garageId, garageData) => {
    try {
      const response = await api.put(`/admin/garages/${garageId}`, garageData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update garage');
    }
  },

  /**
   * ADMIN: Delete garage
   * @param {string} garageId
   * @returns {Promise}
   */
  deleteGarage: async (garageId) => {
    try {
      const response = await api.delete(`/admin/garages/${garageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete garage');
    }
  },

  /**
   * ADMIN: Reset password for mechanic/garage
   * @param {string} id
   * @param {string} type - 'mechanics' or 'garages'
   * @returns {Promise}
   */
  resetPassword: async (id, type) => {
    try {
      const response = await api.post(`/admin/${type}/${id}/reset-password`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },
};

/**
 * Analytics Service - Handles all analytics-related API calls
 */
export const analyticsService = {
  /**
   * ADMIN: Get real-time dashboard data
   * @param {Object} filters - dateRange, location, etc.
   * @returns {Promise}
   */
  getRealTimeDashboard: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      if (filters.location) params.append('location', filters.location);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/dashboard?${queryString}` : '/admin/analytics/dashboard';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  },

  /**
   * ADMIN: Get revenue and commission data
   * @param {Object} filters - dateRange, groupBy
   * @returns {Promise}
   */
  getRevenueData: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      if (filters.groupBy) params.append('groupBy', filters.groupBy);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/revenue?${queryString}` : '/admin/analytics/revenue';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch revenue data');
    }
  },

  /**
   * ADMIN: Get predictive analytics data
   * @returns {Promise}
   */
  getPredictiveAnalytics: async () => {
    try {
      const response = await api.get('/admin/analytics/predictive');
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch predictive analytics');
    }
  },

  /**
   * ADMIN: Get quality control data
   * @returns {Promise}
   */
  getQualityControlData: async () => {
    try {
      const response = await api.get('/admin/analytics/quality-control');
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch quality control data');
    }
  },

  /**
   * ADMIN: Get overall statistics
   * @param {Object} filters - dateRange
   * @returns {Promise}
   */
  getOverallStats: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/stats?${queryString}` : '/admin/analytics/stats';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch overall statistics');
    }
  },

  /**
   * ADMIN: Get recent activities
   * @param {Object} filters - limit
   * @returns {Promise}
   */
  getRecentActivities: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.limit) params.append('limit', filters.limit);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/recent-activities?${queryString}` : '/admin/analytics/recent-activities';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recent activities');
    }
  },

  /**
   * ADMIN: Get best selling products
   * @param {Object} filters - dateRange, limit
   * @returns {Promise}
   */
  getBestSellingProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      if (filters.limit) params.append('limit', filters.limit);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/best-selling?${queryString}` : '/admin/analytics/best-selling';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch best selling products');
    }
  },

  /**
   * ADMIN: Get customer engagement metrics
   * @param {Object} filters - dateRange
   * @returns {Promise}
   */
  getCustomerEngagementMetrics: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/engagement?${queryString}` : '/admin/analytics/engagement';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch customer engagement metrics');
    }
  },

  /**
   * ADMIN: Get system health
   * @returns {Promise}
   */
  getSystemHealth: async () => {
    try {
      const response = await api.get('/admin/analytics/system-health');
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch system health');
    }
  },

  /**
   * ADMIN: Get active sessions
   * @returns {Promise}
   */
  getActiveSessions: async () => {
    try {
      const response = await api.get('/admin/analytics/active-sessions');
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch active sessions');
    }
  },

  /**
   * ADMIN: Get top performing vendors
   * @param {Object} filters - dateRange, limit
   * @returns {Promise}
   */
  getTopVendors: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      if (filters.limit) params.append('limit', filters.limit);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/top-vendors?${queryString}` : '/admin/analytics/top-vendors';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch top vendors');
    }
  },

  /**
   * ADMIN: Export analytics data
   * @param {Object} filters - dateRange, type
   * @returns {Promise}
   */
  exportData: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      if (filters.type) params.append('type', filters.type);
      
      const queryString = params.toString();
      const url = queryString ? `/admin/analytics/export?${queryString}` : '/admin/analytics/export';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export data');
    }
  },

  /**
   * VENDOR: Get vendor dashboard data
   * @param {Object} filters - dateRange
   * @returns {Promise}
   */
  getVendorDashboard: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);
      
      const queryString = params.toString();
      const url = queryString ? `/vendor/analytics/dashboard?${queryString}` : '/vendor/analytics/dashboard';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch vendor dashboard data');
    }
  },
};