"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBack() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="cursor-pointer w-max flex items-center gap-2.5 font-normal text-base 2xl:text-xl text-[#111111] hover:text-[#0EAD65] duration-200"
    >
      <ChevronLeft className="w-5 2xl:w-6 text-inherit" />
      Go Back
    </button>
  );
}
