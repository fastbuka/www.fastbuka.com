"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: "email" | "textarea" | "password";
  required?: boolean;
  label: string;
}

export default function InputGroup(props: Props) {
  const { value, label, placeholder, setValue, required, type } = props;
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="w-full flex flex-col items-start gap-3 2xl:gap-4">
      <p className="text-[#101010] font-medium text-sm 2xl:text-base">
        {label}
      </p>
      {type !== "textarea" ? (
        type === "password" ? (
          <div className="border border-[#E7E7E7] w-full h-max flex items-center px-6 rounded-2xl">
            <input
              type={passwordType}
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              required={required}
              className="text-sm 2xl:text-base password-input font-normal text-[#101010] w-full outline-0 border-0 py-2.5 placeholder:text-[#B0B0B0]"
            />
            <button
              type="button"
              onClick={togglePasswordType}
              className="h-max text-[#5D5D5D] w-9 flex justify-center items-center min-w-9 cursor-pointer"
            >
              {passwordType !== "text" ? (
                <EyeOff className="text-inherit w-5 2xl:w-6" />
              ) : (
                <Eye className="text-inherit w-5 2xl:w-6" />
              )}
            </button>
          </div>
        ) : (
          <input
            type={type || "text"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            required={required}
            className="border border-[#E7E7E7] text-sm 2xl:text-base font-normal text-[#101010] w-full outline-0 rounded-2xl px-6 py-2.5 placeholder:text-[#B0B0B0]"
          />
        )
      ) : (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required={required}
          className="border border-[#E7E7E7] h-[132px] text-sm 2xl:text-base font-normal text-[#101010] w-full outline-0 rounded-2xl px-6 py-2.5 placeholder:text-[#B0B0B0]"
        />
      )}
    </div>
  );
}
