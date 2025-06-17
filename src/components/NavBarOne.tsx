"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import links from "@/resources/menu-links.json";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavBarOne() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full max-w-[1250px] px-5 h-max flex justify-between items-center">
      <Link href="/">
        <Image
          className="2xl:w-[115px] w-[95px] @max-4xl:w-16"
          src="/images/logo.svg"
          width={115}
          height={60}
          alt=""
        />
      </Link>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="w-4 h-max hidden @max-4xl:flex flex-col justify-center gap-[6px] items-center z-50"
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
      <div className="w-max @max-4xl:hidden flex items-center gap-6">
        <div
          className={`w-max ${
            pathname === "/" ? "text-[#0EAD65]" : "text-[#3D3D3D]"
          } flex items-center gap-1.5 2xl:gap-2.5 cursor-pointer`}
        >
          <p className="text-inherit duration-200 font-normal text-sm 2xl:text-xl">
            Customer
          </p>
          <ChevronDown className="2xl:w-6 w-4 text-inherit" />
        </div>
        {links.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={index}
              href={item.path}
              className={`hover:text-[#0EAD65] duration-200 primary-link-hover font-normal text-sm 2xl:text-xl ${
                isActive ? "text-[#0EAD65]" : "text-[#3D3D3D]"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="w-max @max-4xl:hidden flex items-center gap-5 pl-2.5">
        <Link
          href="#"
          className="hover:text-[#0EAD65] duration-200 primary-link-hover font-normal text-[#3D3D3D] text-sm 2xl:text-xl"
        >
          Login
        </Link>
        <Link
          href="#"
          className="bg-[#0EAD65] hover:opacity-80 duration-200 text-[#F6F6F6] text-sm 2xl:text-xl font-normal py-3 px-6 rounded-[12px]"
        >
          Get Started
        </Link>
      </div>
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
                pathname === "/" ? "text-[#0EAD65]" : "text-[#F6F6F6]"
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
                  className={`hover:text-[#0EAD65] ${
                    isActive ? "text-[#0EAD65]" : "text-[#F6F6F6]"
                  }  duration-200 primary-link-hover font-normal text-lg py-2.5`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="#"
              className="hover:text-[#0EAD65] text-[#F6F6F6] duration-200 primary-link-hover font-normal text-lg py-2.5"
            >
              Login
            </Link>
            <Link
              href="#"
              className="bg-[#0EAD65] w-max hover:opacity-80 duration-200 text-[#F6F6F6] text-lg font-normal py-3 px-6 mt-6 rounded-[12px]"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
