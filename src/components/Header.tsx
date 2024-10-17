"use client";  

import Image from "next/image";
import { MENU_ITEMS } from "@/constants";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    // This is a placeholder. Replace with actual API call
    const checkLoginStatus = async () => {
      try {
        // const response = await fetch('/api/check-login');
        // const data = await response.json();
        // setIsLoggedIn(data.isLoggedIn);
        setIsLoggedIn(false); // Placeholder: set to false for now
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Image src="/images/logo.png" alt="Logo" width={120} height={70} />
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation for Desktop */}
        <nav className="hidden md:flex space-x-8">
          {MENU_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="text-gray-600 hover:text-green-600 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-green-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Cart and Profile or Get Started button */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button className="p-2 bg-gray-100 rounded-full">
                <Image src="/svg/cart-icon.svg" alt="Cart" width={20} height={20} />
              </button>
              <div className="rounded-full overflow-hidden w-10 h-10">
                <Image src="/images/profile.png" alt="User Profile" width={40} height={40} />
              </div>
            </>
          ) : (
            <Link href="/auth/login">
              <button className="px-4 py-2 bg-[#0A9A66] text-white rounded-full">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Full-screen Menu for Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-green-500 z-50 flex flex-col items-start justify-start p-8">
          <button onClick={toggleMenu} className="self-end mb-8">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col space-y-6 w-full">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-white text-2xl font-semibold"
                onClick={toggleMenu}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mt-8">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 bg-white rounded-full">
                  <Image src="/svg/cart-icon.svg" alt="Cart" width={20} height={20} />
                </button>
                <div className="rounded-full overflow-hidden w-10 h-10">
                  <Image src="/images/profile.png" alt="User Profile" width={40} height={40} />
                </div>
              </div>
            ) : (
              <Link href="/auth/login">
                <button className="px-4 py-2 bg-white text-green-500 rounded-full text-lg font-semibold">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}