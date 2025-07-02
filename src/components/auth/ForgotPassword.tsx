"use client";
import Image from "next/image";
import React, { FormEvent } from "react";
import InputGroup from "../contact-us/InputGroup";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "./Spinner";

type Props = {
  email: string;
  asPage?: boolean;
  setEmail: (v: string) => void;
};

export default function ForgotPassword(props: Props) {
  const { email, asPage, setEmail } = props;
  const { loading, requestForgotPassword } = useAuth();

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await requestForgotPassword({ email }, asPage);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <Link href="/" className="w-max h-max">
        <Image src="/images/logo.svg" alt="" width={115} height={60} />
      </Link>
      <h4 className="mt-4 font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        Reset Your Password
      </h4>
      <p className="mt-2.5 mb-[30px] 2xl:mb-[34px] text-center max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Enter your email address below. We&apos;ll send you a link to reset your
        password.
      </p>
      <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-6">
        <InputGroup
          value={email}
          setValue={setEmail}
          label="Email"
          placeholder="Example@gmail.com"
          type="email"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading ? <Spinner /> : "Continue"}
        </button>
      </form>
    </div>
  );
}
