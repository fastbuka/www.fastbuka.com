"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  item: {
    image: string;
    name: string;
    heading: string;
    time: string;
  };
}

export default function VendorListItem(props: Props) {
  const { image, name, heading, time } = props.item;
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/browse-stores/dummy");
      }}
      className="w-[340px]  hover:opacity-85 duration-200 cursor-pointer flex flex-col"
    >
      <div className="w-full h-[215px] overflow-hidden rounded-[7px] mb-3.5">
        <Image
          src={image}
          alt=""
          width={340}
          height={215}
          className="object-cover"
        />
      </div>
      <p className="text-[#19CE7C] font-normal text-sm mb-2">{name}</p>
      <h3 className="font-semibold text-(--primary-black) text-base mb-2">
        {heading}
      </h3>
      <div className="flex items-center gap-2.5">
        <Image src="/images/clock.svg" alt="" width={16} height={16} />
        <p className="text-sm text-[#5D5D5D] font-normal">{time}</p>
      </div>
    </div>
  );
}
