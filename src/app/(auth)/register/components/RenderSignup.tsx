"use client";
import SignUp from "@/components/auth/SignUp";
import React, { useState } from "react";

export default function RenderSignup() {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full flex flex-col items-center py-11 2xl:py-12 px-6">
      <SignUp email={email} setEmail={setEmail} asPage />
    </div>
  );
}
