"use client";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/contexts/ModalContext";
import { useWallet } from "@/contexts/WalletContext";
import { formatNumber } from "@/lib/shared-utils";
import { useUser } from "@/contexts/UserContext";

export default function Success() {
  const { closeModal } = useModal();
  const { ongoingTransfer, setOngoingTransfer, ongoingTopup, setOngoingTopup } =
    useWallet();
  const { activeOrder, setActiveOrder } = useUser();

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h3 className="text-center font-medium text-[#111111] text-base 2xl:text-xl mb-9 2xl:mb-[50px]">
        {ongoingTransfer && "Funding Options"}
        {activeOrder && "Order placed"}
      </h3>
      <Image src="/images/success.svg" alt="" width={140} height={140} />
      {(ongoingTransfer || ongoingTopup) && (
        <p className="mt-4 mb-9 2xl:mb-[50px] 2xl:mt-6 text-center max-w-[294px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
          You have successfully funded your account with NGN
          {ongoingTopup
            ? formatNumber(ongoingTopup.amount)
            : formatNumber(ongoingTransfer?.transfer_amount || 0)}
        </p>
      )}

      {activeOrder && (
        <p className="mt-4 mb-9 2xl:mb-[50px] 2xl:mt-6 text-center max-w-[294px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
          You have successfully placed an order, Thank you for using FastBuka!
        </p>
      )}

      <button
        type="button"
        onClick={() => {
          closeModal();
          if (activeOrder) {
            setActiveOrder(null);
          } else if (ongoingTransfer) {
            setOngoingTransfer(null);
          } else if (ongoingTopup) {
            setOngoingTopup(null);
          }
        }}
        className={cn(
          "w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        )}
      >
        Okay
      </button>
    </div>
  );
}
