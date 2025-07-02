"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import React from "react";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="flex hover:opacity-70 duration-300 items-center gap-2.5"
    >
      <Image
        src="/images/primary-logout.svg"
        alt=""
        width={24}
        height={24}
        className="w-5 2xl:w-6"
      />
      <p className="text-(--primary-black) text-sm 2xl:text-base font-medium">
        Sign Out
      </p>
    </button>
  );
}
