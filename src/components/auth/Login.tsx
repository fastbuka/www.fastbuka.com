"use client";
import { cn } from "@/lib/utils";
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

type Props = {
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  selectedLoginMethod: "email" | "phone";
  setEmail: (value: string) => void;
  setPhone: (value: { countryCode: string; number: string }) => void;
  setSelectedLoginMethod: (value: "email" | "phone") => void;
  asPage?: boolean;
};

export default function Login(props: Props) {
  const {
    selectedLoginMethod,
    setSelectedLoginMethod,
    email,
    setEmail,
    phone,
    setPhone,
    asPage,
  } = props;
  const { openModal } = useAuthModal();
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { loading, login, phoneLogin } = useAuth();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      if (selectedLoginMethod === "email") {
        await login({ email, password }, asPage);
      } else {
        const contact =
          parsePhoneNumber(phone.number, phone.countryCode as CountryCode)
            ?.number || "";
        await phoneLogin({ phone: contact }, asPage, false, () => {
          setSelectedLoginMethod("email");
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <Link href="/" className="w-max h-max">
        <Image src="/images/logo.svg" alt="" width={115} height={60} />
      </Link>
      <p className="mt-2 text-center font-normal text-sm 2xl:text-base text-[#5D5D5D] mb-5 2xl:mb-6">
        Fill in the form to login and start ordering!
      </p>
      <div className="w-full mb-[30px] 2xl:mb-[34px] grid grid-cols-2 gap-4 h-10 2xl:h-11">
        <button
          onClick={() => {
            setSelectedLoginMethod("email");
          }}
          className={cn(
            "col-span-1 h-full hover:opacity-70 cursor-pointer duration-300 flex items-center justify-center border-b text-base 2xl:text-2xl text-[#5D5D5D] font-medium border-transparent",
            {
              "text-(--primary-green) border-(--primary-green)":
                selectedLoginMethod === "email",
            }
          )}
        >
          Email
        </button>
        <button
          onClick={() => {
            setSelectedLoginMethod("phone");
          }}
          className={cn(
            "col-span-1 h-full hover:opacity-70 cursor-pointer duration-300 flex items-center justify-center border-b text-base 2xl:text-2xl text-[#5D5D5D] font-medium border-transparent",
            {
              "text-(--primary-green) border-(--primary-green)":
                selectedLoginMethod === "phone",
            }
          )}
        >
          Phone
        </button>
      </div>
      {selectedLoginMethod === "email" ? (
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <InputGroup
            value={email}
            setValue={setEmail}
            label="Email"
            placeholder="Example@gmail.com"
            type="email"
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
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                if (!asPage) {
                  openModal(AuthModalTypeEnum.RESETPASSWORD);
                } else {
                  router.push("/login/forgot-password");
                }
              }}
              className="w-max cursor-pointer hover:opacity-70 duration-300 text-(--primary-green) font-medium text-sm 2xl:text-base"
              type="button"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
          >
            {loading ? <Spinner /> : "Login"}
          </button>
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
      ) : (
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <PhoneNumberInputGroup
            label="Phone Number"
            placeholder="Enter number"
            value={phone}
            onChange={setPhone}
          />
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                if (!asPage) {
                  openModal(AuthModalTypeEnum.RESETPASSWORD);
                } else {
                  router.push("/login/forgot-password");
                }
              }}
              className="w-max cursor-pointer hover:opacity-70 duration-300 text-(--primary-green) font-medium text-sm 2xl:text-base"
              type="button"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
          >
            {loading ? <Spinner /> : "Login"}
          </button>
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
      )}
    </div>
  );
}
