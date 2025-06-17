import React from "react";
import VendorListItem from "./VendorListItem";

interface Props {
  item: {
    title: string;
    description: string;
    list: {
      image: string;
      name: string;
      heading: string;
      time: string;
    }[];
  };
}

export default function VendorsHorizontalList(props: Props) {
  const { description, list, title } = props.item;
  return (
    <div className="w-full flex flex-col py-[30px] 2xl:py-[38px]">
      <h2 className="text-[#111111] font-medium text-[28px] 2xl:text-[32px] mb-2.5 ">
        {title}
      </h2>
      <p className=" font-normal  text-[#5D5D5D] 2xl:mb-[62px] mb-[48px] text-sm 2xl:text-base">
        {description}
      </p>
      <div className="w-full flex overflow-y-auto scroll-hidden">
        <div className="w-max flex gap-6">
          {list.map((vendor, index) => {
            return <VendorListItem item={vendor} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
