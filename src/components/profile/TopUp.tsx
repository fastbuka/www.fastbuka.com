import { PlusCircle } from "lucide-react";
import React from "react";

export default function TopUp() {
  return (
    <button className="w-max cursor-pointer hover:opacity-70 duration-300 flex items-center gap-2.5 p-2 2xl:p-2.5">
      <PlusCircle className="w-5 2xl:w-6 text-(--primary-black)" />
      <p className="text-(--primary-black) font-normal text-sm 2xl:text-base">
        Top Up
      </p>
    </button>
  );
}
