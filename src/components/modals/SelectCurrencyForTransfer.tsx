"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { MoveLeft } from "lucide-react";
import React, { FormEvent, useState } from "react";
import InputGroup from "../contact-us/InputGroup";
import { useManageUser } from "@/hooks/useManageUser";
import { toast } from "sonner";
import Spinner from "../auth/Spinner";
import { useWallet } from "@/contexts/WalletContext";

export default function SelectCurrencyForTransfer() {
  const { openModal } = useModal();
  const { ongoingTransfer } = useWallet();
  const [currency, setCurrency] = useState("NGN");
  const [amount, setAmount] = useState(ongoingTransfer?.transfer_amount || "");
  const { generateAccountForTransfer, loading } = useManageUser();

  const handleFormSubmition = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const amountValue = parseInt(amount);
      if (isNaN(amountValue)) {
        toast.error("Please enter a valid amount");
        return;
      }
      await generateAccountForTransfer(amountValue);
      openModal(ModalTypeEnum.ValidateTransfer);
    } catch (error) {
      console.log(error);
    }
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
          options={["NGN"]}
        />
        <InputGroup
          label="Amount"
          placeholder="Amount"
          type="number"
          required
          value={amount}
          setValue={setAmount}
        />
        <button
          type="submit"
          className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading ? <Spinner /> : "Continue"}
        </button>
      </form>
    </div>
  );
}
