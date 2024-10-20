"use client";

import { useEffect, useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !restored) {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        try {
          const parsedCartItems = JSON.parse(savedCartItems);
          if (Array.isArray(parsedCartItems)) {
            parsedCartItems.forEach((item) => {
              addToCart(item);
            });
          }
        } catch (error) {
          console.error("Failed to parse cart items from localStorage", error);
        }
      }
      setRestored(true);
    }
  }, [isClient, restored, addToCart]);

  useEffect(() => {
    if (isClient && restored) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isClient, restored]);

  if (!isClient) return null;

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleQuantityChange = (item: CartItem, change: number) => {
    if (item.quantity + change > 0) {
      addToCart({ ...item, quantity: change });
    } else if (item.quantity + change === 0) {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/menu" className="flex items-center text-gray-600 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Menu
      </Link>

      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-6 bg-green-50 p-4 rounded-lg">
              <div className="w-24 h-24 mr-4 relative flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute -top-2 -left-2 bg-red-500 rounded-full p-1 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.restaurant || "Chicken Republic"}</p>
                <p className="text-gray-500 text-sm">Extras: Water, Salad</p>
                <p className="font-bold mt-1">₦{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600"
                >
                  -
                </button>
                <span className="mx-3">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-1/3">
          <div className="bg-green-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Subtotal</h2>
            <div className="flex justify-between mb-2">
              <span>Summary</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Item count</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex justify-between font-bold mt-4">
              <span>Amount to pay</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
            <Button className="w-full mt-6 bg-green-500 text-white py-3 rounded-full text-lg font-semibold">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
