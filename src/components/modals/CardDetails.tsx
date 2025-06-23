"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { MoveLeft } from "lucide-react";
import React, { FormEvent, useState } from "react";
import InputGroup from "../contact-us/InputGroup";

export default function CardDetails() {
  const { openModal } = useModal();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardPin, setCardPin] = useState("");

  const handleFormSubmition = (event: FormEvent) => {
    event.preventDefault();
    openModal(ModalTypeEnum.CardVerification);
  };

  return (
    <div className="w-[500px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <div className="w-full mb-8 2xl:mb-10 flex items-center gap-10">
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
          Your Card Details
        </h3>
        <div />
      </div>
      <form
        onSubmit={handleFormSubmition}
        className="w-full flex flex-col gap-8 2xl:gap-10"
      >
        <InputGroup
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          setValue={setCardNumber}
          required
        />

        <InputGroup
          label="Expiry Date"
          placeholder="E.g 08/26"
          value={expiryDate}
          setValue={setExpiryDate}
          type="date"
          required
        />

        <InputGroup
          label="CVV"
          placeholder="3-digit code on the back of your card"
          value={cvv}
          setValue={setCvv}
          required
        />

        <InputGroup
          label="Your Card Pin"
          placeholder="4-digit card pin"
          value={cardPin}
          setValue={setCardPin}
          required
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
