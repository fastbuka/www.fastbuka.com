"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/contexts/WalletContext";
import { Currency, useCurrency } from "@/contexts/CurrencyContext";

type Props = {
  className?: string;
};

export default function ChangeCurrency(props: Props) {
  const { wallet } = useWallet();
  const { currency, setCurrency } = useCurrency();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`w-max @max-2xl:hidden cursor-pointer duration-300 hover:opacity-70 flex items-center gap-1 ${
            props?.className || ""
          }`}
        >
          <p className="font-normal text-sm @max-2xl:text-[10px] 2xl:text-base text-[#F6F6F6]">
            {currency === "native" ? "XLM" : currency}
          </p>
          <ChevronDown className="text-[#F6F6F6] @max-2xl:w-3 w-5 2xl:w-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[223px] p-2.5 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6] shadow-none">
        {wallet?.balances?.map((asset, index) => (
          <DropdownMenuItem
            onClick={() => {
              if (asset?.asset_type === "native") {
                setCurrency("native");
              } else {
                setCurrency(asset?.asset_code as Currency);
              }
            }}
            className="rounded-none"
            key={index}
            asChild
          >
            <div
              className={cn(
                "w-full border-b-0 border-[#E7E7E7] cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5",
                {
                  "border-b": index < wallet.balances.length - 1,
                }
              )}
            >
              <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
                {asset?.asset_type === "native" ? "XLM" : asset?.asset_code}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
