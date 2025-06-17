import Image from "next/image";
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
  return (
    <div className="w-[340px] flex flex-col">
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
      <h3 className="font-semibold text-[#111111] text-base mb-2">{heading}</h3>
      <div className="flex items-center gap-2.5">
        <Image src="/images/clock.svg" alt="" width={16} height={16} />
        <p className="text-sm text-[#5D5D5D] font-normal">{time}</p>
      </div>
    </div>
  );
}
