"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { MoveLeft } from "lucide-react";
import React, { FormEvent, useState } from "react";
import InputGroup from "../contact-us/InputGroup";

export default function SelectCurrencyForTransfer() {
  const { openModal } = useModal();
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const handleFormSubmition = (event: FormEvent) => {
    event.preventDefault();
    openModal(ModalTypeEnum.ValidateTransfer);
  };

  return (
    <div className="w-[500px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <div className="w-full mb-8 2xl:mb-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            openModal(ModalTypeEnum.FundingOptions);
          }}
          className="hover:opacity-70 min-w-max cursor-pointer duration-300"
        >
          <MoveLeft className="w-5 text-[#141B34]" />
        </button>
        <h3 className="font-medium text-(--primary-black) text-base 2xl:text-xl text-center">
          Select Your Currency for Transfer
        </h3>
        <div />
      </div>
      <form
        onSubmit={handleFormSubmition}
        className="w-full flex flex-col gap-8 2xl:gap-10"
      >
        <InputGroup
          label="Select Currency"
          placeholder="Select Currency"
          value={currency}
          setValue={setCurrency}
          type="select"
          options={["USD", "NGN"]}
        />
        <InputGroup
          label="Amount"
          placeholder="Amount"
          value={amount}
          setValue={setAmount}
        />
        <button
          type="submit"
          className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
