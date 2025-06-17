import React from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: "email" | "textarea";
  required?: boolean;
  label: string;
}

export default function InputGroup(props: Props) {
  const { value, label, placeholder, setValue, required, type } = props;

  return (
    <div className="w-full flex flex-col items-start gap-3 2xl:gap-4">
      <p className="text-[#101010] font-medium text-sm 2xl:text-base">
        {label}
      </p>
      {type !== "textarea" ? (
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required={required}
          className="border border-[#E7E7E7] text-sm 2xl:text-base font-normal text-[#101010] w-full outline-0 rounded-2xl px-6 py-2.5 placeholder:text-[#B0B0B0]"
        />
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
