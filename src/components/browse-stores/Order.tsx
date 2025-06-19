import React from "react";
import IncrementAndDecrementValue from "./IncrementAndDecrementValue";
import Image from "next/image";

type Product = {
  data: {
    name: string;
    price: string;
    description: string;
  };
};

export default function Order(order: Product) {
  const { description, name, price } = order.data;
  return (
    <div className="w-full border-b border-dashed p-2.5 pb-4 flex flex-col border-[#E7E7E7]">
      <div className="w-full mb-7 2xl:mb-8 flex justify-between items-center">
        <h3 className="2xl:text-base text-sm font-normal text-[#111111]">
          {name}
        </h3>
        <button className="w-8 h-8 bg-[#FFDDDD] rounded-[8px] duration-300 hover:opacity-70 flex justify-center items-center">
          <Image
            width={16}
            height={16}
            src="/images/trash-can-red.svg"
            alt=""
          />
        </button>
      </div>
      <div className="w-full gap-8 flex items-start justify-between">
        <div className="w-full flex flex-col gap-2.5">
          <p className="font-medium text-[#5D5D5D] text-sm 2xl:text-base">
            {description}
          </p>
          <p className="font-normal text-[#B0B0B0] text-xs 2xl:text-sm">
            {price}
          </p>
        </div>
        <div className="min-w-max">
          <IncrementAndDecrementValue />
        </div>
      </div>
    </div>
  );
}
