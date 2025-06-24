import React, { useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  amount: string;
  setAmount: (v: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (v: string) => void;
};

export default function SwapCurrencyInput(props: Props) {
  const { amount, selectedCurrency, setAmount, setSelectedCurrency } = props;
  const currency = useMemo(() => {
    return options.find((o) => o.name === selectedCurrency) || null;
  }, [selectedCurrency]);

  return (
    <div className="w-full relative px-2.5 py-2 flex items-center rounded-[8px] border border-(--primary-green) h-14 bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-max absolute min-w-max bg-[#F5F5F5] h-[calc(100%-16px)] left-2.5 top-2 rounded p-2 cursor-pointer duration-300 hover:opacity-70 flex items-center">
            <Image
              src={currency?.image || ""}
              alt=""
              className="w-6 h-6 object-cover"
              width={24}
              height={16}
            />
            <p className="ml-1 text-sm font-medium text-[#2E2E2E]">
              {currency?.name}
            </p>
            <ChevronDown className="text-(--primary-black) w-5 2xl:w-6" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[223px] p-2.5 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6] shadow-none">
          {options.map((c, index) => (
            <DropdownMenuItem
              onClick={() => {
                setSelectedCurrency(c.name);
              }}
              className="rounded-none"
              key={index}
              asChild
            >
              <div
                className={cn(
                  "w-full border-b-0 border-[#E7E7E7] cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5",
                  {
                    "border-b": index < options.length - 1,
                  }
                )}
              >
                <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
                  {c.name}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type="text"
        disabled
        className="w-full h-full @max-2xl:text-end border-0 text-center outline-0 bg-transparent text-xs font-normal text-[#B0B0B0] placeholder:text-[#B0B0B0]"
        placeholder="Amount to swap"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
    </div>
  );
}

const options = [
  {
    image: "/images/usdc-coin.png",
    name: "USDC",
  },
  {
    image: "/images/ngnc-coin.png",
    name: "NGNC",
  },
];
