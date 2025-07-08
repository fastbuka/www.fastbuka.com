"use client";
import { useModal } from "@/contexts/ModalContext";
import { Location, useUser } from "@/contexts/UserContext";
import { reverseGeocodeWithGoogle } from "@/lib/shared-utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

let debounceTimer: NodeJS.Timeout;

export default function SelectLocation() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const { location, setLocation } = useUser();
  const [results, setResults] = useState<Location[]>([]);
  const { closeModal } = useModal();

  const isValid = useMemo(() => {
    return search.length > 0;
  }, [search]);

  useEffect(() => {
    if (!isValid) {
      setResults([]);
      return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchResults();
    }, 500);
  }, [search, isValid]);

  useEffect(() => {
    if (!location) {
      getUserLocation();
    }
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
          const locationData = await reverseGeocodeWithGoogle(
            coords.latitude,
            coords.longitude
          );
          setLocation(locationData);
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
    if (!search.trim()) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/location-autocomplete?input=${encodeURIComponent(search.trim())}`
      );
      const data = await res.json();

      if (data.status !== "OK") {
        toast.error("No results found or error from Google Places.");
        return;
      }
      console.log(data);

      const predictions = data.predictions;

      const detailedResults = predictions.map((prediction: any) => ({
        city:
          prediction.structured_formatting?.main_text || prediction.description,
        country: prediction.structured_formatting?.secondary_text || "",
      }));

      setResults(detailedResults);
    } catch (error) {
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
        Select your Location
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
            <div className="w-full h-11 2xl:h-[50px] border border-[#E7E7E7] rounded-[12px] px-6 flex items-center gap-2.5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
                autoFocus
                className="w-full h-full border-none bg-transparent outline-none text-sm 2xl:text-base text-[#B0B0B0]"
                placeholder="Find your city"
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
            ) : results.length === 0 && isValid ? (
              <p className="text-sm text-center text-gray-400">
                No results found.
              </p>
            ) : (
              <div className="w-full flex flex-col gap-3">
                {[...(location ? [location] : []), ...results].map(
                  (item, index) => {
                    const isSelected =
                      location?.city === item.city &&
                      item.country === location.country;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setLocation(item);
                          closeModal();
                        }}
                        className="w-full hover:opacity-70 duration-200 cursor-pointer py-2.5 px-1 flex items-center justify-between gap-4"
                      >
                        <div className="flex w-full max-w-[90%] items-center gap-4">
                          <Image
                            src="/images/location-pin.svg"
                            width={24}
                            height={24}
                            alt=""
                            className="2xl:w-6 w-5"
                          />
                          <p className="text-sm truncate text-[#5D5D5D] font-normal">
                            {item.city} {item.country}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="text-[#5D5D5D] 2xl:min-w-6 min-w-5" />
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
