"use client";

import Image from "next/image";
import { MENU_ITEMS } from "@/constants";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getUser, getToken } from "@/utils/token";
import { useLogout } from "@/queries/auth";
import { getDefaultAvatar, getDefaultFirstName } from "@/utils/defaults";
import { QueryClient } from "react-query";

interface UserData {
  profile: {
    avatar: string;
    first_name: string;
  };
}

const userMenuItems = [
  { name: "Dashboard", path: "/user/dashboard" },
  { name: "Orders", path: "/user/orders" },
  { name: "Wallet", path: "/user/wallet" },
  { name: "Settings", path: "/user/settings" },
  { name: "Logout" }, // Logout will use the function, not a path
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [ isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const [user, setUser] = useState<UserData | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const token = getToken();
  const logout = useLogout(token, queryClient);

  useEffect(() => {
    const userData = getUser();
    const user_token = getToken();
    if (user_token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (userData) {
      setUser(userData as UserData);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout.mutate();
    setIsLoggedIn(false);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={120} height={70} />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
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
          <Link href="/cart">
            <button className="relative p-2 bg-gray-100 rounded-full">
              <Image
                src="/svg/cart-icon.svg"
                alt="Cart"
                width={20}
                height={20}
              />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2"
              >
                <div className="rounded-full overflow-hidden w-10 h-10">
                  <img
                    src={getDefaultAvatar(user?.profile?.avatar)}
                    alt="User Profile"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-gray-600">
                  {getDefaultFirstName(user?.profile?.first_name)}
                </span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  {userMenuItems.map((item) =>
                    item.name === "Logout" ? (
                      <button
                        key={item.name}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleLogout(); // Trigger the logout
                          setIsUserMenuOpen(false); // Close the menu
                        }}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.path || "#"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
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
        <div className="fixed inset-y-0 left-0 w-64 bg-green-500 z-50 flex flex-col items-start justify-start p-8 transform transition-transform duration-300 ease-in-out">
          <button onClick={toggleMenu} className="self-end mb-8">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
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
            {isLoggedIn && (
              <>
                <div className="border-t border-white my-4"></div>
                {userMenuItems.map((item) =>
                  item.name === "Logout" ? (
                    <button
                      key={item.name}
                      className="text-white text-xl text-left"  
                      onClick={() => {
                        handleLogout(); // Trigger the logout
                        toggleMenu(); // Close the menu
                      }}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.path}
                      className="text-white text-xl"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </a>
                  )
                )}
              </>
            )}
          </nav>
          <div className="mt-8 flex items-center space-x-4">
            <Link href="/cart">
              <button className="relative p-2 bg-white rounded-full">
                <Image
                  src="/svg/cart-icon.svg"
                  alt="Cart"
                  width={20}
                  height={20}
                />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="rounded-full overflow-hidden w-10 h-10">
                  <img
                    src={getDefaultAvatar(user?.profile?.avatar)}
                    alt="User Profile"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-white">
                  {getDefaultFirstName(user?.profile?.first_name)}
                </span>
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
