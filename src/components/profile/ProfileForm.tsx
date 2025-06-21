"use client";
import React, { useState } from "react";
import InputGroup from "../contact-us/InputGroup";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <form className="w-[500px] max-w-full flex flex-col gap-7 2xl:gap-8">
      <InputGroup
        label="Account Name"
        value={name}
        setValue={setName}
        placeholder="Input your name"
        required
      />
      <InputGroup
        label="Email"
        value={email}
        setValue={setEmail}
        placeholder="Input your email"
        type="email"
        required
      />
      <InputGroup
        label="Phone Number"
        value={phone}
        setValue={setPhone}
        placeholder="Input your phone number"
        required
      />
      <button className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]">
        Save
      </button>
      <div className="w-full h-px bg-[#E7E7E7]" />
    </form>
  );
}
