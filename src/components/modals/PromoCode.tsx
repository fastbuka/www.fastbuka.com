"use client";
import { useModal } from "@/contexts/ModalContext";
import React from "react";

export default function ApplyPromoCode() {
  const { closeModal } = useModal();

  return (
    <div className="w-[490px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium mb-6 text-[17px] 2xl:text-xl text-[#111111] text-center">
        Promo codes
      </h4>

      <form className="w-full flex flex-col gap-6">
        <div className="w-full flex gap-2 2xl:h-[50px] h-11">
          <input
            placeholder="Input promo code here"
            className="h-full w-full placeholder:text-[#B0B0B0] text-[#B0B0B0] border border-[#E7E7E7] rounded-[12px] px-6 outline-none text-sm 2xl:text-base"
          />
          <button
            type="button"
            className="w-max min-w-max px-6 bg-(--primary-green) h-full text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[12px] text-white font-normal"
          >
            Redeem
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            closeModal();
          }}
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Apply Promo
        </button>
      </form>
    </div>
  );
}
