import PhoneVerification from "@/components/auth/PhoneVerification";
import React from "react";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center py-11 2xl:py-12 @max-2xl:px-6 @max-2xl:py-6 px-16">
      <PhoneVerification asPage />
    </div>
  );
}
