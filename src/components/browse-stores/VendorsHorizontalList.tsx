"use client";
import React, { useEffect, useState } from "react";
import VendorListItem from "./VendorListItem";
import { Pagination, VendorsResponse } from "@/schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  description?: string;
  data?: VendorsResponse;
  url: string;
  asList?: boolean;
}

const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function VendorsHorizontalList(props: Props) {
  const { title, description, data, url, asList } = props;
  const [list, setList] = useState(data?.vendors || []);
  const [pagination, setPagination] = useState<Pagination | null>(
    data?.pagination || null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setList(data.vendors);
      setPagination(data.pagination);
    }
  }, [data]);

  async function fetchMore() {
    try {
      setIsLoading(true);
      const request = await fetch(
        `${endpoint}${url}&page=${pagination?.nextPage}`
      );
      const response = await request.json();
      if (response?.success) {
        setPagination(response.data.pagination);
        setList((prev) => [...prev, ...response.data.vendors]);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "w-full flex flex-col @max-4xl:py-7 py-[30px] 2xl:py-[38px]",
        {
          "py-0": asList,
        }
      )}
    >
      {!asList && (
        <>
          {" "}
          <h2 className="text-(--primary-black) font-medium text-[28px] 2xl:text-[32px] mb-2.5 ">
            {title}
          </h2>
          <p className=" font-normal  text-[#5D5D5D] 2xl:mb-[62px] mb-[48px] text-sm 2xl:text-base">
            {description}
          </p>
        </>
      )}
      <div className="w-full flex overflow-y-auto scroll-hidden">
        {list.length > 0 ? (
          <div className="w-max flex gap-6">
            {list.map((vendor, index) => {
              return <VendorListItem item={vendor} key={index} />;
            })}
            {pagination?.nextPage && (
              <div className="w-20 h-full flex items-center justify-center">
                <button
                  onClick={fetchMore}
                  className={cn(
                    "w-20 h-20 duration-200 rounded-full bg-[#EFFEF7] cursor-pointer hover:scale-110 text-[#19CE7C] text-[13px] font-medium",
                    {
                      "animate-pulse": isLoading,
                    }
                  )}
                >
                  {isLoading ? (
                    <div className="lds-ring w-5 h-5">
                      <div className="w-5 h-5 border-4 border-[#19CE7C]" />
                      <div className="w-5 h-5 border-4 border-[#19CE7C]" />
                      <div className="w-5 h-5 border-4 border-[#19CE7C]" />
                      <div className="w-5 h-5 border-4 border-[#19CE7C]" />
                    </div>
                  ) : (
                    <span>
                      Fetch
                      <br />
                      More
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center py-12">
            <p className=" font-normal  text-[#5D5D5D] text-base 2xl:text-lg">
              No available item
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
