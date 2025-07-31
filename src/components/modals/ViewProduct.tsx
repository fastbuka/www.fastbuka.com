"use client";
import { useUser } from "@/contexts/UserContext";
import { formatNumber } from "@/lib/shared-utils";
import React from "react";

export default function ViewProduct() {
  const { activeProduct } = useUser();

  return (
    <div className="w-[500px] pb-5 h-[70vh] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium mb-3.5 text-[17px] 2xl:text-xl text-[#111111] text-start w-full">
        {activeProduct?.name}
      </h4>
      <p className="pb-4 border-[#E7E7E7] border-b border-dashed mb-5 w-full font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        {activeProduct?.description}
      </p>
      <div className="w-full flex flex-col gap-3">
        <RenderProductDetail
          label="Price"
          value={`NGN${formatNumber(activeProduct?.price || 0)}`}
        />
        <RenderProductDetail
          label="Discount"
          value={`NGN${formatNumber(activeProduct?.discount || 0)}`}
        />
        <RenderProductDetail
          label="Processing Time"
          value={activeProduct?.processing_time || ""}
        />
        <RenderProductDetail
          label="In Stock"
          value={activeProduct?.stock ? "Yes" : "No"}
        />
        <RenderProductDetail
          label="Ratings"
          value={activeProduct?.ratings || 0}
        />
      </div>
    </div>
  );
}

const RenderProductDetail = (menu: {
  label: string;
  value: string | number;
}) => {
  const { label, value } = menu;

  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-sm 2xl:text-base text-[#5D5D5D] font-normal">
        {label}
      </p>
      <p className="text-sm 2xl:text-base text-[#5D5D5D] font-normal">
        {value}
      </p>
    </div>
  );
};
