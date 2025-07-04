"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import ProfileDropdown from "./ProfileDropdown";
import { useManageUser } from "@/hooks/useManageUser";
import cookie from "js-cookie";
import { useWallet } from "@/contexts/WalletContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import links from "@/resources/menu-links.json";

export default function NavBarTwo() {
  const router = useRouter();
  const { user } = useUser();
  const { fetchUser, fetchWallet } = useManageUser();
  const { wallet } = useWallet();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = cookie.get("TOKEN");
    if (token && !user) {
      fetchUser(token);
    }
  }, []);

  useEffect(() => {
    if (user && !wallet) {
      fetchWallet(user.uuid);
    }
  }, [user, wallet, pathname]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      router.push(`/browse-stores?search=${search}`);
    }
  };

  return (
    <nav className="w-full max-w-[1250px] border-b border-[#DAFEEC] pb-6 2xl:pb-[30px] @max-4xl:border-b-0 @max-4xl:pb-0 px-5 h-max flex justify-between items-center @max-4xl:gap-5">
      <Link href="/" className="min-w-max w-max">
        <Image
          className="2xl:w-[115px] w-[95px] @max-4xl:w-16"
          src="/images/logo.svg"
          width={115}
          height={60}
          alt=""
        />
      </Link>

      <form
        onSubmit={handleFormSubmit}
        className="w-full hidden @max-4xl:flex gap-2 h-[50px] border border-[#E7E7E7] rounded-[12px] items-center px-3.5"
      >
        <input
          required
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search vendor"
          className="w-full text-sm font-normal text-[#888888] placeholder:text-[#888888] h-full outline-none bg-transparent border-none"
        />
        <Image
          src="/images/magnifying-glass.svg"
          alt=""
          width={24}
          height={24}
          className="w-4 h-4"
        />
      </form>

      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="min-w-4 w-4 h-max hidden @max-4xl:flex flex-col justify-center gap-[6px] items-center z-50"
      >
        <span
          className={`w-full h-[1px] duration-300 origin-left ${
            isOpen
              ? "rotate-45 bg-white translate-x-[1px] translate-y-0.5"
              : "rotate-0 bg-[#141B34]"
          }`}
        />
        <span
          className={`w-full h-[1px] bg-[#141B34] ${
            isOpen ? "opacity-0 " : "opacity-100"
          } duration-300`}
        />
        <span
          className={`w-full h-[1px] duration-300 origin-left ${
            isOpen
              ? "-rotate-45 translate-y-[-0.5px] translate-x-[1px] bg-white"
              : "rotate-0 bg-[#141B34]"
          }`}
        />
      </button>

      <div className="w-max @max-4xl:hidden flex items-center gap-2.5">
        {/* <div className="min-w-[184px]  @max-4xl:w-[184px] h-[50px]">
          <div className="w-full text-[#888888] flex justify-between items-center cursor-pointer text-sm 2xl:text-base font-normal px-6 h-[50px]">
            <Image
              src="/images/location-pin.svg"
              width={24}
              height={24}
              alt=""
              className="2xl:w-6 w-5"
            />{" "}
            Location
            <Image
              src="/images/chevron-down.svg"
              width={24}
              height={24}
              alt=""
              className="2xl:w-6 w-5"
            />
          </div>
        </div> */}
        <form
          onSubmit={handleFormSubmit}
          className="w-[520px] @max-6xl:w-[450px] gap-2.5 flex h-[50px] border border-[#E7E7E7] rounded-[12px] items-center px-6"
        >
          <Image
            src="/images/magnifying-glass.svg"
            alt=""
            width={24}
            height={24}
            className="2xl:w-6 w-5"
          />
          <input
            required
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search for food, drinks, vendors e.t.c"
            className="w-full text-sm 2xl:text-base font-normal text-[#888888] placeholder:text-[#888888] h-full outline-none bg-transparent border-none"
          />
        </form>
      </div>
      {user ? (
        <ProfileDropdown />
      ) : (
        <div className="w-max flex items-center @max-4xl:hidden gap-5">
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="hover:text-(--primary-green) cursor-pointer duration-200 primary-link-hover font-normal text-[#3D3D3D] text-sm 2xl:text-xl"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push("/register");
            }}
            className="bg-(--primary-green) hover:opacity-80 duration-200 text-[#F6F6F6] text-sm 2xl:text-xl font-normal py-3 @max-xl:px-3 px-6 rounded-[12px]"
          >
            Get Started
          </button>
        </div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ left: "-105%" }}
            animate={{ left: 0 }}
            exit={{ left: "-105%" }}
            className="fixed gap-1 top-0 left-0 z-40 bg-[#03301E] w-full h-screen py-[75px] px-6 flex flex-col overflow-y-auto"
          >
            <div
              className={`w-max ${
                pathname === "/" ? "text-(--primary-green)" : "text-[#F6F6F6]"
              } flex items-center py-2.5 gap-2.5 cursor-pointer`}
            >
              <p className="text-inherit duration-200 font-normal text-lg">
                Customer
              </p>
              <ChevronDown className="text-inherit w-5" />
            </div>
            {links.map((item, index) => {
              const isActive = item.path === pathname;
              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`hover:text-(--primary-green) ${
                    isActive ? "text-(--primary-green)" : "text-[#F6F6F6]"
                  }  duration-200 w-max primary-link-hover font-normal text-lg py-2.5`}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                router.push(user ? "/profile" : "/login");
              }}
              className="hover:text-(--primary-green) w-max text-[#F6F6F6] duration-200 primary-link-hover font-normal text-lg py-2.5"
            >
              {user ? "Profile" : "Login"}
            </button>
            {!user && (
              <button
                onClick={() => {
                  router.push("/register");
                }}
                className="bg-(--primary-green) w-max hover:opacity-80 duration-200 text-[#F6F6F6] text-lg font-normal py-3 px-6 mt-6 rounded-[12px]"
              >
                Get Started
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
