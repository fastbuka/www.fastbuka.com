import Verification from "@/components/auth/Verification";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center py-11 2xl:py-12 px-6">
      <Image
        className="mb-14 2xl:mb-[72px]"
        src="/images/logo.svg"
        alt=""
        width={115}
        height={60}
      />
      <Verification type="phone" asPage />
    </div>
  );
}
