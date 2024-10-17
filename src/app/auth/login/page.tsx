"use client";  

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg flex items-center">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 pr-0 md:pr-8">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Welcome Back!</h2>
          <p className="text-gray-600 mb-8">Enter your login details below</p>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="example@email.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁️
                </button>
              </div>
              <a href="/auth/forgot-password" className="text-green-600 text-sm mt-2 block">
                Forgot password?
              </a>
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
                <span className="ml-2 text-gray-700">Keep me logged in</span>
              </label>
            </div>

            <Button className="w-full bg-green-600 text-white py-3 rounded-lg">Login</Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <a href="/auth/register" className="text-green-600 font-semibold">
              Create an account
            </a>
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 hidden md:block">
          <Image
            src="/svg/illustration.svg"
            alt="FastBuka"
            className="rounded-lg w-full"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
