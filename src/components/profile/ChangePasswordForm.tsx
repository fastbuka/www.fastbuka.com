"use client";
import React, { useState } from "react";
import InputGroup from "../contact-us/InputGroup";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <form className="w-[500px] max-w-full flex flex-col gap-7 2xl:gap-8">
      <h2 className="text-(--primary-black) font-medium text-base 2xl:text-xl">
        Change Password
      </h2>
      <InputGroup
        label="Current Password"
        value={currentPassword}
        setValue={setCurrentPassword}
        placeholder="******"
        type="password"
        required
      />
      <InputGroup
        label="New Password"
        value={newPassword}
        setValue={setNewPassword}
        placeholder="******"
        type="password"
        required
      />
      <InputGroup
        label="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        placeholder="******"
        type="password"
        required
      />

      <button className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]">
        Save
      </button>
      <div className="w-full h-px bg-[#E7E7E7]" />
    </form>
  );
}
