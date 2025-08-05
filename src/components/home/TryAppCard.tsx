import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TryAppCard() {
  return (
    <div className="w-full h-max @max-5xl:relative @max-5xl:h-[724px] @max-5xl:bg-none bg-(image:--jollof-rice-bg) @max-5xl:w-max bg-[#FF9702] bg-contain @max-5xl:max-w-full @max-5xl:mx-auto overflow-hidden bg-no-repeat bg-right @max-6xl:px-6 rounded-[32px] pt-[68px] pb-[74px] pl-[88px]">
      <div className="2xl:w-[494px] w-[444px] flex flex-col">
        <h2 className="text-(--primary-black) mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
          Coming to mobile soon!
          {/* Try the App Today! */}
        </h2>
        <p className=" font-normal @max-6xl:max-w-[300px] mb-5 2xl:mb-6 max-w-[414px] 2xl:max-w-[434px] text-[#5D5D5D] text-sm 2xl:text-base">
          Get your favorite African and continental dishes delivered fast - hot,
          fresh, and straight to your door!
        </p>
        <div className="w-full grid grid-cols-2 @max-5xl:grid-cols-1 @max-5xl:w-[242px] gap-2.5">
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
      <Image
        className="absolute right-0 bottom-0 hidden @max-5xl:block"
        src="/images/jollof-rice-mobile.png"
        width={629}
        height={629}
        alt=""
      />
    </div>
  );
}
