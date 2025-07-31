"use client";
import React, { FormEvent, useState } from "react";
import InputGroup from "../contact-us/InputGroup";
import Spinner from "../auth/Spinner";
import { useManageUser } from "@/hooks/useManageUser";

export default function DeactivateAccount() {
  const [password, setPassword] = useState("");
  const { loading, deactivateAccount } = useManageUser();

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await deactivateAccount({ password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="mt-4 mb-6 font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        Enter your password to Deactivate your account
      </h4>

      <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-6">
        <InputGroup
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="Password"
          type="password"
          required
        />

        <button
          type="submit"
          className="w-full  bg-[#FF0000] h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading ? <Spinner /> : "Deactivate"}
        </button>
      </form>
    </div>
  );
}
