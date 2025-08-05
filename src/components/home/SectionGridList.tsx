import Image from "next/image";
import React from "react";

interface Props {
  data: {
    title: string;
    description: string;
    list: {
      tag?: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
}

export default function SectionGridList(props: Props) {
  const { description, list, title } = props.data;
  return (
    <div className="w-full flex flex-col items-center py-4 2xl:py-6">
      <h2 className="text-(--primary-black) text-center mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
        {title}
      </h2>
      <p className="text-center font-normal text-[#5D5D5D] text-sm 2xl:text-base mb-[30px] 2xl:mb-[34px]">
        {description}
      </p>
      <div className="w-full grid grid-cols-3 @max-2xl:grid-cols-1 @max-5xl:grid-cols-2 gap-6">
        {list.map((service, index) => (
          <div
            key={index}
            className="col-span-1 flex flex-col gap-3 2xl:gap-4 bg-[#B8FADB] rounded-[12px] px-4 2xl:px-6 py-6 2xl:py-8"
          >
            <div className="rounded-[8px] w-full h-[220px] 2xl:h-[240px] overflow-hidden border-[4px] border-[#DAFEEC]">
              <Image
                src={service.image}
                alt=""
                width={331}
                height={240}
                className="h-full w-full object-cover rounded-[9px]"
              />
            </div>
            <div className="w-full px-3 2xl:px-4 flex flex-col gap-2 2xl:gap-2.5">
              {service?.tag && (
                <p className="font-normal text-[#19CE7C] text-sm 2xl:text-base">
                  {service.tag}
                </p>
              )}
              <p className="text-(--primary-black) font-semibold text-lg 2xl:text-xl">
                {service.title}
              </p>
              <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
