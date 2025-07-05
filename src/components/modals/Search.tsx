"use client";
import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function SearchVendor() {
  const [search, setSearch] = useState("");
  const { closeModal } = useModal();
  const router = useRouter();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      closeModal();
      router.push(`/browse-stores?search=${search}`);
    }
  };

  return (
    <div className="w-[500px] pb-5 h-[70vh] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium mb-8 2xl:mb-10 text-[17px] 2xl:text-xl text-[#111111] text-start w-full">
        Find Vendor
      </h4>

      <form onSubmit={handleFormSubmit} className="w-full flex flex-col">
        <div className="w-full h-11 2xl:h-[50px] border border-[#E7E7E7] rounded-[12px] px-6 flex items-center gap-2.5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
            autoFocus={true}
            className="w-full h-full border-none bg-transparent outline-none text-sm 2xl:text-base text-[#B0B0B0]"
            placeholder="Search vendor name"
          />
          <button
            type="submit"
            className="w-max h-max bg-transparent border-none cursor-pointer"
          >
            <Image
              src="/images/magnifying-glass.svg"
              alt=""
              width={24}
              height={24}
              className="2xl:w-6 w-5"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
