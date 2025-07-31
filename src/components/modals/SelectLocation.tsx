"use client";
import { useModal } from "@/contexts/ModalContext";
import { Location, useUser } from "@/contexts/UserContext";
import { reverseGeocodeWithGoogle } from "@/lib/shared-utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Spinner from "../auth/Spinner";
import cookie from "js-cookie";

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
    return () => {
      clearTimeout(debounceTimer);
    };
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported or disabled in browser settings.");
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
          const data = {
            ...locationData,
            lat: coords.latitude,
            lng: coords.longitude,
          };
          setLocation(data);
          cookie.set("LOCATION", JSON.stringify(data), {
            expires: 1,
          });
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

      const predictions = data.predictions;

      const detailedResults = await Promise.all(
        predictions.map(
          async (prediction: {
            place_id: string;
            description: string;
            structured_formatting: {
              main_text: string;
              secondary_text: string;
            };
          }) => {
            try {
              const detailsRes = await fetch(
                `/api/place-details?place_id=${prediction.place_id}`
              );
              const detailsData = await detailsRes.json();
              const result = detailsData.result;

              const cityComponent = result.address_components.find(
                (c: { types: string[] }) =>
                  c.types.includes("locality") ||
                  c.types.includes("administrative_area_level_2")
              );
              const countryComponent = result.address_components.find(
                (c: { types: string[] }) => c.types.includes("country")
              );

              return {
                city:
                  cityComponent?.long_name ||
                  prediction.structured_formatting?.main_text,
                country:
                  countryComponent?.long_name ||
                  prediction.structured_formatting?.secondary_text,
                address: result.formatted_address || prediction.description,
                lat: result.geometry?.location?.lat,
                lng: result.geometry?.location?.lng,
              };
            } catch (err) {
              console.warn("Place details error:", err);
              return {
                city:
                  prediction.structured_formatting?.main_text ||
                  prediction.description,
                country: prediction.structured_formatting?.secondary_text || "",
                address: prediction.description || "",
                lat: null,
                lng: null,
              };
            }
          }
        )
      );

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
      <form onSubmit={handleFormSubmit} className="w-full mb-3 flex flex-col">
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
      <button
        type="button"
        onClick={getUserLocation}
        className="w-full mb-6 bg-(--primary-green) h-11 min-h-11 text-sm 2xl:text-base hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
      >
        {gettingLocation ? <Spinner /> : "Use current location"}
      </button>

      <div className="w-full flex flex-col h-full overflow-y-auto scroll-hidden">
        {isLoading ? (
          <p className="text-sm text-center text-gray-400">Searching...</p>
        ) : results.length === 0 && isValid ? (
          <p className="text-sm text-center text-gray-400">No results found.</p>
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
                      cookie.set("LOCATION", JSON.stringify(item), {
                        expires: 1,
                      });
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
                        {item?.address || `${item.city}, ${item.country}`}
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
    </div>
  );
}
