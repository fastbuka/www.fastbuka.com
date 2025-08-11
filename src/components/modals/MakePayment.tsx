"use client";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import AssetBalance from "../profile/AssetBalance";
import { useManageUser } from "@/hooks/useManageUser";
import Spinner from "../auth/Spinner";
import TopUp from "../profile/TopUp";
import Swap from "../profile/Swap";

export default function MakePayment() {
  const { activeOrder } = useUser();
  const { makePayment, loading } = useManageUser();

  async function handleMakePayment() {
    try {
      await makePayment(activeOrder?.uuid || "");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[504px] pb-20 @max-2xl:w-full max-w-full flex flex-col items-center">
      <h3 className="font-medium text-(--primary-black) mb-2 text-base 2xl:text-xl text-center">
        Make Payment
      </h3>
      <p className=" text-center mb-8 2xl:mb-10 max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Pay with your wallet balance
      </p>
      <AssetBalance />
      <div className="flex justify-between w-full p-3">
        <TopUp />
        <Swap />
      </div>
      <button
        type="button"
        onClick={handleMakePayment}
        className="w-full mt-6 bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
      >
        {loading ? <Spinner /> : "Make Payment"}
      </button>
    </div>
  );
}
