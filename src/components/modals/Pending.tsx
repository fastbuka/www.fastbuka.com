"use client";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";

export default function PendingModal() {
  const { closeModal } = useModal();

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h3 className="text-center font-medium text-[#111111] text-base 2xl:text-xl mb-9 2xl:mb-[50px]">
        Funding Options
      </h3>
      <Image src="/images/pending.svg" alt="" width={140} height={140} />
      <p className="mt-4 mb-9 2xl:mb-[50px] 2xl:mt-6 text-center max-w-[434px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Your card transaction for NGN10,000 is still pending. Please wait a few
        moments and check your account again. If the issue persists, contact
        support.
      </p>
      <button
        type="button"
        onClick={() => {
          closeModal();
        }}
        className={cn(
          "w-full  bg-[#FFBA1B] h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        )}
      >
        Okay
      </button>
    </div>
  );
}
