"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import InputGroup from "../contact-us/InputGroup";
import Link from "next/link";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Spinner from "./Spinner";

export default function NewPassword({
  asPage,
  email,
}: {
  asPage?: boolean;
  email?: string;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [code, setCode] = useState("");
  const { openModal } = useAuthModal();
  const [counter, setCounter] = useState(0);
  const router = useRouter();
  const { requestForgotPassword, loading, resetPassword } = useAuth();

  const handleBack = () => {
    if (asPage) {
      router.push("/login/forgot-password");
    } else {
      openModal(AuthModalTypeEnum.RESETPASSWORD);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("ACCOUNT_EMAIL");
    if (!savedEmail && !email) {
      handleBack();
    }
    const value = asPage ? savedEmail : email;
    setUserEmail(value || "");
  }, [email, asPage]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (counter > 0) {
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [counter]);

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password must match with confirm password");
      return;
    }
    try {
      await resetPassword(
        {
          email: userEmail,
          code,
          password: newPassword,
        },
        asPage
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleResendCode = async () => {
    try {
      await requestForgotPassword(
        {
          email: userEmail,
        },
        asPage,
        true
      );
      setCounter(60);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <Link href="/" className="w-max h-max">
        <Image src="/images/logo.svg" alt="" width={115} height={60} />
      </Link>
      <h4 className="mt-4 mb-6 font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        Enter OTP and Create a New Password
      </h4>

      <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-6">
        <InputOTP value={code} onChange={(v) => setCode(v)} maxLength={4}>
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
        <InputGroup
          value={newPassword}
          setValue={setNewPassword}
          label="New Password"
          placeholder="Password"
          type="password"
          required
        />
        <InputGroup
          value={confirmPassword}
          setValue={setConfirmPassword}
          label="Confirm Password"
          placeholder="Password"
          type="password"
          required
        />
        <button
          type="submit"
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading ? <Spinner /> : "Create"}
        </button>
        <p className="w-full text-center text-xs 2xl:text-sm text-[#5D5D5D] font-normal">
          Didn&apos;t recieve the code?{" "}
          <button
            type="button"
            onClick={() => {
              handleResendCode();
            }}
            disabled={counter > 0}
            className="text-(--primary-green) hover:opacity-70 duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {counter > 0 ? `Resend (${counter}s)` : "Resend"}
          </button>
        </p>
      </form>
    </div>
  );
}
