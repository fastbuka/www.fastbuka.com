"use client";
import { CartProduct, useCart } from "@/contexts/CartContext";
import React from "react";

export default function IncrementAndDecrementValue({
  item,
}: {
  item: CartProduct;
}) {
  const { incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="flex gap-2.5">
      <button
        disabled={item.quantity <= 1}
        onClick={() => {
          decrementQuantity(item.uuid);
        }}
        className="w-6 disabled:opacity-50 h-7 rounded bg-[#FF9702] hover:opacity-80 duration-300 text-base text-[#F6F6F6] font-normal"
      >
        -
      </button>
      <div className="w-max h-7 rounded bg-[#FFFBEA] px-[9px] flex items-center justify-center">
        <p className="text-base font-normal text-[#FF9702]">{item.quantity}</p>
      </div>
      <button
        onClick={() => {
          incrementQuantity(item.uuid);
        }}
        className="w-6 disabled:opacity-50 h-7 rounded bg-[#FF9702] hover:opacity-80 duration-300 text-base text-[#F6F6F6] font-normal"
      >
        +
      </button>
    </div>
  );
}
