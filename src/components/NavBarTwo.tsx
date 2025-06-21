"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NavBarTwo() {
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
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
        <div className="min-w-[184px] @max-4xl:w-[184px] h-[50px]">
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
        <div className="w-[469px] gap-2.5 flex h-[50px] border border-[#E7E7E7] rounded-[12px] items-center px-6">
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
      <div className="w-max @max-3xl:mr-5 flex items-center @max-3xl:gap-4 gap-2.5">
        <button
          className="w-10 @max-3xl:w-8 @max-3xl:h-8 h-10 2xl:w-11 2xl:h-11 rounded-[12px] bg-(--primary-green) flex justify-center items-center hover:opacity-80 duration-200"
          type="button"
        >
          <Image
            src="/images/shopping-cart.svg"
            alt=""
            width={24}
            height={24}
            className="w-5 2xl:w-6 @max-3xl:w-4"
          />
        </button>
        <div className="relative w-max h-max @max-3xl:w-4">
          <button
            onClick={() => {
              setShowProfileDropdown((prev) => !prev);
            }}
            className="w-10 h-10 @max-3xl:w-8 @max-3xl:h-8 2xl:w-11 2xl:h-11 rounded-[12px] bg-(--primary-green) flex justify-center items-center hover:opacity-80 duration-200"
            type="button"
          >
            <Image
              src="/images/user-white.svg"
              alt=""
              width={24}
              height={24}
              className="w-5 2xl:w-6 @max-3xl:w-4"
            />
          </button>
          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-[150px] top-[calc(100%+10px)] p-2.5 absolute right-0 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6]"
              >
                <div
                  onClick={() => {
                    setShowProfileDropdown((prev) => !prev);
                  }}
                  className="w-full cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5"
                >
                  <Image
                    src="/images/user.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="w-5 2xl:w-6"
                  />
                  <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
                    My Profile
                  </p>
                </div>
                <div
                  onClick={() => {
                    router.push("/profile");
                    setShowProfileDropdown((prev) => !prev);
                  }}
                  className="w-full cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5"
                >
                  <Image
                    src="/images/logout.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="w-5 2xl:w-6"
                  />
                  <p className="font-normal text-[#FF0000] text-sm 2xl:text-base">
                    Logout
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
