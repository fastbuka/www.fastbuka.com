"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import InputGroup from "../contact-us/InputGroup";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
  }
  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <Image src="/images/logo.svg" alt="" width={115} height={60} />
      <h4 className="mt-4 mb-6 font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        Create New Password
      </h4>

      <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-6">
        <InputGroup
          value={newPassword}
          setValue={setNewPassword}
          label="New Password"
          placeholder="Password"
          type="password"
          required
        />
        <InputGroup
          value={confirmPassword}
          setValue={setConfirmPassword}
          label="Confirm Password"
          placeholder="Password"
          type="password"
          required
        />
        <button
          type="submit"
          className="w-full  bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          Create
        </button>
      </form>
    </div>
  );
}
