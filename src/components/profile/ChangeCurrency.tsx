"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  className?: string;
};

export default function ChangeCurrency(props: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`w-max @max-2xl:hidden cursor-pointer duration-300 hover:opacity-70 flex items-center gap-1 ${
            props?.className || ""
          }`}
        >
          <p className="font-normal text-sm @max-2xl:text-[10px] 2xl:text-base text-[#F6F6F6]">
            Change Currency
          </p>
          <ChevronDown className="text-[#F6F6F6] @max-2xl:w-3 w-5 2xl:w-6" />
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

const currencies = ["NGN", "USD", "XLM"];
