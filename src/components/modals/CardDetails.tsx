"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { MoveLeft } from "lucide-react";
import React, { FormEvent, useMemo, useState } from "react";
import InputGroup from "../contact-us/InputGroup";
import { useManageUser } from "@/hooks/useManageUser";
import Spinner from "../auth/Spinner";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { CardTopupMode } from "@/schema";
import { CardDetails, useWallet } from "@/contexts/WalletContext";
import { useUser } from "@/contexts/UserContext";

export default function CardDetailsModal() {
  const { openModal } = useModal();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { cardTopup, loading } = useManageUser();
  const [currency, setCurrency] = useState("NGN");
  const [amount, setAmount] = useState("");
  const pathname = usePathname();
  const { setOngoingTopup } = useWallet();
  const { fetchWallet, loading: loadingBalance } = useManageUser();
  const { user } = useUser();

  const isFormValid = useMemo(() => {
    return (
      cardNumber.trim().length > 5 &&
      expiryDate.length > 0 &&
      cvv.trim().length === 3 &&
      amount.trim().length > 0
    );
  }, [cardNumber, expiryDate, cvv, amount]);

  const handleFormSubmition = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const amountValue = parseInt(amount);
      if (isNaN(amountValue)) {
        toast.error("Please enter a valid amount");
        return;
      }
      const [year, month] = expiryDate.split("-");

      const twoDigitYear = year.slice(-2);
      const twoDigitMonth = month;

      const body: CardDetails = {
        amount: amountValue,
        currency,
        card_number: cardNumber,
        cvv,
        redirect_url: `${window.location.origin}${pathname}`,
        expiry_month: twoDigitMonth,
        expiry_year: twoDigitYear,
        authorization: {
          mode: CardTopupMode.Init,
        },
      };

      const res = await cardTopup(body);
      if (res.success) {
        if (res.data?.meta?.authorization?.mode === CardTopupMode.Pin) {
          setOngoingTopup(body);
          openModal(ModalTypeEnum.CardVerification);
        } else if (res.data?.meta?.authorization?.mode === CardTopupMode.OTP) {
          setOngoingTopup({
            ...body,
            authorization: {
              ...body.authorization,
              flw_ref: res?.data?.flw_ref,
              mode: CardTopupMode.OTP,
              endpoint: res?.data?.endpoint,
            },
          });
          openModal(ModalTypeEnum.CardOTP);
        } else if (
          res.data?.meta?.authorization?.mode === CardTopupMode.Redirect
        ) {
          window.location.href = res.data?.meta?.authorization?.redirect;
        } else if (
          res.data?.meta?.authorization?.mode === CardTopupMode.AvsNoAuth
        ) {
          setOngoingTopup({
            ...body,
            authorization: {
              ...body.authorization,
              mode: CardTopupMode.AvsNoAuth,
            },
          });
          openModal(ModalTypeEnum.CardAddress);
        } else if (!res.data?.meta && res.data?.tx_ref) {
          setOngoingTopup(body);
          await fetchWallet(user?.uuid || "");
          openModal(ModalTypeEnum.Success);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
          label="Select Currency"
          placeholder="Select Currency"
          value={currency}
          setValue={setCurrency}
          type="select"
          options={["NGN", "USDC"]}
        />
        <InputGroup
          label="Amount"
          placeholder="Amount"
          type="number"
          required
          value={amount}
          setValue={setAmount}
        />
        <InputGroup
          label="Card Number"
          type="number"
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
          type="month"
          required
        />

        <InputGroup
          label="CVV"
          maxLength={3}
          placeholder="3-digit code on the back of your card"
          value={cvv}
          setValue={setCvv}
          type="password"
          required
        />

        <button
          type="submit"
          disabled={loading || !isFormValid || loadingBalance}
          className="w-full disabled:opacity-70 bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading || loadingBalance ? <Spinner /> : "Continue"}
        </button>
      </form>
    </div>
  );
}
