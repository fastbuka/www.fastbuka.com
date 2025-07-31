"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { ShieldMinus } from "lucide-react";
import React from "react";

export default function DeactivateAccountButton() {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() => {
        openModal(ModalTypeEnum.DeactivateAccount);
      }}
      className="flex hover:opacity-70 duration-300 items-center gap-2.5"
    >
      <ShieldMinus className="w-5 2xl:w-6 text-[#FF0000]" />
      <p className="text-[#FF0000] text-sm 2xl:text-base font-medium">
        Deactivate Account
      </p>
    </button>
  );
}
