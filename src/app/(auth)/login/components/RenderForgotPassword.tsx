"use client";
import ForgotPassword from "@/components/auth/ForgotPassword";
import React, { useState } from "react";

export default function RenderForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <div className="w-full flex flex-col items-center py-11 2xl:py-12 @max-2xl:px-6 @max-2xl:py-6 px-16">
      <ForgotPassword email={email} setEmail={setEmail} asPage />
    </div>
  );
}
