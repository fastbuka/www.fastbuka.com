"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyToken, useLogout } from "@/queries/auth";
import { Button } from "@/components/ui/button";
import { QueryClient } from 'react-query';

export default function UserDashboard() {
  const router = useRouter();
  const { data: tokenStatus, isLoading, error } = useVerifyToken();
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  useEffect(() => {
    if (error || (tokenStatus && !tokenStatus.isValid)) {
      router.push("/auth/login");
    }
  }, [error, tokenStatus, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <p>Here you can view your recent orders, manage your profile, and much more!</p>
      <Button onClick={handleLogout} className="mt-4 bg-red-600 text-white">Logout</Button>
      {/* Add more dashboard-specific components here */}
    </div>
  );
}
