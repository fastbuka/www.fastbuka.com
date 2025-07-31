"use client";
import Swap from "@/components/profile/Swap";
import TopUp from "@/components/profile/TopUp";
import { useWallet } from "@/contexts/WalletContext";
import { checkIsListedAsset, getAssetImage } from "@/lib/shared-utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import AssetBalance from "./AssetBalance";

export default function AssetList() {
  const { wallet } = useWallet();

  return (
    <div className="w-[504px] max-w-full flex flex-col">
      <h3 className="font-medium text-(--primary-black) text-lg 2xl:text-2xl 2xl:mb-[34px] mb-7">
        My Wallet
      </h3>
      <div className="w-full mb-5 2xl:mb-6">
        <AssetBalance />
      </div>
      <div className="w-full mb-7 2xl:mb-8 flex justify-between items-center">
        <TopUp />
        <Swap />
      </div>
      <h3 className="font-medium text-(--primary-black) text-lg 2xl:text-2xl 2xl:mb-6 mb-5">
        Asset
      </h3>
      <div className="w-full flex flex-col gap-3.5">
        {wallet?.balances?.map((asset, index) => {
          const isListedAsset = checkIsListedAsset(asset);
          return (
            <div
              key={index}
              className="w-full bg-white rounded-[8px] p-3 flex items-center gap-[7px]"
            >
              {isListedAsset && (
                <Image
                  src={getAssetImage(asset)}
                  alt=""
                  className="rounded-full"
                  width={24}
                  height={24}
                />
              )}
              <div className="flex flex-col gap-0.5">
                <h4 className="text-black text-sm font-medium">
                  {asset?.asset_type === "native" ? "XLM" : asset?.asset_code}
                </h4>
                <p
                  className={cn("text-[8px] font-normal text-[#00780E]", {
                    "text-[#D70000]": false,
                  })}
                >
                  {asset.balance}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
