import SignUp from "@/components/auth/SignUp";
import React from "react";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center py-11 2xl:py-12 px-6">
      <SignUp asPage />
    </div>
  );
}
