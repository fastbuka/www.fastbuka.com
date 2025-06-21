import Image from "next/image";
import React from "react";

export default function Swap() {
  return (
    <button className="w-max cursor-pointer hover:opacity-70 duration-300 flex items-center gap-2.5 p-2 2xl:p-2.5">
      <Image
        src="/images/swap.svg"
        alt=""
        width={20}
        height={20}
        className="w-5"
      />
      <p className="text-(--primary-black) font-normal text-sm 2xl:text-base">
        Swap
      </p>
    </button>
  );
}
