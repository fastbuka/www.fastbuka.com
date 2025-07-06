"use client";
import React, { FormEvent, useEffect, useState } from "react";
import InputGroup from "../contact-us/InputGroup";
import { useUser } from "@/contexts/UserContext";
import { useManageUser } from "@/hooks/useManageUser";
import Spinner from "../auth/Spinner";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useUser();
  const { updateUser, loading } = useManageUser();

  useEffect(() => {
    if (user) {
      setName(`${user.first_name} ${user.other_names}`);
      setEmail(user.email);
      setPhone(user.contact);
    }
  }, [user]);

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await updateUser({
        name,
        email,
        contact: phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="w-[500px] max-w-full flex flex-col gap-7 2xl:gap-8"
    >
      <InputGroup
        label="Account Name"
        value={name}
        setValue={setName}
        placeholder="Input your name"
        required
      />
      <InputGroup
        disabled
        label="Email"
        value={email}
        setValue={setEmail}
        placeholder="Input your email"
        type="email"
        required
      />
      <InputGroup
        disabled
        label="Phone Number"
        value={phone}
        setValue={setPhone}
        placeholder="Input your phone number"
        required
      />
      <button
        disabled={loading}
        className="w-full bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
      >
        {loading ? <Spinner /> : "Save"}
      </button>
      <div className="w-full h-px bg-[#E7E7E7]" />
    </form>
  );
}
