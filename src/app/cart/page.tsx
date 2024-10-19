"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Flag to indicate if cart items were already restored
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !restored) {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        try {
          const parsedCartItems = JSON.parse(savedCartItems);{}
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md mt-8 mb-16 hover:shadow-lg transition-shadow duration-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="relative w-[150px] h-[100px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => item.quantity > 1 && addToCart({ ...item, quantity: -1 })}
                        className="px-2 py-1 bg-gray-200 rounded-full text-gray-800"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                        className="px-2 py-1 bg-gray-200 rounded-full text-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">₦{item.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-right">₦{(item.price * item.quantity).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      className="text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="flex justify-between items-center mt-10">
          <Button onClick={clearCart} variant="destructive" className="bg-red-500 text-white">
            Clear Cart
          </Button>
          <Link href="/checkout">
            <Button className="bg-green-500 text-white">Proceed to Checkout</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
