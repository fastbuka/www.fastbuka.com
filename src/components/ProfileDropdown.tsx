"use client";
import {
  countVendorsWithProducts,
  getFirstVendorWithProducts,
  logout,
} from "@/lib/shared-utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobileView } from "@/hooks/useIsMobileView";
import { useUser } from "@/contexts/UserContext";
import { Order } from "@/schema";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";

export default function ProfileDropdown() {
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const isMobile = useIsMobileView();
  const { orders, setActiveOrder } = useUser();
  const { openModal } = useModal();
  const { totalVendorCarts, setTotalVendorCarts } = useUser();

  useEffect(() => {
    const count = countVendorsWithProducts();
    setTotalVendorCarts(count);
  }, []);

  return (
    <div className="w-max @max-4xl:mr-5 flex items-center @max-3xl:gap-4 gap-2.5">
      <button
        onClick={() => {
          if (totalVendorCarts > 0) {
            router.push(`/browse-stores/${getFirstVendorWithProducts()}`);
          } else {
            router.push("/browse-stores");
          }
        }}
        className="w-10 relative @max-3xl:w-8 @max-3xl:h-8 h-10 2xl:w-11 2xl:h-11 rounded-[12px] bg-(--primary-green) flex justify-center items-center hover:opacity-80 duration-200"
        type="button"
      >
        <Image
          src="/images/shopping-cart.svg"
          alt=""
          width={24}
          height={24}
          className="w-5 2xl:w-6 @max-3xl:w-4"
        />
        <div className="absolute w-4 h-4 bg-red-600 flex justify-center items-center rounded-full -right-1 -top-1">
          <p className="text-white text-[8px]">{totalVendorCarts}</p>
        </div>
      </button>
      <div className="relative w-max h-max @max-3xl:w-4">
        <button
          onClick={() => {
            setShowProfileDropdown((prev) => !prev);
          }}
          className="w-10 h-10 @max-3xl:w-8 @max-3xl:h-8 2xl:w-11 2xl:h-11 rounded-[12px] bg-(--primary-green) flex justify-center items-center hover:opacity-80 duration-200"
          type="button"
        >
          <Image
            src="/images/user-white.svg"
            alt=""
            width={24}
            height={24}
            className="w-5 2xl:w-6 @max-3xl:w-4"
          />
        </button>
        <AnimatePresence>
          {showProfileDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-[178px] z-50 top-[calc(100%+10px)] p-2.5 absolute right-0 h-max border border-(--primary-green) rounded-[12px] bg-[#F6F6F6]"
            >
              <Sheet>
                <SheetTrigger asChild>
                  <div className="w-full cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5">
                    <Image
                      src="/images/user.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-5 2xl:w-6"
                    />
                    <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
                      Order history
                    </p>
                  </div>
                </SheetTrigger>
                <SheetContent
                  side={isMobile ? "bottom" : "right"}
                  noClose
                  className="shadow-none p-6 2xl:p-8"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                  </SheetHeader>
                  <SheetClose className="items-center flex mb-4 2xl:mb-5 w-max gap-2.5 cursor-pointer 2xl:text-xl text-base font-normal text-[#111111]">
                    <Image
                      src="/images/X.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-5 2xl:w-6"
                    />
                    Close
                  </SheetClose>
                  <div className="w-full mb-4 border-b border-[#E7E7E7] pt-2.5 pb-4">
                    <p className="font-medium text-lg 2xl:text-2xl text-[#0EAD65]">
                      My Orders - History
                    </p>
                  </div>
                  <div className="w-full h-full overflow-y-auto scroll-hidden flex flex-col gap-2.5">
                    {orders?.map((item: Order) => (
                      <SheetClose
                        key={item.uuid}
                        onClick={() => {
                          setShowProfileDropdown(false);
                          setActiveOrder(item);
                          setTimeout(() => {
                            openModal(ModalTypeEnum.MakePayment);
                          }, 500);
                        }}
                        className="p-2.5 cursor-pointer hover:opacity-70 duration-200 flex justify-between items-start"
                      >
                        <div className="flex flex-col gap-2.5">
                          <p className="font-medium text-[#111111] truncate text-base 2xl:text-xl">
                            {item?.orderItems?.[0].product.name}
                          </p>
                          <p className="text-xs text-start 2xl:text-base font-normal text-[#5D5D5D]">
                            {new Date(item.created_at).toDateString()}
                          </p>
                        </div>
                        <p className="text-xs 2xl:text-base font-normal text-[#5D5D5D]">
                          Order {item.order_number}
                        </p>
                      </SheetClose>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <div
                onClick={() => {
                  router.push("/profile");
                  setShowProfileDropdown((prev) => !prev);
                }}
                className="w-full cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5"
              >
                <Image
                  src="/images/user.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-5 2xl:w-6"
                />
                <p className="font-normal text-(--primary-black) text-sm 2xl:text-base">
                  My Profile
                </p>
              </div>
              <div
                onClick={() => {
                  setShowProfileDropdown((prev) => !prev);
                  logout();
                }}
                className="w-full cursor-pointer hover:opacity-70 duration-200 h-12 p-2.5 flex items-center gap-2.5"
              >
                <Image
                  src="/images/logout.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-5 2xl:w-6"
                />
                <p className="font-normal text-[#FF0000] text-sm 2xl:text-base">
                  Logout
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
