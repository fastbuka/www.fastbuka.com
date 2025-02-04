import { useState, useEffect } from 'react';

type Item = {
  id: number;
  uuid: string;
  name: string;
  image: string;
  vendor_uuid: string;
  item_uuid: string;
  quantity: number;
};

export const useCart = () => {
  const CART_KEY = 'cart';

  /**
   * Get cart
   * @returns Cart items from localStorage
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

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  /**
   * Add item to cart
   */
  const addToCart = (item: Item, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.item_uuid === item.item_uuid
      );
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item_uuid === item.item_uuid
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (item_uuid: string) => {
    setCart((prev) => prev.filter((item) => item.item_uuid !== item_uuid));
  };

  /**
   * Increase item quantity
   */
  const increaseQuantity = (item_uuid: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.item_uuid === item_uuid
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /**
   * Decrease item quantity
   */
  const decreaseQuantity = (item_uuid: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.item_uuid === item_uuid
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /**
   * Clear all cart items
   */
  const clearAllCartItems = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearAllCartItems,
  };
};
