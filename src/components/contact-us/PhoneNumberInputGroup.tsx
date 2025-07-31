"use client";

import React from "react";

type Country = {
  code: string;
  dial_code: string;
  name: string;
};

const countries: Country[] = [
  { code: "NG", dial_code: "+234", name: "Nigeria" },
  { code: "US", dial_code: "+1", name: "United States" },
  { code: "GB", dial_code: "+44", name: "United Kingdom" },
  { code: "IN", dial_code: "+91", name: "India" },
];

type Props = {
  value: {
    countryCode: string;
    number: string;
  };
  onChange: (value: { countryCode: string; number: string }) => void;
  label: string;
  placeholder: string;
};

export default function PhoneNumberInputGroup({
  value,
  onChange,
  label,
  placeholder,
}: Props) {
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, countryCode: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberOnly = e.target.value.replace(/\D/g, "");
    onChange({ ...value, number: numberOnly });
  };

  return (
    <div className="w-full flex flex-col items-start gap-3 2xl:gap-4">
      <p className="text-[#101010] font-medium text-sm 2xl:text-base">
        {label}
      </p>
      <div className="border flex border-[#E7E7E7] overflow-hidden w-full rounded-2xl">
        <select
          value={value.countryCode}
          onChange={handleCountryChange}
          className="w-[90px] border-r px-3 py-2.5 border-[#E7E7E7] outline-none bg-transparent text-sm 2xl:text-base font-normal text-[#101010]"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.dial_code}>
              {country.dial_code}
            </option>
          ))}
        </select>

        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value.number}
          onChange={handleNumberChange}
          placeholder={placeholder}
          required
          className="w-full pl-4 text-sm 2xl:text-base font-normal text-[#101010] outline-0 placeholder:text-[#B0B0B0]"
        />
      </div>
    </div>
  );
}
