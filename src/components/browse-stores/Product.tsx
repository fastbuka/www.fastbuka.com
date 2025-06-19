import Image from "next/image";
import React from "react";
import IncrementAndDecrementValue from "./IncrementAndDecrementValue";

type Product = {
  data: {
    image: string;
    name: string;
    price: string;
    description: string;
  };
};

export default function Product(product: Product) {
  const { description, image, name, price } = product.data;
  return (
    <div className="col-span-1 gap-5 border border-[#E7E7E7] rounded-[12px] px-6 py-2.5 flex items-center justify-between">
      <div className="w-max max-w-full flex flex-col">
        <h3 className="text-[#111111] text-base 2xl:text-xl font-medium mb-2 2xl:mb-2.5">
          {name}
        </h3>
        <p className="font-normal text-sm 2xl:text-base text-[#5D5D5D] mb-7 2xl:mb-8">
          {description}
        </p>
        <p className="font-normal text-sm 2xl:text-base text-[#5D5D5D] mb-2 2xl:mb-2.5">
          {price}
        </p>
        <IncrementAndDecrementValue />
      </div>
      <Image
        src={image}
        alt=""
        width={115}
        height={122}
        className="min-w-[115px]"
      />
    </div>
  );
}
