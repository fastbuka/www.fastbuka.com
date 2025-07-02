import AssetList from "@/components/profile/AssetList";
import React from "react";

export default function Page() {
  return (
    <div className="w-max max-w-full mb-[139px] 2xl:mb-[169px] flex flex-col items-center">
      <h2 className="text-(--primary-black) text-center mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
        Your Account
      </h2>
      <p className="text-center font-normal text-[#5D5D5D] text-sm 2xl:text-base 2xl:mb-[50px] mb-10">
        Your money, secured by blockchain - top up, pay vendors instantly!
      </p>
      <AssetList />
    </div>
  );
}
