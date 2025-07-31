"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

export default function FundingOptions() {
  const { openModal } = useModal();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected === "wallet-address") {
      openModal(ModalTypeEnum.WalletFunding);
    } else if (selected === "bank-transfer") {
      openModal(ModalTypeEnum.SelectCurrencyForTransfer);
    } else {
      openModal(ModalTypeEnum.CardDetails);
    }
  };

  return (
    <div className="w-[459px] pb-20 @max-2xl:w-full max-w-full flex flex-col items-center">
      <h3 className="font-medium text-(--primary-black) mb-8 2xl:mb-10 text-base 2xl:text-xl text-center">
        Funding Options
      </h3>
      <div className="w-full flex flex-col gap-2.5 mb-8 2xl:mb-10">
        {options.map((option) => {
          return (
            <button
              type="button"
              onClick={() => {
                setSelected(option.value);
              }}
              className="w-full pl-2.5 cursor-pointer border-b border-[#E7E7E7] hover:opacity-70 duration-300 flex justify-between items-center h-12"
              key={option.value}
            >
              <div className="flex items-center gap-2.5">
                <Image src={option.image} alt="" width={24} height={24} />
                <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
                  {option.title}
                </p>
              </div>
              <div className="2xl:w-6 2xl:h-6 w-5 h-5 rounded-full border-2 border-(--primary-green) p-0.5">
                <div
                  className={cn(
                    "w-full h-full rounded-full bg-transparent duration-300",
                    {
                      "bg-(--primary-green)": selected === option.value,
                    }
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          handleContinue();
        }}
        disabled={selected ? false : true}
        className="w-full bg-(--primary-green) disabled:opacity-50 h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
      >
        Enter
      </button>
    </div>
  );
}

const options = [
  {
    title: "Wallet Address",
    value: "wallet-address",
    image: "/images/funding/wallet.svg",
  },
  {
    title: "Bank transfer",
    value: "bank-transfer",
    image: "/images/funding/transfer.svg",
  },
  {
    title: "Card",
    value: "card",
    image: "/images/funding/card.svg",
  },
];
