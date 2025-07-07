"use client";

import { Product } from "@/schema";
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

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <UserContext.Provider
      value={{ user, activeProduct, setUser, setActiveProduct }}
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
