"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SupportedStables() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full justify-between cursor-pointer duration-300 hover:opacity-70 flex items-center gap-1">
          <p className="font-normal text-sm 2xl:text-base text-(--primary-black)">
            Supported stables and tokens
          </p>
          <ChevronDown className="text-(--primary-black) w-5 2xl:w-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[223px] p-2.5 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6] shadow-none">
        {currencies.map((currency, index) => (
          <div
            key={index}
            className={cn(
              "w-full border-b-0 border-[#E7E7E7] cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5",
              {
                "border-b": index < currencies.length - 1,
              }
            )}
          >
            <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
              {currency}
            </p>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const currencies = ["NGNC - Stable", "USDC - Stable", "XLM - Token"];
