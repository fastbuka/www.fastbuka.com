"use client";
import React, { FormEvent } from "react";
import InputGroup from "./InputGroup";
import { useContact } from "@/hooks/useContact";
import Spinner from "../auth/Spinner";

export default function Form() {
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { contactUs, loading } = useContact();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await contactUs({
        email,
        message,
        subject,
      });
      setEmail("");
      setMessage("");
      setSubject("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-[561px] max-w-full flex flex-col gap-7 2xl:gap-8"
    >
      <InputGroup
        label="Email Address"
        value={email}
        setValue={setEmail}
        placeholder="Input your email"
        type="email"
        required
      />
      <InputGroup
        label="Subject"
        value={subject}
        setValue={setSubject}
        placeholder="Input your subject"
        required
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
        {loading ? <Spinner /> : "Send Message"}
      </button>
    </form>
  );
}
