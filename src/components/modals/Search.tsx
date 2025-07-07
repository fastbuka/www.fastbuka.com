"use client";
import { useModal } from "@/contexts/ModalContext";
import { reverseGeocodeWithGoogle } from "@/lib/shared-utils";
import { Product, Vendor } from "@/schema";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

let debounceTimer: NodeJS.Timeout;
const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SearchVendor() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const { closeModal } = useModal();
  const [gettingLocation, setGettingLocation] = useState(false);

  const isValid = useMemo(() => {
    return search.length > 0 && city.length > 0 && country.length > 0;
  }, [search, city, country]);

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
  }, [search, city, country, isValid]);

  useEffect(() => {
    getUserLocation();
    return () => {
      clearTimeout(debounceTimer);
    };
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          setGettingLocation(true);
          const location = await reverseGeocodeWithGoogle(
            coords.latitude,
            coords.longitude
          );
          setCity(location.city);
          setCountry(location.country);
        } catch {
          toast.error("Failed to detect location. Please enter manually.");
        } finally {
          setGettingLocation(false);
        }
      },
      () => {
        toast.info("Allow location access for better experience");
      }
    );
  };

  const fetchResults = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `${endpoint}/api/search?q=${encodeURIComponent(
          search
        )}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(
          country
        )}`
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

      {gettingLocation ? (
        <div className="w-full h-[90%] flex text-[#0ead65] justify-center items-center">
          <div className="lds-ring w-5 h-5">
            <div className="w-5 h-5 border-4" />
            <div className="w-5 h-5 border-4" />
            <div className="w-5 h-5 border-4" />
            <div className="w-5 h-5 border-4" />
          </div>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleFormSubmit}
            className="w-full mb-6 flex flex-col"
          >
            <div className="w-full grid grid-cols-2 @max-3xl:grid-cols-1 @max-3xl:gap-3 gap-5 mb-3">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
                className="col-span-1 bg-transparent outline-none text-sm 2xl:text-base text-[#B0B0B0] h-11 2xl:h-[50px] border border-[#E7E7E7] rounded-[12px] px-6"
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
                className="col-span-1 bg-transparent outline-none text-sm 2xl:text-base text-[#B0B0B0] h-11 2xl:h-[50px] border border-[#E7E7E7] rounded-[12px] px-6"
              />
            </div>
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
            ) : (results.length === 0 || products.length) === 0 && isValid ? (
              <p className="text-sm text-center text-gray-400">
                No results found.
              </p>
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
        </>
      )}
    </div>
  );
}
