"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import ProfileDropdown from "./ProfileDropdown";
import { useManageUser } from "@/hooks/useManageUser";
import cookie from "js-cookie";
import { useWallet } from "@/contexts/WalletContext";

export default function NavBarTwo() {
  const router = useRouter();
  const { user } = useUser();
  const { fetchUser, fetchWallet } = useManageUser();
  const { wallet } = useWallet();
  const pathname = usePathname();

  useEffect(() => {
    const token = cookie.get("TOKEN");
    if (token && !user) {
      fetchUser(token);
    }
  }, []);

  useEffect(() => {
    if (user && !wallet) {
      fetchWallet(user.uuid);
    }
  }, [user, wallet, pathname]);

  return (
    <nav className="w-full max-w-[1250px] border-b border-[#DAFEEC] pb-6 2xl:pb-[30px] @max-4xl:border-b-0 @max-4xl:pb-0 px-5 h-max flex justify-between items-center">
      <Link href="/">
        <Image
          className="2xl:w-[115px] w-[95px] @max-4xl:w-16"
          src="/images/logo.svg"
          width={115}
          height={60}
          alt=""
        />
      </Link>

      <div className="w-max @max-4xl:hidden flex items-center gap-2.5">
        <div className="min-w-[184px]  @max-4xl:w-[184px] h-[50px]">
          <div className="w-full text-[#888888] flex justify-between items-center cursor-pointer text-sm 2xl:text-base font-normal px-6 h-[50px]">
            <Image
              src="/images/location-pin.svg"
              width={24}
              height={24}
              alt=""
              className="2xl:w-6 w-5"
            />{" "}
            Location
            <Image
              src="/images/chevron-down.svg"
              width={24}
              height={24}
              alt=""
              className="2xl:w-6 w-5"
            />
          </div>
        </div>
        <div className="w-[469px] @max-6xl:w-[350px] gap-2.5 flex h-[50px] border border-[#E7E7E7] rounded-[12px] items-center px-6">
          <Image
            src="/images/magnifying-glass.svg"
            alt=""
            width={24}
            height={24}
            className="2xl:w-6 w-5"
          />
          <input
            placeholder="Search for food, drinks, vendors e.t.c"
            className="w-full text-sm 2xl:text-base font-normal text-[#888888] placeholder:text-[#888888] h-full outline-none bg-transparent border-none"
          />
        </div>
      </div>
      {user ? (
        <ProfileDropdown />
      ) : (
        <div className="w-max flex items-center @max-3xl:gap-4 gap-5">
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="hover:text-(--primary-green) cursor-pointer duration-200 primary-link-hover font-normal text-[#3D3D3D] text-sm 2xl:text-xl"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push("/register");
            }}
            className="bg-(--primary-green) hover:opacity-80 duration-200 text-[#F6F6F6] text-sm 2xl:text-xl font-normal py-3 @max-xl:px-3 px-6 rounded-[12px]"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
