"use client";
import React, { useState } from "react";
import Product from "./Product";
import Order from "./Order";
import Image from "next/image";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";

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
  const { openModal } = useModal();
  const [addDeliveryInstructions, setAddDeliveryInstructions] = useState(false);
  const [addVendorInstructions, setAddVendorInstructions] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1210px] @max-5xl:grid-cols-1 px-5 grid grid-cols-5">
        <div className="col-span-3 @max-5xl:col-span-1 @max-2xl:pr-0 2xl:pr-[43px] @max-5xl:border-r-0 border-r pt-5 2xl:pt-6 border-[#E7E7E7]">
          <div className="grid @max-2xl:grid-cols-1 grid-cols-2 gap-x-10 gap-y-8 2xl:gap-y-10 w-full p-2.5">
            {dummyProducts.map((product, index) => {
              return <Product key={index} data={product} />;
            })}
          </div>
        </div>
        <div className="col-span-2 @max-5xl:col-span-1 @max-2xl:px-2 p-6 flex flex-col">
          <div className="w-full @max-2xl:flex-col @max-2xl:gap-6 mb-7 2xl:mb-8 pb-4 border-b border-[#E7E7E7] flex justify-between items-start gap-8">
            <p className="text-sm w-full 2xl:text-base text-[#5D5D5D] font-normal">
              Chicken Republic - Asaba
            </p>
            <button className="min-w-max font-normal text-(--primary-green) text-sm 2xl:text-base bg-[#DAFEEC] py-2 px-4 rounded-[12px] hover:opacity-70 duration-300">
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
            <RenderActionMenu
              onClick={() => {
                openModal(ModalTypeEnum.PromoCode);
              }}
              value="Promo Code"
              label="Choose"
            />
            <RenderActionMenu
              onClick={() => {
                openModal(ModalTypeEnum.DeliveryAddress);
              }}
              value="Delivery Address"
              label="Choose"
            />
            <RenderActionMenu
              value="Delivery instructions"
              label="Add"
              onClick={() => {
                setAddDeliveryInstructions(true);
              }}
            />
            {addDeliveryInstructions && (
              <textarea
                placeholder="Add delivery instructions"
                className="w-full text-sm 2xl:text-base bg-white placeholder:text-[#D1D1D1] text-[#D1D1D1] border border-[#E7E7E7] outline-none rounded-[12px] px-5 py-2.5 h-[75px]"
              ></textarea>
            )}
            <RenderActionMenu
              onClick={() => {
                setAddVendorInstructions(true);
              }}
              value="Vendor instructions"
              label="Add"
            />
            {addVendorInstructions && (
              <textarea
                placeholder="Add vendor instructions"
                className="w-full text-sm 2xl:text-base bg-white placeholder:text-[#D1D1D1] text-[#D1D1D1] border border-[#E7E7E7] outline-none rounded-[12px] px-5 py-2.5 h-[75px]"
              ></textarea>
            )}
          </div>
          <div className="w-full mb-5 gap-2.5 bg-[#DAFEEC] rounded-[12px] px-6 py-3 flex items-center">
            <Image
              src="/images/info.svg"
              alt=""
              width={24}
              height={24}
              className="w-5 2xl:w-6"
            />
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm font-medium text-(--primary-black)">
                Delivery includes PIN confirmation
              </p>
              <p className="text-xs font-normal text-[#888888]">
                This helps ensure that your order is given to the right person
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col py-2 2xl:py-2.5 gap-2.5 2xl:mb-28 @max-2xl:mb-10 mb-20">
            <RenderOrderDetail
              label="Sub total (3 items)"
              value="NGN9,600.00"
            />
            <RenderOrderDetail label="Delivery fee" value="NGN0.00" />
            <RenderOrderDetail label="Service fee" value="NGN0.00" />
            <div className="w-full flex justify-between items-center">
              <p className="text-sm 2xl:text-base text-(--primary-black) font-medium">
                Total
              </p>
              <p className="text-sm 2xl:text-base text-(--primary-black) font-normal">
                NGN9,600.00
              </p>
            </div>
          </div>
          <div className="w-full mb-16 @max-2xl:mb-5 2xl:mb-20 flex flex-col items-center gap-3">
            <button className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]">
              Place Order
            </button>
            <button className="w-full bg-[#FFF0F0] h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-[#FF0000] font-normal 2xl:h-[50px]">
              Clear Orders
            </button>
            <button className="w-full bg-transparent h-11 text-sm flex items-center gap-2.5 justify-center 2xl:text-base hover:opacity-70 duration-200 rounded-[8px] text-(--primary-green) font-normal 2xl:h-[50px]">
              <Image
                src="/images/bookmark.svg"
                alt=""
                width={24}
                height={24}
                className="w-5 2xl:w-6"
              />{" "}
              Save for later
            </button>
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
        className="hover:opacity-70 text-(--primary-green) text-sm 2xl:text-base font-normal"
      >
        {label}
      </button>
    </div>
  );
};

const RenderOrderDetail = (menu: { label: string; value: string }) => {
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
