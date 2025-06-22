"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { Check, MoveLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ChangeCurrency from "../profile/ChangeCurrency";
import SupportedStables from "../SupportedStables";

export default function WalletFunding() {
  const { openModal } = useModal();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("GABCD1234XYZ...");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-[504px] pb-20 @max-2xl:w-full max-w-full flex flex-col items-center">
      <div className="w-full mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            openModal(ModalTypeEnum.FundingOptions);
          }}
          className="hover:opacity-70 min-w-max cursor-pointer duration-300"
        >
          <MoveLeft className="w-5 text-[#141B34]" />
        </button>
        <h3 className="font-medium text-(--primary-black) text-base 2xl:text-xl text-center">
          Copy Wallet Address to fund
        </h3>
        <div />
      </div>
      <p className="max-w-[419px] mb-2 text-center font-normal text-sm 2xl:text-base text-(--primary-black)">
        Deposit only supported stables and tokens in this address
      </p>
      <div className="flex mb-8 2xl:mb-10 gap-2 items-center">
        <p className="font-normal text-sm 2xl:text-base text-[#5D5D5D]">
          GABCD1234XYZ...{" "}
        </p>
        <button
          type="button"
          onClick={copyToClipboard}
          disabled={isCopied ? true : false}
          className="flex gap-1 font-normal text-sm 2xl:text-base items-center text-(--primary-green) hover:opacity-70 duration-300 cursor-pointer"
        >
          {isCopied ? (
            <Check className="text-inherit w-5 2xl:w-6" />
          ) : (
            <Image
              className="w-5 2xl:w-6"
              src="/images/copy.svg"
              alt=""
              width={24}
              height={24}
            />
          )}
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="w-full mb-8 2xl:mb-10 h-max bg-[#E26F00] rounded-[12px] px-6 2xl:py-8 py-7 flex flex-col">
        <div className="w-full flex mb-2.5 justify-between items-center">
          <p className="2xl:text-sm text-xs font-normal text-[#D1D1D1]">
            Available Balance
          </p>
          <ChangeCurrency className="@max-2xl:block" />
        </div>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[28px] 2xl:text-[32px] font-medium text-[#F6F6F6]">
            NGN100
          </h1>
        </div>
      </div>
      <SupportedStables />
    </div>
  );
}
