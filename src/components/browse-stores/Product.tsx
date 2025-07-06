"use client";
import { Product } from "@/schema";
import React, { useState } from "react";

export default function ProductComponent({ product }: { product: Product }) {
  const { description, image, name, price } = product;
  const [imgSrc, setImgSrc] = useState(image);
  return (
    <div className="col-span-1 gap-5 border border-[#E7E7E7] rounded-[12px] px-6 py-2.5 flex items-center justify-between">
      <div className="w-max max-w-full flex flex-col">
        <h3 className="text-(--primary-black) line-clamp-1 text-base 2xl:text-xl font-medium mb-2 2xl:mb-2.5">
          {name}
        </h3>
        <p className="font-normal line-clamp-2  text-sm 2xl:text-base text-[#5D5D5D] mb-7 2xl:mb-8">
          {description}
        </p>
        <p className="font-normal text-sm 2xl:text-base text-[#5D5D5D] mb-2 2xl:mb-2.5">
          {price}
        </p>
        <button className="h-7 w-max px-3 rounded bg-[#FF9702] hover:opacity-80 duration-300 text-sm text-[#F6F6F6] font-normal">
          Add to cart
        </button>
      </div>
      <img
        src={imgSrc}
        alt=""
        onError={() => {
          console.log("error loading image");
          setImgSrc("/images/product-placeholder.jpg");
        }}
        className="min-w-[115px] w-[115px] h-[122px] object-cover"
      />
    </div>
  );
}
