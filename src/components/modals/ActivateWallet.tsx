import { ChevronDown, MoveRight } from "lucide-react";
import React from "react";

export default function ActivateWallet() {
  return (
    <div className="w-[504px] pb-20 @max-2xl:w-full max-w-full flex flex-col items-center">
      <h3 className="font-medium text-(--primary-black) mb-8 2xl:mb-10 text-base 2xl:text-xl text-center">
        Activate your wallet
      </h3>
      <div className="w-full mb-8 2xl:mb-10 h-max bg-[#E26F00] opacity-50 rounded-[12px] px-6 2xl:py-8 py-7 flex flex-col">
        <div className="w-full flex mb-2.5 justify-between items-center">
          <p className="2xl:text-sm text-xs font-normal text-[#D1D1D1]">
            Available Balance
          </p>
          <MoveRight className="w-4 text-[#F6F6F6]" />
        </div>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[28px] 2xl:text-[32px] font-medium text-[#F6F6F6]">
            NGN0
          </h1>
          <div className="w-max flex items-center gap-1">
            <p className="font-normal text-sm 2xl:text-base text-[#F6F6F6]">
              Change Currency
            </p>
            <ChevronDown className="text-[#F6F6F6] w-5 2xl:w-6" />
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <button
          type="button"
          className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Activate Wallet
        </button>
      </div>
    </div>
  );
}
