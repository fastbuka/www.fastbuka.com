"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

type Props = {
  className?: string;
};

export default function ChangeCurrency(props: Props) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <div className={cn("relative @max-2xl:hidden w-max", props?.className)}>
      <div
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
        className="w-max cursor-pointer duration-300 hover:opacity-70 flex items-center gap-1"
      >
        <p className="font-normal text-sm @max-2xl:text-[10px] 2xl:text-base text-[#F6F6F6]">
          Change Currency
        </p>
        <ChevronDown className="text-[#F6F6F6] @max-2xl:w-3 w-5 2xl:w-6" />
      </div>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-[223px] z-50 top-[calc(100%+10px)] p-2.5 absolute right-0 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6]"
          >
            {currencies.map((currency, index) => (
              <div
                key={index}
                onClick={() => {
                  setShowDropdown((prev) => !prev);
                }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const currencies = ["NGN", "USD", "XLM"];
