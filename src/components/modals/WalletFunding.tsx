"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { Check, MoveLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SupportedStables from "../SupportedStables";
import AssetBalance from "../profile/AssetBalance";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

export default function WalletFunding() {
  const { openModal } = useModal();
  const { wallet } = useWallet();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wallet?.address || "");
      setIsCopied(true);
      toast.success("Copied");
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
      <div className="flex w-full mb-8 2xl:mb-10 gap-2 justify-center items-center">
        <p className="font-normal max-w-[60%] truncate text-sm 2xl:text-base text-[#5D5D5D]">
          {wallet?.address}
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
      <div className="w-full mb-8 2xl:mb-10">
        <AssetBalance />
      </div>

      <SupportedStables />
    </div>
  );
}
