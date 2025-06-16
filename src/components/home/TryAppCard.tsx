import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TryAppCard() {
  return (
    <div
      style={{ backgroundImage: "url(/images/jollof-rice.svg)" }}
      className="w-full h-max bg-[#FF9702] bg-contain bg-no-repeat bg-right rounded-[32px] pt-[68px] pb-[74px] pl-[88px]"
    >
      <div className="2xl:w-[494px] w-[444px] flex flex-col">
        <h2 className="text-[#111111] mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
          Try the App Today!
        </h2>
        <p className=" font-normal mb-5 2xl:mb-6 max-w-[414px] 2xl:max-w-[434px] text-[#5D5D5D] text-sm 2xl:text-base">
          Get your favorite African and continental dishes delivered fast - hot,
          fresh, and straight to your door!
        </p>
        <div className="w-full grid grid-cols-2 gap-2.5">
          <Link href="#" className="col-span-1">
            <Image
              alt=""
              src="/images/appstore-button.svg"
              width={232}
              height={64}
              className="w-full"
            />
          </Link>
          <Link href="#" className="col-span-1">
            <Image
              alt=""
              src="/images/playstore-button.svg"
              width={232}
              height={64}
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
