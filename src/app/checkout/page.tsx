"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated using NuxtJS token or your own logic
  useEffect(() => {
    const token = localStorage.getItem("nuxt-auth-token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div className="flex items-center justify-between mb-4">
              <span>{item.name}</span>
              <span>{item.quantity} x ₦{item.price}</span>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          // Handle checkout logic here
          clearCart();
          router.push("/thank-you");
        }}
        className="bg-green-500 text-white px-6 py-3 rounded-lg mt-8"
      >
        Place Order
      </button>
    </div>
  );
}
