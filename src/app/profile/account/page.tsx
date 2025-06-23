import Authentication from "@/components/auth/Authentication";
import AuthenticatedModals from "@/components/AuthenticatedModals";
import ChangeCurrency from "@/components/profile/ChangeCurrency";
import Swap from "@/components/profile/Swap";
import TopUp from "@/components/profile/TopUp";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="w-max max-w-full mb-[139px] 2xl:mb-[169px] flex flex-col items-center">
      <Authentication />
      <AuthenticatedModals />
      <h2 className="text-(--primary-black) text-center mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
        Your Account
      </h2>
      <p className="text-center font-normal text-[#5D5D5D] text-sm 2xl:text-base 2xl:mb-[50px] mb-10">
        Your money, secured by blockchain - top up, pay vendors instantly!
      </p>
      <div className="w-[504px] max-w-full flex flex-col">
        <h3 className="font-medium text-(--primary-black) text-lg 2xl:text-2xl 2xl:mb-[34px] mb-7">
          My Wallet
        </h3>
        <div className="w-full mb-5 2xl:mb-6 h-max bg-[#E26F00] rounded-[12px] px-6 2xl:py-8 py-7 flex flex-col">
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
            <ChangeCurrency />
          </div>
        </div>
        <div className="w-full mb-7 2xl:mb-8 flex justify-between items-center">
          <TopUp />
          <Swap />
        </div>
        <h3 className="font-medium text-(--primary-black) text-lg 2xl:text-2xl 2xl:mb-6 mb-5">
          Asset
        </h3>
        <div className="w-full flex flex-col gap-3.5">
          {assets.map((asset, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white rounded-[8px] p-3 flex items-center gap-[7px]"
              >
                <Image
                  src={asset.image}
                  alt=""
                  className="rounded-full"
                  width={24}
                  height={24}
                />
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-black text-sm font-medium">
                    {asset.name}
                  </h4>
                  <p
                    className={cn("text-[8px] font-normal text-[#00780E]", {
                      "text-[#D70000]": !asset.rising,
                    })}
                  >
                    {asset.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const assets = [
  {
    image: "/images/xlm-coin.png",
    name: "1000XML",
    value: "−1.94 (0.46%)",
    rising: false,
  },
  {
    image: "/images/ngnc-coin.png",
    name: "100USDC",
    value: "+1.94 (0.46%)",
    rising: true,
  },
  {
    image: "/images/usdc-coin.png",
    name: "50NGNC",
    value: "+1.94 (0.46%)",
    rising: true,
  },
];
