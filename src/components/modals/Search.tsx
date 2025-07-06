"use client";
import { useModal } from "@/contexts/ModalContext";
import { Vendor } from "@/schema";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";

let debounceTimer: NodeJS.Timeout;
const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SearchVendor() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const fetchVendors = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(
            `${endpoint}/api/v1/vendor/public/approved?q=${encodeURIComponent(
              search
            )}`
          );
          const data = await res.json();
          if (data?.success) {
            setResults(data.data.vendors);
          }
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchVendors();
    }, 300);
  }, [search]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-[500px] pb-5 h-[70vh] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium mb-8 2xl:mb-10 text-[17px] 2xl:text-xl text-[#111111] text-start w-full">
        Find Vendor
      </h4>

      <form onSubmit={handleFormSubmit} className="w-full mb-6 flex flex-col">
        <div className="w-full h-11 2xl:h-[50px] border border-[#E7E7E7] rounded-[12px] px-6 flex items-center gap-2.5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
            autoFocus
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

      <div className="w-full flex flex-col h-full overflow-y-auto scroll-hidden">
        {isLoading ? (
          <p className="text-sm text-center text-gray-400">Searching...</p>
        ) : results.length === 0 && search ? (
          <p className="text-sm text-center text-gray-400">No vendors found.</p>
        ) : (
          results.map((vendor) => (
            <Link
              key={vendor.id}
              onClick={() => {
                closeModal();
              }}
              href={`/browse-stores/${vendor.slug}`}
              className="w-full px-2 hover:opacity-70 duration-200 flex justify-between items-center py-2.5 border-b border-[#E7E7E7]"
            >
              <p className="text-sm text-[#5D5D5D] font-normal">
                {vendor.name}
              </p>
              <ArrowUpRight className="text-[#5D5D5D] 2xl:w-6 w-5" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
