"use client";
import { useModal } from "@/contexts/ModalContext";
import { modalRegistry } from "@/lib/register-modals";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function AuthenticatedModals() {
  const { isOpen, modalType, closeModal } = useModal();
  const ModalComponent = modalType ? modalRegistry[modalType] : null;
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef?.current) {
      disableBodyScroll(modalRef.current);
    } else {
      if (modalRef?.current) {
        enableBodyScroll(modalRef?.current);
      }
    }
    return () => {
      if (modalRef?.current) {
        enableBodyScroll(modalRef?.current);
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            height: "100dvh",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "none",
          }}
          className="fixed z-50 top-0 left-0 w-full bg-[#11111133] @max-2xl:items-end flex justify-center items-center"
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
            {ModalComponent && <ModalComponent />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
