"use client";
import React, { useState } from "react";

export default function IncrementAndDecrementValue() {
  const [value, setValue] = useState(1);

  return (
    <div className="flex gap-2.5">
      <button
        disabled={value <= 1}
        onClick={() => {
          setValue((previous) => previous - 1);
        }}
        className="w-6 disabled:opacity-50 h-7 rounded bg-[#FF9702] hover:opacity-80 duration-300 text-base text-[#F6F6F6] font-normal"
      >
        -
      </button>
      <div className="w-max h-7 rounded bg-[#FFFBEA] px-[9px] flex items-center justify-center">
        <p className="text-base font-normal text-[#FF9702]">{value}</p>
      </div>
      <button
        disabled={value >= 10}
        onClick={() => {
          setValue((previous) => previous + 1);
        }}
        className="w-6 disabled:opacity-50 h-7 rounded bg-[#FF9702] hover:opacity-80 duration-300 text-base text-[#F6F6F6] font-normal"
      >
        +
      </button>
    </div>
  );
}
