"use client";
import React from "react";
import Product from "./Product";
import Order from "./Order";

type Product = {
  image: string;
  name: string;
  price: string;
  description: string;
};

type Order = {
  name: string;
  price: string;
  description: string;
};

export default function Products() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1210px] px-5 grid grid-cols-5">
        <div className="col-span-3 2xl:pr-[43px] border-r pt-5 2xl:pt-6 border-[#E7E7E7]">
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 2xl:gap-y-10 w-full p-2.5">
            {dummyProducts.map((product, index) => {
              return <Product key={index} data={product} />;
            })}
          </div>
        </div>
        <div className="col-span-2 p-6 flex flex-col">
          <div className="w-full mb-7 2xl:mb-8 pb-4 border-b border-[#E7E7E7] flex justify-between items-start gap-8">
            <p className="text-sm w-full 2xl:text-base text-[#5D5D5D] font-normal">
              Chicken Republic - Asaba
            </p>
            <button className="min-w-max font-normal text-[#0EAD65] text-sm 2xl:text-base bg-[#DAFEEC] py-2 px-4 rounded-[12px] hover:opacity-70 duration-300">
              Add another pack
            </button>
          </div>
          <div className="w-full flex flex-col gap-5 2xl:gap-6 mb-2">
            {dummyOrders.map((order, index) => {
              return <Order data={order} key={index} />;
            })}
          </div>
          <div className="w-full flex flex-col py-2 2xl:py-2.5 mb-5 gap-2.5">
            <RenderActionMenu value="Payment Method" label="Choose" />
            <RenderActionMenu value="Promo Code" label="Choose" />
            <RenderActionMenu value="Delivery Address" label="Choose" />
            <RenderActionMenu value="Delivery instructions" label="Add" />
            <RenderActionMenu value="Vendor instructions" label="Add" />
          </div>
        </div>
      </div>
    </div>
  );
}

type ActionMenu = {
  value: string;
  label: string;
  onClick?: () => void;
};

const RenderActionMenu = (menu: ActionMenu) => {
  const { label, value, onClick } = menu;

  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-sm 2xl:text-base text-[#5D5D5D] font-normal">
        {value}
      </p>
      <button
        onClick={() => {
          onClick?.();
        }}
        className="hover:opacity-70 text-[#0EAD65] text-sm 2xl:text-base font-normal"
      >
        {label}
      </button>
    </div>
  );
};

const dummyProducts: Product[] = Array(8).fill({
  image: "/images/fanta.svg",
  name: "Fanta 50cl",
  description: "Description",
  price: "NGNC900",
});

const dummyOrders: Order[] = Array(3).fill({
  name: "Pack 1",
  description: "Chickwizz Meal",
  price: "NGN3,200.00",
});
