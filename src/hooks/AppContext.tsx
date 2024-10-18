'use client'
import React, { createContext, useState } from 'react';

interface ChildrenProps{
    children: React.ReactNode;
  };

  interface ContextProps {
    cart: boolean;
    setCart: React.Dispatch<React.SetStateAction<boolean>>;
    checkout: boolean;
    setCheckout: React.Dispatch<React.SetStateAction<boolean>>;
    orderSuccess: boolean;
    setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  }


export const Context = createContext<ContextProps | null>(null)

export const AppContext:React.FC<ChildrenProps> = ({children}) => {
    const [cart, setCart] = useState(true)
    const [checkout, setCheckout] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)
const Value = {
    cart,
    setCart,
    checkout,
    setCheckout,
    orderSuccess,
    setOrderSuccess,
}

  return (
    <div>
      <Context.Provider value={Value}>
        {children}
      </Context.Provider>
    </div>
  );
};

