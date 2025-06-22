"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function SupportedStables() {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
        className="w-full justify-between cursor-pointer duration-300 hover:opacity-70 flex items-center gap-1"
      >
        <p className="font-normal text-sm 2xl:text-base text-(--primary-black)">
          Supported stables and tokens
        </p>
        <ChevronDown className="text-(--primary-black) w-5 2xl:w-6" />
      </div>
      <div className="w-full flex justify-end">
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-[223px] @max-2xl:translate-y-[calc(-100%-40px)]  p-2.5 fixed mt-2.5 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6]"
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
    </div>
  );
}

const currencies = ["NGNC - Stable", "USDC - Stable", "XLM - Token"];
