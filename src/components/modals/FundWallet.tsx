import { MoveRight } from "lucide-react";
import React from "react";

export default function FundWallet() {
  return (
    <div className="w-[504px] pb-20 @max-2xl:w-full max-w-full flex flex-col items-center">
      <h3 className="font-medium text-(--primary-black) mb-2 text-base 2xl:text-xl text-center">
        Fund your wallet
      </h3>
      <p className=" text-center mb-8 2xl:mb-10 max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Add Money to Your FastBuka Wallet
      </p>
      <div className="w-full mb-8 2xl:mb-10 h-max bg-[#E26F00] rounded-[12px] px-6 2xl:py-8 py-7 flex flex-col">
        <div className="w-full flex mb-2.5 justify-between items-center">
          <p className="2xl:text-sm text-xs font-normal text-[#D1D1D1]">
            Available Balance
          </p>
          <MoveRight className="w-4 text-[#F6F6F6]" />
        </div>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[28px] 2xl:text-[32px] font-medium text-[#F6F6F6]">
            NGN100
          </h1>
        </div>
      </div>
      <div className="w-full px-4">
        <button
          type="button"
          className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}
