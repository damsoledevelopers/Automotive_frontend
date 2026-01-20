import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Use a combination of id and partNumber to create unique cart item identifier
      // This ensures different products (even with same id) are treated as separate items
      const uniqueKey = product.partNumber ? `${product.id}-${product.partNumber}` : product.id;
      const existingItem = prevItems.find(item => {
        const itemKey = item.partNumber ? `${item.id}-${item.partNumber}` : item.id;
        return itemKey === uniqueKey;
      });

      if (existingItem) {
        // If item already exists, increment quantity
        return prevItems.map(item => {
          const itemKey = item.partNumber ? `${item.id}-${item.partNumber}` : item.id;
          if (itemKey === uniqueKey) {
            return { ...item, quantity: item.quantity + (product.quantity || 1) };
          }
          return item;
        });
      } else {
        // Add new item with quantity from product or default to 1
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
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
