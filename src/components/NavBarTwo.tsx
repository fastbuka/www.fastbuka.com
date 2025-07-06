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
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";

export default function NavBarTwo() {
  const router = useRouter();
  const { user } = useUser();
  const { fetchUser, fetchWallet } = useManageUser();
  const { wallet } = useWallet();
  const pathname = usePathname();
  const { openModal } = useModal();

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
    <nav className="w-full max-w-[1250px] border-b border-[#DAFEEC] pb-6 2xl:pb-[30px] @max-4xl:border-b-0 @max-4xl:pb-0 px-5 h-max flex justify-between items-center @max-4xl:gap-5">
      <Link href="/" className="min-w-max w-max">
        <Image
          className="2xl:w-[115px] w-[95px] @max-4xl:w-16"
          src="/images/logo.svg"
          width={115}
          height={60}
          alt=""
        />
      </Link>

      <div className="w-max @max-4xl:hidden flex items-center gap-2.5">
        {/* <div className="min-w-[184px]  @max-4xl:w-[184px] h-[50px]">
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
        </div> */}
        <div
          onClick={() => {
            openModal(ModalTypeEnum.Search);
          }}
          className="w-[520px] @max-6xl:w-[450px] gap-2.5 flex h-[50px] border border-[#E7E7E7] rounded-[12px] items-center px-6"
        >
          <Image
            src="/images/magnifying-glass.svg"
            alt=""
            width={24}
            height={24}
            className="2xl:w-6 w-5"
          />
          <div className="w-full truncate text-sm 2xl:text-base font-normal text-[#888888] flex items-center h-full outline-none bg-transparent border-none">
            Search for food, drinks, vendors e.t.c
          </div>
        </div>
      </div>
      {user ? (
        <ProfileDropdown />
      ) : (
        <div className="w-max flex items-center  gap-5">
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
