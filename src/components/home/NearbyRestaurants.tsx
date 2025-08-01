import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import RenderMap from "../RenderMaps";
import { VendorsResponse } from "@/schema";

interface Props {
  vendors?: VendorsResponse["vendors"];
}

export default function NearbyRestaurants(props: Props) {
  const { vendors } = props;
  return (
    <div className="w-full flex justify-between @max-4xl:flex-col @max-4xl:gap-6  py-4 2xl:py-6 gap-[88px] items-center">
      <div className="w-[619px] min-w-[619px] @max-4xl:w-full @max-2xl:h-[266px]  @max-6xl:min-w-[50%] rounded-[12px] overflow-hidden h-[478px]">
        <RenderMap vendors={vendors} />
      </div>
      <div className="w-full flex flex-col">
        <h2 className="text-(--primary-black) mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
          Restaurant Near you
        </h2>
        <p className=" font-normal mb-5 2xl:mb-6 max-w-[434px] text-[#5D5D5D] text-sm 2xl:text-base">
          From sizzling suya spots to hidden bukas, all with blockchain-secured
          payments for worry-free ordering
        </p>
        <Link
          href="/browse-stores"
          className="bg-(--primary-green) w-max flex items-center justify-center hover:opacity-80 duration-200 text-[#F6F6F6] text-sm 2xl:text-xl font-normal py-3 px-6 rounded-[12px]"
        >
          Explore Vendors&nbsp; <MoveRight height={14} />
        </Link>
      </div>
    </div>
  );
}
