"use client";
import React, { useEffect, useState } from "react";
// import RiderLocationMap from "./RiderLocationMap";
import Link from "next/link";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useManageUser } from "@/hooks/useManageUser";
import cookie from "js-cookie";
import { Order, OrderStatus, OrderType } from "@/schema";
import { formatNumber } from "@/lib/shared-utils";
import { AnimatePresence, motion } from "framer-motion";
// import { useSocket } from "@/hooks/useSocket";
import { useUser } from "@/contexts/UserContext";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { useWallet } from "@/contexts/WalletContext";
import { useRouter } from "next/navigation";

const bucketURL = process.env.NEXT_PUBLIC_BUCKET_URL;
const bucketEnv = process.env.NEXT_PUBLIC_STORAGE_ENV;
// const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const initialStages = [
  {
    title: "Order Confirmed",
    completed: true,
  },
  {
    title: "Preparing",
    completed: false,
  },
  {
    title: "Pending Pickup",
    completed: false,
  },
  {
    title: "Order Pickedup",
    completed: false,
  },
  {
    title: "Delivered",
    completed: false,
  },
];

export default function TrackOrder({ uuid }: { uuid: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const { fetchOrder, fetchUser, fetchWallet } = useManageUser();
  const [showDetails, setShowDetails] = useState(true);
  const [stages, setStages] = useState(initialStages);
  // const socketRef = useSocket(endpoint);
  // const [riderLocation, setRiderLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);
  const { location, setLocation, setActiveOrder, user } = useUser();
  const { wallet } = useWallet();
  const { openModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("TOKEN");
    const locationData = cookie.get("LOCATION");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!location && !locationData) {
      openModal(ModalTypeEnum.FindLocation);
    }
    if (locationData && !location) {
      setLocation(JSON.parse(locationData));
    }
    if (token && !user) {
      fetchUser(token);
    }
  }, []);

  useEffect(() => {
    if (user && !wallet) {
      fetchWallet(user.uuid);
    }
  }, [user, wallet]);

  const getOrder = async () => {
    try {
      const res = await fetchOrder(uuid);
      if (res.success) {
        setOrder(res.data?.order);
        console.log(res.data?.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = cookie.get("TOKEN");
    if (token) {
      getOrder();
    }
  }, []);

  // useEffect(() => {
  //   if (!order) return;
  //   const socket = socketRef.current;
  //   if (!socket) return;

  //   socket.on(`rider.location.${order?.rider_uuid}`, async (data) => {
  //     if (data) {
  //       setRiderLocation({
  //         ...data,
  //         latitude: parseInt(data?.latitude),
  //         longitude: parseInt(data?.longitude),
  //       });
  //     }
  //   });
  //   return () => {
  //     socket.off(`rider.location.${order?.rider_uuid}`);
  //   };
  // }, [order]);

  useEffect(() => {
    if (order) {
      switch (order.order_status) {
        case OrderStatus.Delivered:
          setStages((p) =>
            p.map((s) => {
              return { ...s, completed: true };
            })
          );

          break;
        case OrderStatus.PickedUpRider:
          setStages((p) =>
            p.map((s, i) => {
              if (i <= 3) {
                return { ...s, completed: true };
              }
              return { ...s, completed: false };
            })
          );

          break;
        case OrderStatus.PendingRider:
        case OrderStatus.AcceptedRider:
        case OrderStatus.PendingCustomer:
          setStages((p) =>
            p.map((s, i) => {
              if (i <= 2) {
                return { ...s, completed: true };
              }
              return { ...s, completed: false };
            })
          );

          break;
        case OrderStatus.AcceptedVendor:
          setStages((p) =>
            p.map((s, i) => {
              if (i <= 1) {
                return { ...s, completed: true };
              }
              return { ...s, completed: false };
            })
          );

          break;
        default:
          setStages(initialStages);
          break;
      }
    }
  }, [order]);

  return (
    <div className="w-full h-screen mb-6 relative">
      {/* <RiderLocationMap
        rider={{
          lat: riderLocation?.latitude ?? null,
          lng: riderLocation?.longitude ?? null,
        }}
        from={{
          lat: order?.vendor?.latitude ?? null,
          lng: order?.vendor?.longitude ?? null,
        }}
        to={{
          lat: order?.latitude ?? null,
          lng: order?.longitude ?? null,
        }}
      /> */}

      <button
        type="button"
        onClick={() => {
          setShowDetails(true);
        }}
        className="max-w-[95%] custom-shadow-one flex text-[13px] 2xl:text-base gap-2 items-center justify-start text-white w-[650px] 2xl:w-[850px] bg-[#0EAD65] h-11 2xl:h-12 rounded-full px-6 absolute top-[5%] left-[50%] translate-y-[5%] cursor-pointer translate-x-[-50%]"
      >
        View Order Details
        <ChevronDown className="text-white w-5 2xl:w-6" />
      </button>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            className="absolute overflow-y-auto scroll-hidden top-[45%] md:top-[50%] left-[50%] translate-y-[-50%] 2xl:px-[30px] px-7 2xl:py-6 py-5 translate-x-[-50%] h-max max-w-[95%] w-[650px] 2xl:w-[850px] bg-white rounded-[14px] @max-3xl:max-h-[80%] max-h-[90%]"
          >
            <div className="w-full mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href="/browse-stores"
                  className="text-[#667085] text-xs 2xl:text-sm font-normal"
                >
                  Browse stores
                </Link>
                <ChevronRight className="w-3.5 2xl:w-4 text-[#D0D5DD]" />
                <p className="text-[#667085] text-xs 2xl:text-sm">
                  ID {order?.order_number}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                }}
                className="bg-[#0EAD65] flex justify-center items-center custom-shadow-one cursor-pointer h-10 2xl:h-11 w-10 2xl:w-11 rounded-full"
              >
                <ChevronUp className="w-4 2xl:w-5 text-white" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link
                href={`/browse-stores/${order?.vendor?.slug}`}
                className="text-[#667085] text-xs 2xl:text-sm font-normal"
              >
                {order?.vendor?.name}
              </Link>
            </div>
            <div className="flex justify-center">
              <span className="text-[#344054] font-semibold 2xl:text-[30px] text-[22px]">
                {order?.order_type == "PICKUP"
                  ? order.pickup_code
                  : order?.delivery_code}
              </span>
            </div>
            <div className="flex @max-3xl:flex-col items-center @max-3xl:gap-3 mt-4 2xl:mt-7 gap-6">
              <div className="flex items-center gap-1.5">
                <p className="text-xs 2xl:text-sm text-[#667085]">
                  Order date:
                </p>
                <p className="text-[#1D2939] @max-3xl:text-xs text-sm 2xl:text-base">
                  {order?.created_at
                    ? new Date(order.created_at).toDateString()
                    : ""}
                </p>
              </div>
              <div className="w-px @max-3xl:hidden h-4 2xl:h-5 bg-[#D0D5DD]" />
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/truck.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-4 2xl:w-5"
                />
                <p className="text-[#12B76A] @max-3xl:text-xs text-sm 2xl:text-base">
                  Estimated delivery: May 16, 2025
                </p>
              </div>
            </div>
            <div className="my-4 2xl:my-7 w-full bg-[#D0D5DD] h-px" />
            <div className="w-full mb-1 flex justify-between items-center">
              {stages.map((stage, index) => (
                <p
                  key={index}
                  className={cn(
                    "font-normal @max-3xl:text-[9px] 2xl:font-medium text-sm 2xl:text-lg text-[#D0D5DD]",
                    {
                      "text-[#12B76A]": stage.completed,
                    }
                  )}
                >
                  {stage.title}
                </p>
              ))}
            </div>
            <div className="pb-4 2xl:pb-6 mb-4 2xl:mb-7 @max-3xl:px-4 2xl:px-11 px-9 w-full">
              <div className="relative w-full">
                <div className="absolute top-1/2 left-0 right-0 h-2 @max-3xl:h-1.5 2xl:h-[11px] bg-[#D0D5DD] rounded-full z-0" />
                <div
                  className="absolute top-1/2 @max-3xl:h-1.5 left-0 h-2 2xl:h-[11px] bg-[#12B76A] rounded-full z-10 transition-all duration-500"
                  style={{
                    width: `${
                      ((stages.filter((s) => s.completed).length - 1) /
                        (stages.length - 1)) *
                      100
                    }%`,
                  }}
                />
                <div className="relative translate-y-[25%] z-20 flex justify-between items-center">
                  {stages.map((stage, index) => {
                    return (
                      <div
                        key={index}
                        className={cn(
                          "w-4 h-4 @max-3xl:h-3 @max-3xl:w-3 2xl:w-5 2xl:h-5 rounded-full border-2",
                          stage.completed
                            ? "bg-[#12B76A] border-[#12B76A]"
                            : "bg-[#D0D5DD] border-[#D0D5DD]"
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col mb-4 2xl:mb-7 gap-4 2xl:gap-7">
              {order?.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex justify-between items-center"
                >
                  <div className="flex items-center gap-6">
                    <Image
                      width={110}
                      height={110}
                      src={
                        bucketEnv && item.product.image.startsWith(bucketEnv)
                          ? `${bucketURL}/${item.product.image}`
                          : "/images/product-placeholder.jpg"
                      }
                      alt=""
                      className="2xl:min-w-[110px] 2xl:w-[110px] w-[90px] min-w-[90px] h-[90px] rounded-[12px] 2xl:rounded-[17px] 2xl:h-[110px] object-cover"
                    />
                    <p className="text-[#344054] font-normal text-base 2xl:text-2xl">
                      {item.product.name}
                    </p>
                  </div>
                  <div className="flex flex-col justify-end gap-1">
                    <p className="text-[#1D2939] font-semibold text-sm 2xl:text-xl">
                      N{formatNumber(item.product.price || 0)}
                    </p>
                    <p className="text-xs 2xl:text-base font-normal text-[#667085]">
                      Oty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className=" w-full bg-[#D0D5DD] h-px" />
            <div className="w-full grid gap-8 items-start grid-cols-2 py-4 2xl:py-7">
              <div className="flex flex-col justify-end gap-1">
                <p className="text-black font-medium text-sm 2xl:text-xl">
                  Payment
                </p>
                <p className="text-xs 2xl:text-base font-normal text-[#667085]">
                  My wallet
                </p>
              </div>
              <div className="flex flex-col justify-end gap-1">
                <p className="text-black font-medium text-sm 2xl:text-xl">
                  {order?.order_type}
                </p>
                {order?.order_type === OrderType.Delivery && (
                  <>
                    <p className="text-xs 2xl:text-base font-normal text-[#667085]">
                      Address
                    </p>
                    <p className="text-[#667085] font-medium text-[13px] 2xl:text-lg">
                      {order?.delivery_address}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className=" w-full bg-[#D0D5DD] h-px" />
            <div className="py-4 2xl:py-7 gap-2 2xl:gap-3 flex flex-col">
              <p className="text-black font-medium text-sm 2xl:text-xl">
                Order Summary
              </p>
              <RenderSummary
                label="Order total"
                value={`N${formatNumber(order?.order_charges || 0)}`}
              />
              <RenderSummary
                label="Discount"
                value={`N${formatNumber(order?.discount_amount || 0)}`}
              />
              {order?.order_type === OrderType.Delivery && (
                <RenderSummary
                  label="Delivery"
                  value={`N${formatNumber(order?.delivery_charges || 0)}`}
                />
              )}

              <div className="w-full border-t border-dashed border-[#D0D5DD] pt-3 2xl:pt-4">
                <div className="w-full flex justify-between items-center">
                  <p className="text-[#667085] font-medium text-[13px] 2xl:text-lg">
                    Total
                  </p>
                  <p className="text-[#1D2939] font-bold text-[13px] 2xl:text-lg">
                    N{formatNumber(order?.total_amount || 0)}
                  </p>
                </div>
              </div>
              {!order?.paid_amount && order?.payment_status === "PENDING" && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveOrder(order);
                    openModal(ModalTypeEnum.MakePayment);
                  }}
                  className="w-full mt-5 bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
                >
                  Make Payment
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const RenderSummary = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-[#667085] font-medium text-[13px] 2xl:text-lg">
        {label}
      </p>
      <p className="text-[#667085] font-medium text-[13px] 2xl:text-lg">
        {value}
      </p>
    </div>
  );
};
