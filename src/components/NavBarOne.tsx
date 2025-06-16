"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import links from "@/resources/menu-links.json";

export default function NavBarOne() {
  return (
    <nav className="w-full max-w-[1250px] px-5 h-max flex justify-between items-center">
      <Link href="/">
        <Image
          className="2xl:w-[115px] w-[95px]"
          src="/images/logo.svg"
          width={115}
          height={60}
          alt=""
        />
      </Link>
      <div className="w-max flex items-center gap-6">
        <div className="w-max flex items-center gap-1.5 2xl:gap-2.5 cursor-pointer">
          <p className="text-[#0EAD65] duration-200 font-normal text-sm 2xl:text-xl">
            Customer
          </p>
          <Image
            src="/images/chevron-down.svg"
            alt=""
            width={26}
            height={26}
            className="2xl:w-6 w-4"
          />
        </div>
        {links.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="hover:text-[#0EAD65] duration-200 primary-link-hover font-normal text-[#3D3D3D] text-sm 2xl:text-xl"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="w-max flex items-center gap-5 pl-2.5">
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
    </nav>
  );
}
