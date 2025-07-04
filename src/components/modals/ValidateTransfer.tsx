"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import { useWallet } from "@/contexts/WalletContext";
import { useManageUser } from "@/hooks/useManageUser";
import { useSocket } from "@/hooks/useSocket";
import { formatNumber, getTimeLeft } from "@/lib/shared-utils";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export default function ValidateTransfer() {
  const { openModal, closeModal } = useModal();
  const { ongoingTransfer } = useWallet();
  const { fetchWallet } = useManageUser();
  const { user } = useUser();
  const socketRef = useSocket(endpoint);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!ongoingTransfer) {
      closeModal();
    }
  }, [ongoingTransfer]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.on(`user.deposit.${user?.uuid}`, async (data) => {
      await fetchWallet(user?.uuid || "");
      if (data?.success) {
        openModal(ModalTypeEnum.Success);
      } else {
        openModal(ModalTypeEnum.Error);
      }
    });

    return () => {
      socket.off(`user.deposit.${user?.uuid}`);
    };
  }, []);

  useEffect(() => {
    if (!ongoingTransfer?.account_expiration) return;

    const interval = setInterval(() => {
      const timeLeft = getTimeLeft(ongoingTransfer.account_expiration);
      setCountdown(timeLeft);

      if (timeLeft === "00:00") {
        clearInterval(interval);

        openModal(ModalTypeEnum.Error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ongoingTransfer?.account_expiration]);

  return (
    <div className="w-[500px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <div className="w-full mb-8 2xl:mb-10 flex items-center gap-10">
        <button
          type="button"
          onClick={() => {
            openModal(ModalTypeEnum.SelectCurrencyForTransfer);
          }}
          className="hover:opacity-70 min-w-max cursor-pointer duration-300"
        >
          <MoveLeft className="w-5 text-[#141B34]" />
        </button>
        <h3 className="font-medium text-(--primary-black) text-base 2xl:text-xl text-center">
          Transfer to
        </h3>
        <div />
      </div>
      <p className="text-black text-sm 2xl:text-base font-normal mb-1.5">
        Account Name: {ongoingTransfer?.transfer_account}{" "}
      </p>
      <p className="text-black text-sm 2xl:text-base font-normal mb-1.5">
        Account Number: {ongoingTransfer?.transfer_account}
      </p>
      <p className="text-black text-sm 2xl:text-base font-normal mb-1.5">
        Bank: {ongoingTransfer?.transfer_bank}
      </p>
      <p className="text-black text-sm 2xl:text-base font-normal mb-8 2xl:mb-10">
        Valid until: {countdown || "--:--"}
      </p>
      <h3 className="text-black font-semibold text-base 2xl:text-xl mb-8 2xl:mb-10">
        NGN{formatNumber(ongoingTransfer?.transfer_amount || "")}
      </h3>
      <Image
        src="/images/spinner-one.png"
        alt=""
        width={63}
        height={63}
        className="animate-spin mb-8 2xl:mb-10"
      />
      <p className="text-center font-normal text-[#888888] text-sm 2xl:text-base mb-8 2xl:mb-10">
        Please ensure you transfer the exact amount shown, nothing more or less,
        to avoid rejection by the system
      </p>
      {/* <button
        type="button"
        onClick={() => {
          openModal(ModalTypeEnum.Success);
        }}
        className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
      >
        Continue
      </button> */}
    </div>
  );
}
