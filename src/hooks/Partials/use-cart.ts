import { useState, useEffect, useCallback } from 'react';

type Item = {
  uuid: string;
  name: string;
  image: string;
  vendor_uuid: string;
  food_uuid: string;
  quantity: number;
  price: number;
};

export const useCart = () => {
  const CART_KEY = 'cart';

  /**
   * Get cart from localStorage
   */
  const getStoredCart = (): Item[] => {
    if (typeof window === 'undefined') return [];
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
      return [];
    }
  };

  const [cart, setCart] = useState<Item[]>(getStoredCart);

  /**
   * Sync cart with localStorage
   */
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [cart]);

  /**
   * Sync cart across tabs
   */
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CART_KEY && event.newValue) {
        setCart(JSON.parse(event.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Add to cart
   */
  const addToCart = useCallback((item: Item, quantity: number = 1) => {
    setCart((cart) => {
      const exists = cart.find((cartItem) => cartItem.uuid === item.uuid);
      if (exists) {
        return cart.map((cartItem) =>
          cartItem.uuid === item.uuid
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...cart, { ...item, quantity, food_uuid: item.uuid }];
    });
  }, []);

  /**
   * Remove from cart
   */
  const removeFromCart = useCallback((uuid: string) => {
    setCart((cart) => cart.filter((item) => item.uuid !== uuid));
  }, []);

  /**
   * Increase quantity
   */
  const increaseQuantity = useCallback((uuid: string) => {
    setCart((cart) =>
      cart.map((item) =>
        item.uuid === uuid ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  /**
   * Decrease quantity
   */
  const decreaseQuantity = useCallback((uuid: string) => {
    setCart((cart) =>
      cart
        .map((item) =>
          item.uuid === uuid
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  /**
   * Clear cart
   */
  const clearAllCartItems = useCallback(() => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearAllCartItems,
  };
};
