"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRegister, RegisterData } from "@/queries/auth";
import { useRouter } from "next/navigation";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);

  const router = useRouter();
  const { mutate: register } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const registerData: RegisterData = { fullName, email, password };
    register(registerData, {
      onSuccess: () => {
        router.push('/auth/login');
      },
      onError: () => {
        setRegisterError('Registration failed. Please try again.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg flex items-center">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 pr-0 md:pr-8">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Create an Account</h2>
          <p className="text-gray-600 mb-4">Sign up to start ordering from FastBuka</p>

          {registerError && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>{registerError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg">
              Create Account
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/auth/login" className="text-green-600 font-semibold">
              Login
            </a>
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 hidden md:block">
          <Image
            src="/svg/illustration.svg"
            alt="FastBuka"
            className="rounded-lg w-full"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
