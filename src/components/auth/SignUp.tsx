"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import InputGroup from "../contact-us/InputGroup";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";

export default function SignUp() {
  const { openModal } = useAuthModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    openModal(AuthModalTypeEnum.SUCCESS);
  }

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <Image src="/images/logo.svg" alt="" width={115} height={60} />
      <p className="mt-2 text-center font-normal text-sm 2xl:text-base text-[#5D5D5D] mb-[30px] 2xl:mb-[34px]">
        Fill in the form to sign up and start ordering!
      </p>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
        <InputGroup
          value={name}
          setValue={setName}
          label="Name"
          placeholder="Name"
          required
        />
        <InputGroup
          value={email}
          setValue={setEmail}
          label="Email"
          placeholder="Example@gmail.com"
          type="email"
          required
        />

        <InputGroup
          value={phone}
          setValue={setPhone}
          label="Phone Number"
          placeholder="Phone Number"
          required
        />
        <InputGroup
          value={referralCode}
          setValue={setReferralCode}
          label="Referral Code"
          placeholder="Code"
          required
        />
        <InputGroup
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="Password"
          type="password"
          required
        />

        <button
          type="submit"
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Sign Up
        </button>
        <p className="w-full text-center text-sm 2xl:text-base text-[#5D5D5D] font-normal">
          Have an account?{" "}
          <button
            type="button"
            onClick={() => {
              openModal(AuthModalTypeEnum.LOGIN);
            }}
            className="text-(--primary-green) hover:opacity-70 duration-300 cursor-pointer"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
