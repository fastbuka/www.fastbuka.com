"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import React, { FormEvent, useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { CardDetails, useWallet } from "@/contexts/WalletContext";
import { useManageUser } from "@/hooks/useManageUser";
import Spinner from "../auth/Spinner";
import { CardTopupMode } from "@/schema";
import { useUser } from "@/contexts/UserContext";

export default function CardVerification() {
  const { openModal } = useModal();
  const { ongoingTopup, setOngoingTopup } = useWallet();
  const [pin, setPin] = useState("");
  const {
    cardTopup,
    loading,
    fetchWallet,
    loading: loadingBalance,
  } = useManageUser();
  const { user } = useUser();

  useEffect(() => {
    if (!ongoingTopup) {
      openModal(ModalTypeEnum.CardDetails);
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ongoingTopup) return;
    try {
      const body: CardDetails = {
        ...ongoingTopup,
        authorization: {
          ...ongoingTopup.authorization,
          mode: CardTopupMode.Pin,
          value: pin,
        },
      };

      const res = await cardTopup(body);
      if (res.data?.meta?.authorization?.mode === CardTopupMode.OTP) {
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
      } else if (!res.data?.meta && res.data?.tx_ref) {
        await fetchWallet(user?.uuid || "");
        openModal(ModalTypeEnum.Success);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        Card Verification
      </h4>
      <p className="mt-2.5 mb-5 2xl:mb-6 text-center max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Please input the card pin
      </p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <InputOTP value={pin} onChange={(v) => setPin(v)} maxLength={4}>
          <InputOTPGroup className="w-full grid @max-2xl:grid-cols-2 @max-2xl:max-w-[216px] @max-2xl:mx-auto grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((num) => (
              <InputOTPSlot
                key={num}
                className="col-span-1 text-sm 2xl:text-base text-(--primary-green) w-full rounded-[12px] border border-[#E7E7E7] shadow-none 2xl:h-[50px] h-[46px]"
                index={num}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <button
          type="submit"
          disabled={loading || loadingBalance}
          className="w-full disabled:opacity-70 bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading || loadingBalance ? <Spinner /> : "Verify"}
        </button>
      </form>
    </div>
  );
}
