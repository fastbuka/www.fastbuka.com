"use client";
import React from "react";
import InputGroup from "./InputGroup";

export default function Form() {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [message, setMessage] = React.useState("");
  return (
    <form className="w-[561px] max-w-full flex flex-col gap-7 2xl:gap-8">
      <InputGroup
        label="Email Address"
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
      <InputGroup
        label="Country"
        value={country}
        setValue={setCountry}
        placeholder="Country"
      />
      <InputGroup
        label="Message"
        value={message}
        setValue={setMessage}
        placeholder="Type in your message"
        type="textarea"
      />
      <button
        type="submit"
        className="bg-(--primary-green) hover:opacity-80 duration-200 text-[#F6F6F6] text-sm 2xl:text-xl font-normal py-3 px-6 rounded-[12px]"
      >
        Send Message
      </button>
    </form>
  );
}
