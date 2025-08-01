"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import RichTextEditor from "../ui/RichTextEditor";

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: "email" | "textarea" | "password" | "select" | "number" | "month";
  options?: string[];
  required?: boolean;
  label: string;
  maxLength?: number;
  disabled?: boolean;
}

export default function InputGroup(props: Props) {
  const {
    value,
    label,
    placeholder,
    setValue,
    required,
    type,
    options,
    maxLength,
    disabled,
  } = props;
  const [passwordType, setPasswordType] = useState("password");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const togglePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const className =
    "border border-[#E7E7E7] disabled:bg-gray-100 text-sm 2xl:text-base font-normal text-[#101010] w-full outline-0 rounded-2xl px-6 py-2.5 placeholder:text-[#B0B0B0]";

  return (
    <div className="w-full flex flex-col items-start gap-3 2xl:gap-4">
      <p className="text-[#101010] font-medium text-sm 2xl:text-base">
        {label}
      </p>

      {type === "textarea" ? (
        <RichTextEditor value={value} setValue={setValue} />
      ) : type === "select" ? (
        <Select onValueChange={setValue} value={value}>
          <SelectTrigger className="w-full border-[#E7E7E7] text-sm 2xl:text-base h-max shadow-none py-2.5 px-6 rounded-2xl">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="shadow-none w-full bg-[#F6F6F6] border border-[--primary-green] rounded-[12px]">
            <div className="w-full p-2.5 flex flex-col gap-2.5">
              {options?.map((item, index) => (
                <SelectItem
                  className={cn(
                    "p-2.5 border-b border-[#E7E7E7] rounded-none",
                    {
                      "border-b-0": index === options.length - 1,
                    }
                  )}
                  key={index}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      ) : type === "password" ? (
        <div className="border border-[#E7E7E7] w-full h-max flex items-center px-6 rounded-2xl">
          <input
            type={passwordType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={required}
            maxLength={maxLength || undefined}
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
      ) : type === "month" ? (
        <div
          onClick={() =>
            dateInputRef.current?.showPicker?.() ||
            dateInputRef.current?.focus()
          }
          className="relative w-full"
        >
          <input
            type="month"
            ref={dateInputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(className, "pr-12", {
              "text-[#B0B0B0]": !value.length,
            })}
            required={required}
          />
          <img
            src="/images/calendar.svg"
            alt="calendar"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          />
        </div>
      ) : (
        <input
          disabled={disabled}
          type={type || "text"}
          placeholder={placeholder}
          maxLength={maxLength || undefined}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(className)}
        />
      )}
    </div>
  );
}
