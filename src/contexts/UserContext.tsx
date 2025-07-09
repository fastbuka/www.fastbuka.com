"use client";

import { Order, Product } from "@/schema";
import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  username: string;
  uuid: string;
  other_names: string;
};

export type Location = {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  location: Location | null;
  setLocation: (location: Location | null) => void;
  deliveryAddress: string;
  setDeliveryAddress: (value: string) => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  orders: Order[] | null;
  setOrders: (orders: Order[] | null) => void;
  hasCartItems: boolean;
  setHasCartItems: (value: boolean) => void;
  lastVendorViewed: string;
  setLastVendorViewed: (value: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [hasCartItems, setHasCartItems] = useState(false);
  const [lastVendorViewed, setLastVendorViewed] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        activeProduct,
        location,
        setUser,
        setActiveProduct,
        setLocation,
        deliveryAddress,
        setDeliveryAddress,
        activeOrder,
        setActiveOrder,
        orders,
        setOrders,
        hasCartItems,
        setHasCartItems,
        lastVendorViewed,
        setLastVendorViewed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
