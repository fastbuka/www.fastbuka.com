import Authentication from "@/components/auth/Authentication";
import AuthenticatedModals from "@/components/AuthenticatedModals";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="w-max max-w-full mb-[139px] 2xl:mb-[169px] flex flex-col items-center">
      <Authentication />
      <AuthenticatedModals />
      <h2 className="text-(--primary-black) text-center mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
        Security
      </h2>
      <p className="text-center font-normal text-[#5D5D5D] text-sm 2xl:text-base 2xl:mb-[50px] mb-10">
        Keep your account safe with password updates, and emergency controls.
      </p>
      <ChangePasswordForm />
      <div className="w-[500px] max-w-full py-6 px-2.5 flex flex-col gap-7">
        <button className="flex hover:opacity-70 duration-300 items-center gap-2.5">
          {" "}
          <Image
            src="/images/primary-logout.svg"
            alt=""
            width={24}
            height={24}
            className="w-5 2xl:w-6"
          />
          <p className="text-(--primary-black) text-sm 2xl:text-base font-medium">
            Sign Out
          </p>
        </button>
        <button className="flex hover:opacity-70 duration-300 items-center gap-2.5">
          {" "}
          <Image
            src="/images/trash-can-red.svg"
            alt=""
            width={24}
            height={24}
            className="w-5 2xl:w-6"
          />
          <p className="text-[#FF0000] text-sm 2xl:text-base font-medium">
            Sign Out
          </p>
        </button>
      </div>
    </div>
  );
}
