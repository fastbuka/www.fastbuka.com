"use client";
import { logout } from "@/lib/shared-utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfileDropdown() {
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  return (
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
              className="w-[150px] z-50 top-[calc(100%+10px)] p-2.5 absolute right-0 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6]"
            >
              <div
                onClick={() => {
                  router.push("/profile");
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
                  setShowProfileDropdown((prev) => !prev);
                  logout();
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
  );
}
