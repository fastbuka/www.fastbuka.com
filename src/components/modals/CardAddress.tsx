"use client";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import React, { FormEvent, useEffect, useState } from "react";
import { CardDetails, useWallet } from "@/contexts/WalletContext";
import { useManageUser } from "@/hooks/useManageUser";
import Spinner from "../auth/Spinner";
import { CardTopupMode } from "@/schema";
import InputGroup from "../contact-us/InputGroup";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

export default function CardAddress() {
  const { openModal } = useModal();
  const { ongoingTopup } = useWallet();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const {
    cardTopup,
    loading,
    fetchWallet,
    loading: loadingBalance,
  } = useManageUser();
  const { user } = useUser();

  useEffect(() => {
    if (!ongoingTopup) {
      openModal(ModalTypeEnum.CardDetails);
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const zipCodeValue = parseInt(zipcode);
    if (isNaN(zipCodeValue)) {
      toast.error("Please enter a valid zip code");
      return;
    }
    if (!ongoingTopup) return;
    try {
      const body: CardDetails = {
        ...ongoingTopup,
        authorization: {
          ...ongoingTopup.authorization,
          mode: CardTopupMode.AvsNoAuth,
          city,
          country,
          address,
          state,
          zipcode: zipCodeValue,
        },
      };

      const res = await cardTopup(body);
      if (res.data?.meta?.authorization?.mode === CardTopupMode.Redirect) {
        window.location.href = res.data?.meta?.authorization?.redirect;
      }

      if (!res.data?.meta && res.data?.tx_ref) {
        await fetchWallet(user?.uuid || "");
        openModal(ModalTypeEnum.Success);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[472px] @max-2xl:w-full max-w-full flex flex-col items-center">
      <h4 className="font-medium text-[17px] 2xl:text-xl text-[#111111] text-center">
        Add your adress
      </h4>
      <p className="mt-2.5 mb-5 2xl:mb-6 text-center max-w-[345px] font-normal text-sm 2xl:text-base text-[#5D5D5D]">
        Please input your address
      </p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <InputGroup
          label="Address"
          placeholder="Enter address"
          value={address}
          setValue={setAddress}
          required
        />
        <InputGroup
          label="City"
          placeholder="Enter city"
          value={city}
          setValue={setCity}
          required
        />
        <InputGroup
          label="State"
          placeholder="Enter state"
          value={state}
          setValue={setState}
          required
        />
        <InputGroup
          label="Country"
          placeholder="Enter country"
          value={country}
          setValue={setCountry}
          required
        />
        <InputGroup
          label="ZipCode"
          placeholder="Enter zip code"
          value={zipcode}
          setValue={setZipCode}
          required
          type="number"
        />
        <button
          type="submit"
          disabled={loading || loadingBalance}
          className="w-full disabled:opacity-70 bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
        >
          {loading || loadingBalance ? <Spinner /> : "Continue"}
        </button>
      </form>
    </div>
  );
}
