"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import InputGroup from "../contact-us/InputGroup";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
import Spinner from "./Spinner";
import PhoneNumberInputGroup from "../contact-us/PhoneNumberInputGroup";

interface Props {
  asPage?: boolean;
}

export default function SignUp(props: Props) {
  const { asPage } = props;
  const { openModal } = useAuthModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState({
    countryCode: "NG",
    number: "",
  });
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const router = useRouter();
  const { loading, register } = useAuth();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const contact =
      parsePhoneNumber(phone.number, phone.countryCode as CountryCode)
        ?.number || "";
    localStorage.setItem("ACCOUNT_REGISTRATION_NUMBER", contact);
    try {
      await register(
        {
          name,
          contact,
          email,
          password,
        },
        asPage
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <Link href="/" className="w-max h-max">
        <Image src="/images/logo.svg" alt="" width={115} height={60} />
      </Link>

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

        <PhoneNumberInputGroup
          label="Phone Number"
          placeholder="Enter number"
          value={phone}
          onChange={setPhone}
        />
        <InputGroup
          value={referralCode}
          setValue={setReferralCode}
          label="Referral Code"
          placeholder="Code"
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
          disabled={loading}
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading ? <Spinner /> : "Sign Up"}
        </button>
        <p className="w-full text-center text-sm 2xl:text-base text-[#5D5D5D] font-normal">
          Have an account?{" "}
          <button
            type="button"
            onClick={() => {
              if (asPage) {
                router.push("/login");
              } else {
                openModal(AuthModalTypeEnum.LOGIN);
              }
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
