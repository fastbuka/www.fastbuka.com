"use client";  

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Image from "next/image";
import { useLogin } from "@/queries/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login } = useLogin();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }, {
      onSuccess: () => {
        router.push('/user/dashboard');
      },
      onError: () => {
        setLoginError('Login failed. Please check your credentials and try again.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg flex items-center">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 pr-0 md:pr-8">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-4">Enter your login details below</p>

          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 align-middle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <LuEye fontSize={20} />
                  ) : (
                    <LuEyeOff fontSize={20} />
                  )}
                </button>
              </div>
              <a
                href="/auth/forgot-password"
                className="text-green-600 text-sm mt-2 block"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg"
            >
              Login
            </Button>
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
