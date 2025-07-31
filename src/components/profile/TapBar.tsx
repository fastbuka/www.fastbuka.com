"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TapBar() {
  const pathname = usePathname();
  return (
    <div className="w-[744px] max-w-full grid grid-cols-3 bg-[#F2F2F1] @max-2xl:p-1.5 mx-auto rounded-[12px] p-2 2xl:p-2.5">
      {links.map((link, index) => {
        const isActive = pathname === link.path;
        return (
          <Link
            href={link.path}
            key={index}
            className={cn(
              "col-span-1 py-2 2xl:py-2.5 font-semibold @max-2xl:text-xs @max-2xl:py-1.5 text-base flex justify-center items-center @max-2xl:rounded-[8px] rounded-[12px] bg-transparent text-[#5D5D5D] duration-300 hover:opacity-70 2xl:text-xl",
              {
                "bg-(--primary-green) text-[#FFFBEA]": isActive,
              }
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}

const links = [
  {
    name: "Account",
    path: "/account",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Security",
    path: "/security",
  },
];
