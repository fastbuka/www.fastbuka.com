import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import RenderMap from "../RenderMaps";

export default function NearbyRestaurants() {
  return (
    <div className="w-full flex justify-between py-4 2xl:py-6 gap-[88px] items-center">
      <div className="w-[619px] min-w-[619px] rounded-[12px] overflow-hidden h-[478px]">
        <RenderMap />
      </div>
      <div className="w-full flex flex-col">
        <h2 className="text-[#111111] mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
          Restaurant Near you
        </h2>
        <p className=" font-normal mb-5 2xl:mb-6 max-w-[434px] text-[#5D5D5D] text-sm 2xl:text-base">
          From sizzling suya spots to hidden bukas, all with blockchain-secured
          payments for worry-free ordering
        </p>
        <Link
          href="#"
          className="bg-[#0EAD65] w-max flex items-center justify-center hover:opacity-80 duration-200 text-[#F6F6F6] text-sm 2xl:text-xl font-normal py-3 px-6 rounded-[12px]"
        >
          Explore Vendors&nbsp; <MoveRight height={14} />
        </Link>
      </div>
    </div>
  );
}
