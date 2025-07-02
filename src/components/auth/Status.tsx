"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  status: AuthModalTypeEnum.SUCCESS | AuthModalTypeEnum.ERROR;
};

export default function Status(props: Props) {
  const { status } = props;
  const { closeModal } = useAuthModal();

  const isSuccess = useMemo(() => {
    return !!(status === AuthModalTypeEnum.SUCCESS);
  }, [status]);

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <Link href="/" className="w-max h-max">
        <Image
          src="/images/logo.svg"
          alt=""
          width={115}
          height={60}
          className="mb-4 2xl:mb-6"
        />
      </Link>

      {isSuccess ? (
        <Image src="/images/success.svg" alt="" width={140} height={140} />
      ) : (
        <Image src="/images/error.svg" alt="" width={120} height={120} />
      )}
      <h4 className="mt-4 2xl:mt-6 font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        {isSuccess ? "You’re All Set!" : "Oops! Something Went Wrong"}
      </h4>
      <p className="mt-2.5 mb-6 text-center max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        {isSuccess
          ? "Your password was changed successfully. You can now login with your new password"
          : "Couldn’t verify your account, pleas try again?"}
      </p>
      <button
        type="button"
        onClick={() => {
          closeModal();
        }}
        className={cn(
          "w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]",
          {
            "bg-[#FF0000]": !isSuccess,
          }
        )}
      >
        {isSuccess ? "Done" : "Close"}
      </button>
    </div>
  );
}
