"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CartProduct = {
  uuid: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  vendor_uuid: string;
  description: string;
};

type CartData = {
  products: CartProduct[];
  updatedAt: number;
  slug: string;
};

type AllVendorCarts = {
  [vendorId: string]: CartData;
};

type CartContextType = {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "vendor_carts";
const EXPIRY_DURATION = 24 * 60 * 60 * 1000;

export const CartProvider = ({
  children,
  vendorId,
}: {
  children: React.ReactNode;
  vendorId: string;
}) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(CART_KEY);
    if (data) {
      const allCarts = JSON.parse(data) as { [key: string]: CartData };
      const vendorCart = allCarts[vendorId];

      if (vendorCart && Date.now() - vendorCart.updatedAt < EXPIRY_DURATION) {
        setCart(vendorCart.products);
      } else {
        delete allCarts[vendorId];
        localStorage.setItem(CART_KEY, JSON.stringify(allCarts));
      }
    }
  }, [vendorId]);

  const updateLocalStorage = (updatedCart: CartProduct[]) => {
    const allCarts: AllVendorCarts = JSON.parse(
      localStorage.getItem(CART_KEY) || "{}"
    );
    allCarts[vendorId] = {
      products: updatedCart,
      updatedAt: Date.now(),
      slug: vendorId,
    };
    localStorage.setItem(CART_KEY, JSON.stringify(allCarts));
  };

  const addToCart = (product: CartProduct) => {
    const existing = cart.find((p) => p.uuid === product.uuid);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((p) =>
        p.uuid === product.uuid ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((p) => p.uuid !== productId);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const incrementQuantity = (productId: string) => {
    const updatedCart = cart.map((p) =>
      p.uuid === productId ? { ...p, quantity: p.quantity + 1 } : p
    );
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const decrementQuantity = (productId: string) => {
    const updatedCart = cart
      .map((p) =>
        p.uuid === productId ? { ...p, quantity: p.quantity - 1 } : p
      )
      .filter((p) => p.quantity > 0);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    const allCarts: AllVendorCarts = JSON.parse(
      localStorage.getItem(CART_KEY) || "{}"
    );
    delete allCarts[vendorId];
    localStorage.setItem(CART_KEY, JSON.stringify(allCarts));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
