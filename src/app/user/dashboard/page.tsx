// src/app/user/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { Button } from "@/components/ui/button";
import { QueryClient } from 'react-query';
import { getUser, getToken } from "@/utils/token";
import { ShoppingBag, Wallet, AlertCircle } from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push("/auth/login");
    } else {
      setUser(userData);
    }
  }, [router]);

  const handleLogout = () => {
    logout.mutate();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const widgets = [
    { title: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-500' },
    { title: 'Wallet Balance', value: '₦50,000', icon: Wallet, color: 'bg-green-500' },
    { title: 'Active Orders', value: '3', icon: AlertCircle, color: 'bg-yellow-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-6">Welcome, {user.profile.first_name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {widgets.map((widget, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className={`${widget.color} rounded-full p-3 mr-4`}>
              <widget.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{widget.title}</h3>
              <p className="text-2xl font-bold">{widget.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {/* Add a table or list of recent orders here */}
      </div>

      <Button onClick={handleLogout} className="bg-red-600 text-white">Logout</Button>
    </div>
  );
} 