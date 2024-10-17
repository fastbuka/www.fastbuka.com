"use client"; // Ensures it's a client-side component

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle submit logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <Image src="/images/logo.png" alt="FastBuka Logo" width={150} height={50} />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-2">Reset Password</h1>
        <p className="text-center text-gray-600 mb-8">
          Let&apos;s verify it&apos;s you. Kindly enter your email.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg">
            Send reset link
          </Button>
        </form>
      </div>
    </div>
  );
}
