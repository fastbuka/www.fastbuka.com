"use client";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";
import { useRouter } from "next/navigation";

type Props = {
  type: "email" | "phone";
  asPage?: boolean;
};

export default function Verification(props: Props) {
  const { type, asPage } = props;
  const { openModal } = useAuthModal();
  const router = useRouter();
  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        Verify {type === "email" ? "Email" : "Phone Number"}
      </h4>
      <p className="mt-2.5 mb-5 2xl:mb-6 text-center max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Please input code sent to your {type === "email" ? "email" : "number"}
      </p>
      <form className="w-full flex flex-col gap-6">
        <InputOTP maxLength={4}>
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
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Verify
        </button>
        <p className="w-full text-center text-xs 2xl:text-sm text-[#5D5D5D] font-normal">
          Didn&apos;t recieve the code?{" "}
          <button
            type="button"
            onClick={() => {}}
            className="text-(--primary-green) hover:opacity-70 duration-300 cursor-pointer"
          >
            Resend(60s)
          </button>
        </p>
        <p className="w-full text-center text-sm 2xl:text-base text-[#5D5D5D] font-normal">
          New to FastBuka?{" "}
          <button
            type="button"
            onClick={() => {
              if (!asPage) {
                openModal(AuthModalTypeEnum.SIGNUP);
              } else {
                router.push("/register");
              }
            }}
            className="text-(--primary-green) hover:opacity-70 duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
