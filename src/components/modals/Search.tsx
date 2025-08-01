"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import { Product, Vendor } from "@/schema";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useMemo, useState } from "react";

let debounceTimer: NodeJS.Timeout;
const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SearchVendor() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { location } = useUser();
  const { closeModal, openModal } = useModal();

  const isValid = useMemo(() => {
    if (!location) {
      return false;
    }
    return (
      search.length > 0 &&
      location.city.length > 0 &&
      location.country.length > 0
    );
  }, [search, location]);

  useEffect(() => {
    if (!isValid) {
      setResults([]);
      setProducts([]);
      return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchResults();
    }, 500);
  }, [search, isValid]);

  useEffect(() => {
    if (!location) {
      openModal(ModalTypeEnum.FindLocation);
    }
    return () => {
      clearTimeout(debounceTimer);
    };
  }, []);

  const fetchResults = async () => {
    if (!location) {
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch(
        `${endpoint}/api/search?q=${encodeURIComponent(
          search
        )}&city=${encodeURIComponent(
          location.city
        )}&country=${encodeURIComponent(location.country)}`
      );
      const data = await res.json();

      if (data?.success) {
        setProducts(data.data.products);
        setResults(data.data.vendors);
      }
    } catch (error) {
      console.log(error);
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchResults();
  };

  return (
    <div className="w-[500px] pb-5 h-[70vh] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium mb-8 2xl:mb-10 text-[17px] 2xl:text-xl text-[#111111] text-start w-full">
        Find Vendor Or Product
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
            placeholder="Search anything"
          />
          <button
            type="submit"
            className="w-max h-max hover:opacity-70 duration-200 bg-transparent border-none cursor-pointer"
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
        ) : results.length === 0 && products.length === 0 && isValid ? (
          <p className="text-sm text-center text-gray-400">No results found.</p>
        ) : (
          <>
            {products.map((product) => (
              <Link
                key={product.uuid}
                onClick={() => {
                  closeModal();
                }}
                href={`/browse-stores/${product.vendor_slug}?search=${product?.uuid}`}
                className="w-full px-2 hover:opacity-70 duration-200 flex justify-between items-center py-2.5 border-b border-[#E7E7E7]"
              >
                <p className="text-sm text-[#5D5D5D] font-normal">
                  {product.name}
                </p>
                <ArrowUpRight className="text-[#5D5D5D] 2xl:w-6 w-5" />
              </Link>
            ))}
            {results.map((vendor) => (
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
            ))}
          </>
        )}
      </div>
    </div>
  );
}
