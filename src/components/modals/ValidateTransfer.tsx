"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ValidateTransfer() {
  const { openModal } = useModal();

  return (
    <div className="w-[500px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <div className="w-full mb-8 2xl:mb-10 flex items-center gap-10">
        <button
          type="button"
          onClick={() => {
            openModal(ModalTypeEnum.SelectCurrencyForTransfer);
          }}
          className="hover:opacity-70 min-w-max cursor-pointer duration-300"
        >
          <MoveLeft className="w-5 text-[#141B34]" />
        </button>
        <h3 className="font-medium text-(--primary-black) text-base 2xl:text-xl text-center">
          Transfer to
        </h3>
        <div />
      </div>
      <p className="text-black text-sm 2xl:text-base font-normal mb-1.5">
        Account Name: FASTBUKA{" "}
      </p>
      <p className="text-black text-sm 2xl:text-base font-normal mb-1.5">
        Account Number: 1234567890
      </p>
      <p className="text-black text-sm 2xl:text-base font-normal mb-8 2xl:mb-10">
        Bank: Titan Bank
      </p>
      <h3 className="text-black font-semibold text-base 2xl:text-xl mb-8 2xl:mb-10">
        NGN10,0000
      </h3>
      <Image
        src="/images/spinner-one.png"
        alt=""
        width={63}
        height={63}
        className="animate-spin mb-8 2xl:mb-10"
      />
      <p className="text-center font-normal text-[#888888] text-sm 2xl:text-base mb-8 2xl:mb-10">
        Please ensure you transfer the exact amount shown, nothing more or less,
        to avoid rejection by the system
      </p>
      <button
        type="button"
        onClick={() => {
          openModal(ModalTypeEnum.Success);
        }}
        className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
      >
        Continue
      </button>
    </div>
  );
}
