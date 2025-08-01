"use client";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Verification from "./Verification";
import NewPassword from "./NewPassword";
import Status from "./Status";
import SignUp from "./SignUp";
import PhoneVerification from "./PhoneVerification";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";

export default function Authentication() {
  const { isOpen, modalType, closeModal } = useAuthModal();
  const [selectedLoginMethod, setSelectedLoginMethod] = useState<
    "email" | "phone"
  >("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState({
    countryCode: "NG",
    number: "",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
            className="z-50 w-max @max-2xl:w-full @max-2xl:rounded-[0px] @max-2xl:rounded-t-[32px] h-max max-h-[90%] scroll-hidden overflow-y-auto max-w-full py-10 @max-2xl:py-12 2xl:py-12 @max-2xl:px-6 px-16 rounded-[12px] bg-[#EFFEF7]"
            layout
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {modalType === AuthModalTypeEnum.LOGIN && (
              <Login
                email={email}
                phone={phone}
                setPhone={setPhone}
                setEmail={setEmail}
                selectedLoginMethod={selectedLoginMethod}
                setSelectedLoginMethod={setSelectedLoginMethod}
              />
            )}
            {modalType === AuthModalTypeEnum.SIGNUP && (
              <SignUp email={email} setEmail={setEmail} />
            )}
            {modalType === AuthModalTypeEnum.RESETPASSWORD && (
              <ForgotPassword setEmail={setEmail} email={email} />
            )}
            {modalType === AuthModalTypeEnum.VERIFICATION && (
              <Verification email={email} />
            )}
            {modalType === AuthModalTypeEnum.ACCOUNTACTIVATION && (
              <Verification email={email} />
            )}
            {modalType === AuthModalTypeEnum.PHONEVERIFICATION && (
              <PhoneVerification
                phone={
                  parsePhoneNumber(
                    phone.number,
                    phone.countryCode as CountryCode
                  )?.number
                }
              />
            )}
            {modalType === AuthModalTypeEnum.NEWPASSWORD && (
              <NewPassword email={email} />
            )}
            {(modalType === AuthModalTypeEnum.ERROR ||
              modalType === AuthModalTypeEnum.SUCCESS) && (
              <Status status={modalType} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
