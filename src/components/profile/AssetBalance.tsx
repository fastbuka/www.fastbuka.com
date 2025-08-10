"use client";
import React, { useMemo } from "react";
import ChangeCurrency from "./ChangeCurrency";
import { useWallet } from "@/contexts/WalletContext";
import { MoveRight } from "lucide-react";
import { Currency, useCurrency } from "@/contexts/CurrencyContext";
import { formatNumber } from "@/lib/shared-utils";
import Link from "next/link";

export default function AssetBalance() {
  const { wallet } = useWallet();
  const { currency } = useCurrency();

  const XLMAsset = useMemo(() => {
    return wallet?.balances?.find((b) => b?.asset_type === "native");
  }, [wallet]);

  const getBalanceForCurrency = (currency: Currency) => {
    return (
      wallet?.balances?.find((b) => b?.asset_code === currency)?.balance || ""
    );
  };
  return (
    <div className="w-full h-max bg-[#E26F00] rounded-[12px] px-6 2xl:py-8 py-7 flex flex-col">
      <div className="w-full flex mb-2.5 justify-between items-center">
        <p className="2xl:text-sm text-xs font-normal text-[#D1D1D1]">
          Available Balance
        </p>
        <Link href="/account">
          <MoveRight className="w-4 text-[#F6F6F6]" />
        </Link>
      </div>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[28px] 2xl:text-[32px] font-medium text-[#F6F6F6]">
          {currency === "native"
            ? `XLM${formatNumber(XLMAsset?.balance || "")}`
            : `${currency}${formatNumber(getBalanceForCurrency(currency))}`}
        </h1>
        <ChangeCurrency />
      </div>
    </div>
  );
}
