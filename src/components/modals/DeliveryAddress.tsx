"use client";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";

export default function DeliveryAddress() {
  const [value, setValue] = useState("");
  const { deliveryAddress, setDeliveryAddress } = useUser();
  const { closeModal } = useModal();

  useEffect(() => {
    setValue(deliveryAddress);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDeliveryAddress(value);
    closeModal();
  }

  return (
    <div className="w-[500px] pb-20 @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium mb-8 2xl:mb-10 text-[17px] 2xl:text-xl text-[#111111] text-start w-full">
        Delivery Address
      </h4>

      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <div className="w-full mb-5 h-11 2xl:h-[50px] border border-[#E7E7E7] rounded-[12px] px-6 flex items-center gap-2.5">
          <Image
            src="/images/location-pin-green.svg"
            alt=""
            width={24}
            height={24}
            className="w-5 2xl:w-6"
          />
          <input
            type="text"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-full border-none bg-transparent outline-none text-sm 2xl:text-base text-[#B0B0B0]"
            placeholder="Enter your address"
          />
        </div>
        <button
          type="submit"
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
