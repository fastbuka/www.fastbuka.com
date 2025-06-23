"use client";
import { useModal, ModalTypeEnum } from "@/contexts/ModalContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ActivateWallet from "./modals/ActivateWallet";
import FundWallet from "./modals/FundWallet";
import FundingOptions from "./modals/FundingOptions";
import WalletFunding from "./modals/WalletFunding";
import SwapCurrency from "./modals/SwapCurrency";

export default function AuthenticatedModals() {
  const { isOpen, modalType, closeModal } = useModal();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 h-screen top-0 left-0 w-full bg-[#11111133] @max-2xl:items-end flex justify-center items-center"
        >
          <div
            onClick={() => {
              closeModal();
            }}
            className="w-full h-full absolute top-0 left-0 bg-transparent"
          ></div>
          <motion.div
            className="z-50 w-max @max-2xl:w-full @max-2xl:rounded-[0px] @max-2xl:rounded-t-[32px] h-max max-h-[90%] scroll-hidden overflow-y-auto max-w-full py-8 @max-2xl:py-10 2xl:py-12 @max-2xl:px-6 px-12 rounded-[12px] bg-[#EFFEF7]"
            layout
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {modalType === ModalTypeEnum.WalletActivation && <ActivateWallet />}
            {modalType === ModalTypeEnum.FundWallet && <FundWallet />}
            {modalType === ModalTypeEnum.FundingOptions && <FundingOptions />}
            {modalType === ModalTypeEnum.WalletFunding && <WalletFunding />}
            {modalType === ModalTypeEnum.SwapCurrency && <SwapCurrency />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
