"use client";
import { Team } from "@/schema";
import React, { useState } from "react";

export default function RenderTeam({ member }: { member: Team }) {
  const [imgSrc, setImgSrc] = useState(member.avatar);
  return (
    <div className="col-span-1 flex flex-col items-center">
      <img
        src={imgSrc}
        onError={() => {
          console.log("Error loading image");
          setImgSrc("/images/about/image-placeholder.svg");
        }}
        className="w-[280px] rounded-full object-cover mb-4 h-[280px]"
        alt=""
      />
      <h3 className="font-semibold text-(--primary-black) text-lg 2xl:text-xl text-center mb-2.5">
        {member.name}
      </h3>
      <p className="text-center font-normal text-[#5D5D5D] text-sm 2xl:text-base">
        {member.role}
      </p>
    </div>
  );
}
