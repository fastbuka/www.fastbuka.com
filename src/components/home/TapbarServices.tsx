import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export default function TapbarServices() {
  const RenderTabSection = () => {
    return (
      <div className="w-full flex justify-between gap-[88px] items-center">
        <Image
          className="w-6/12 min-w-[50%]"
          src="/images/phone-frame.svg"
          alt=""
          width={619}
          height={478}
        />
        <div className="w-full flex flex-col">
          <h2 className="text-[#111111] mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
            Order food seamlessly
          </h2>
          <p className=" font-normal mb-5 2xl:mb-6 max-w-[434px] text-[#5D5D5D] text-sm 2xl:text-base">
            Get your favorite African and continental dishes delivered fast -
            hot, fresh, and straight to your door!
          </p>
          <div className="w-full max-w-[444px] 2xl:max-w-[494px] grid grid-cols-2 gap-2.5">
            <Link href="#" className="col-span-1">
              <Image
                alt=""
                src="/images/appstore-button.svg"
                width={232}
                height={64}
                className="w-full"
              />
            </Link>
            <Link href="#" className="col-span-1">
              <Image
                alt=""
                src="/images/playstore-button.svg"
                width={232}
                height={64}
                className="w-full"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="w-[744px] bg-[#FFF2C5]">
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="vendor">Vendor</TabsTrigger>
          <TabsTrigger value="rider">Rider</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="customer">
          <RenderTabSection />
        </TabsContent>
        <TabsContent className="w-full" value="vendor">
          <RenderTabSection />
        </TabsContent>
        <TabsContent className="w-full" value="rider">
          <RenderTabSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
