"use client";
import { useModal } from "@/contexts/ModalContext";
import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import SwapCurrencyInput from "../SwapCurrencyInput";
import Image from "next/image";

export default function SwapCurrency() {
  const { closeModal } = useModal();
  const [from, setFrom] = useState("USDC");
  const [to, setTo] = useState("NGNC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <div className="w-[484px] pb-10 @max-2xl:w-full max-w-full flex flex-col items-center">
      <div className="w-full mb-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            closeModal();
          }}
          className="hover:opacity-70 min-w-max cursor-pointer duration-300"
        >
          <MoveLeft className="w-5 text-[#141B34]" />
        </button>
        <h3 className="font-medium text-(--primary-black) text-base 2xl:text-xl text-center">
          Swap Currency
        </h3>
        <div />
      </div>
      <p className=" text-center mb-8 2xl:mb-10 max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Swaping is currently unavailable
      </p>
      <div className="w-full flex flex-col mb-[30px] 2xl:mb-[34px] gap-2">
        <SwapCurrencyInput
          amount={fromAmount}
          selectedCurrency={from}
          setAmount={setFromAmount}
          setSelectedCurrency={setFrom}
        />
        <RenderCurrencyBalance
          balance="USD100,000,000"
          currency="USDC Balance"
        />
      </div>

      <Image
        src="/images/funding/swap.svg"
        alt=""
        width={25}
        height={24}
        className="mb-[30px] 2xl:mb-[34px]"
      />

      <div className="w-full flex flex-col mb-8 2xl:mb-10 gap-2">
        <SwapCurrencyInput
          amount={toAmount}
          selectedCurrency={to}
          setAmount={setToAmount}
          setSelectedCurrency={setTo}
        />
        <RenderCurrencyBalance
          currency="NGN Balance"
          balance="NGN100,000,000"
        />
      </div>

      <button
        type="button"
        className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
      >
        Continue
      </button>
    </div>
  );
}

type CurrencyBalanceProps = {
  currency: string;
  balance: string;
};

const RenderCurrencyBalance = (props: CurrencyBalanceProps) => {
  const { balance, currency } = props;
  return (
    <div className=" w-full h-11 bg-[#FFFBEA] flex justify-between items-center rounded-[8px] px-[52px]">
      <p className="text-[#949494] text-[10px] font-normal">{currency}</p>
      <p className="text-[#2E2E2E] font-medium text-xs">{balance}</p>
    </div>
  );
};
