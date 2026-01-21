import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/apiService';
import { authService } from '../services/apiService';

const CartContext = createContext();

// Global listener for auth state changes
let authStateListeners = [];
export const notifyAuthStateChange = () => {
  authStateListeners.forEach(listener => listener());
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  // Load cart from backend on mount and when auth state changes
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated()) {
        try {
          setLoading(true);
          const response = await cartService.getCart();
          setCartItems(response.cart?.items || []);
        } catch (error) {
          console.error('Failed to load cart:', error);
          setCartItems([]);
        } finally {
          setLoading(false);
        }
      } else {
        // If not authenticated, use empty cart
        setCartItems([]);
        setLoading(false);
      }
    };

    loadCart();
    
    // Listen for auth state changes
    const handleAuthChange = () => {
      loadCart();
    };
    
    authStateListeners.push(handleAuthChange);
    
    return () => {
      authStateListeners = authStateListeners.filter(l => l !== handleAuthChange);
    };
  }, []);

  // Sync cart to backend when items change (if authenticated)
  useEffect(() => {
    if (!loading && isAuthenticated() && cartItems.length >= 0) {
      // Cart is synced via API calls, not on every state change
      // This prevents infinite loops
    }
  }, [cartItems, loading]);

  const addToCart = async (product, redirectToLogin = true) => {
    if (!isAuthenticated()) {
      // Store product temporarily for after login
      if (product) {
        localStorage.setItem('pendingCartProduct', JSON.stringify(product));
      }
      // Redirect to login if requested
      if (redirectToLogin && typeof window !== 'undefined') {
        window.location.href = '/login?redirect=cart';
        return;
      }
      throw new Error('Please login to add items to cart');
    }

    try {
      const cartItem = {
        productId: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: product.quantity || 1,
        seller: product.seller,
        partNumber: product.partNumber
      };

      const response = await cartService.addItem(cartItem);
      setCartItems(response.cart?.items || []);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId, partNumber = null) => {
    if (!isAuthenticated()) {
      return;
    }

    try {
      const response = await cartService.removeItem(productId, partNumber);
      setCartItems(response.cart?.items || []);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity, partNumber = null) => {
    if (!isAuthenticated()) {
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(productId, partNumber);
      return;
    }

    try {
      const response = await cartService.updateItem(productId, quantity, partNumber);
      setCartItems(response.cart?.items || []);
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated()) {
      setCartItems([]);
      return;
    }

    try {
      await cartService.clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discountPrice) {
        return total + ((item.price - item.discountPrice) * item.quantity);
      }
      return total;
    }, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSubtotal,
    getTotalDiscount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
