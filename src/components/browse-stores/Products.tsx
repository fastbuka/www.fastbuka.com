"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductComponent from "./Product";
import Order from "./Order";
import Image from "next/image";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { Pagination, Product, Vendor } from "@/schema";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { countVendorsWithProducts, formatNumber } from "@/lib/shared-utils";
import { useUser } from "@/contexts/UserContext";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";
import { useManageUser } from "@/hooks/useManageUser";
import Spinner from "../auth/Spinner";

type Order = {
  name: string;
  price: string;
  description: string;
};

interface Props {
  vendor?: Vendor;
  slug: string;
  category?: string;
  data?: {
    pagination: Pagination;
    products: Product[];
  };
}

const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Products(props: Props) {
  const { data, vendor, slug, category } = props;
  const { openModal } = useModal();
  const [list, setList] = useState(data?.products || []);
  const [pagination, setPagination] = useState<Pagination | null>(
    data?.pagination || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [addDeliveryInstructions, setAddDeliveryInstructions] = useState(false);
  const [addVendorInstructions, setAddVendorInstructions] = useState(false);
  const { clearCart, cart } = useCart();
  const { user, location, setTotalVendorCarts } = useUser();
  const { openModal: openAuthModal } = useAuthModal();
  const { placeOrder, loading } = useManageUser();

  const updateCartCount = () => {
    const count = countVendorsWithProducts();
    setTotalVendorCarts(count);
  };

  const isAddressValid = useMemo(() => {
    if (!location?.address) return false;
    return location.address.trim().length > 0 ? true : false;
  }, [location]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = useMemo(() => {
    return getTotalPrice() || 0;
  }, [cart]);

  async function fetchMore() {
    try {
      setIsLoading(true);
      const request = await fetch(
        `${endpoint}/api/v1/product/public/${slug}?page=${
          pagination?.nextPage
        }${category ? `&q=${category}` : ""}`
      );
      const response = await request.json();
      if (response?.success) {
        setPagination(response.data.pagination);
        setList((prev) => [...prev, ...response.data.products]);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      openAuthModal(AuthModalTypeEnum.LOGIN);
      return;
    }

    if (!location) {
      openModal(ModalTypeEnum.FindLocation);
      return;
    }

    const cartItems: {
      product_uuid: string;
      quantity: number;
    }[] = [];

    cart.forEach((item) => {
      cartItems.push({
        product_uuid: item.uuid,
        quantity: item.quantity,
      });
    });

    try {
      await placeOrder(
        {
          delivery_address: location.address || "",
          delivery_email: user.email,
          delivery_contact: user.contact,
          delivery_name: `${user.first_name} ${user.other_names}`,
          newOrder: true,
          vendor_slug: slug,
          latitude: location?.lat || 0,
          longitude: location?.lng || 0,
          cartItems,
        },
        () => {
          clearCart();
          updateCartCount();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setList(data.products);
      setPagination(data.pagination);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1210px] @max-5xl:grid-cols-1 px-5 grid grid-cols-5">
        <div className="col-span-3 @max-5xl:col-span-1 @max-2xl:pr-0 2xl:pr-[43px] @max-5xl:border-r-0 border-r pt-5 2xl:pt-6 border-[#E7E7E7]">
          <div className="grid @max-2xl:grid-cols-1 grid-cols-2 gap-x-7 gap-y-8 2xl:gap-y-10 w-full p-2.5">
            {list.map((product, index) => {
              return <ProductComponent key={index} product={product} />;
            })}
            {list.length === 0 && (
              <div className="col-span-2 @max-2xl:col-span-1 py-14 flex justify-center items-center">
                <p className=" font-normal  text-[#5D5D5D] text-base 2xl:text-lg">
                  No available product
                </p>
              </div>
            )}
            {pagination?.nextPage && (
              <div className="col-span-2 @max-2xl:col-span-1 flex items-center justify-center">
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
        </div>
        <div className="col-span-2 @max-5xl:col-span-1 @max-2xl:px-2 p-6 flex flex-col">
          <div className="w-full @max-2xl:flex-col @max-2xl:gap-6 mb-7 2xl:mb-8 pb-4 border-b border-[#E7E7E7] flex justify-between items-start gap-8">
            <p className="text-sm w-full 2xl:text-base text-[#5D5D5D] font-normal">
              {vendor?.name} - {vendor?.city}
            </p>
            <button className="min-w-max font-normal text-(--primary-green) text-sm 2xl:text-base bg-[#DAFEEC] py-2 px-4 rounded-[12px] hover:opacity-70 duration-300">
              Add another pack
            </button>
          </div>
          <motion.div
            layout
            className="w-full flex flex-col gap-5 2xl:gap-6 mb-2"
          >
            {cart.length === 0 ? (
              <div className="w-full flex justify-center">
                <Image
                  alt=""
                  width={200}
                  height={200}
                  src="/images/empty-carton.png"
                />
              </div>
            ) : (
              <>
                {cart.map((order, index) => {
                  return <Order data={order} key={index} />;
                })}
              </>
            )}
          </motion.div>
          <div className="w-full flex flex-col py-2 2xl:py-2.5 mb-5 gap-2.5">
            {/* <RenderActionMenu
              onClick={() => {
                openModal(ModalTypeEnum.PromoCode);
              }}
              value="Promo Code"
              label="Choose"
            /> */}
            <RenderActionMenu
              onClick={() => {
                openModal(ModalTypeEnum.FindLocation);
              }}
              value="Delivery Address"
              label={isAddressValid ? "Change" : "Choose"}
            />
            <RenderActionMenu
              value="Delivery instructions"
              label="Add"
              onClick={() => {
                setAddDeliveryInstructions(true);
              }}
            />
            {addDeliveryInstructions && (
              <textarea
                placeholder="Add delivery instructions"
                className="w-full text-sm 2xl:text-base bg-white placeholder:text-[#D1D1D1] text-[#D1D1D1] border border-[#E7E7E7] outline-none rounded-[12px] px-5 py-2.5 h-[75px]"
              ></textarea>
            )}
            <RenderActionMenu
              onClick={() => {
                setAddVendorInstructions(true);
              }}
              value="Vendor instructions"
              label="Add"
            />
            {addVendorInstructions && (
              <textarea
                placeholder="Add vendor instructions"
                className="w-full text-sm 2xl:text-base bg-white placeholder:text-[#D1D1D1] text-[#D1D1D1] border border-[#E7E7E7] outline-none rounded-[12px] px-5 py-2.5 h-[75px]"
              ></textarea>
            )}
          </div>
          <div className="w-full mb-5 gap-2.5 bg-[#DAFEEC] rounded-[12px] px-6 py-3 flex items-center">
            <Image
              src="/images/info.svg"
              alt=""
              width={24}
              height={24}
              className="w-5 2xl:w-6"
            />
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm font-medium text-(--primary-black)">
                Delivery includes PIN confirmation
              </p>
              <p className="text-xs font-normal text-[#888888]">
                This helps ensure that your order is given to the right person
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col py-2 2xl:py-2.5 gap-2.5 2xl:mb-28 @max-2xl:mb-10 mb-20">
            <RenderOrderDetail
              label={`Sub total (${cart.length} items)`}
              value={`NGN${formatNumber(totalPrice)}`}
            />
            <RenderOrderDetail label="Delivery fee" value="NGN0.00" />
            <RenderOrderDetail label="Service fee" value="NGN0.00" />
            <div className="w-full flex justify-between items-center">
              <p className="text-sm 2xl:text-base text-(--primary-black) font-medium">
                Total
              </p>
              <p className="text-sm 2xl:text-base text-(--primary-black) font-normal">
                {`NGN${formatNumber(totalPrice)}`}
              </p>
            </div>
          </div>
          <div className="w-full mb-16 @max-2xl:mb-5 2xl:mb-20 flex flex-col items-center gap-3">
            <button
              disabled={!cart.length}
              onClick={() => {
                if (!isAddressValid) {
                  openModal(ModalTypeEnum.FindLocation);
                } else {
                  handlePlaceOrder();
                }
              }}
              className="w-full disabled:opacity-60 bg-(--primary-green) h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-white font-normal 2xl:h-[50px]"
            >
              {loading ? <Spinner /> : "Place Order"}
            </button>
            <button
              onClick={() => {
                clearCart();
                updateCartCount();
              }}
              className="w-full bg-[#FFF0F0] h-11 text-base 2xl:text-xl hover:opacity-70 duration-200 rounded-[8px] text-[#FF0000] font-normal 2xl:h-[50px]"
            >
              Clear Orders
            </button>
            <button className="w-full bg-transparent h-11 text-sm flex items-center gap-2.5 justify-center 2xl:text-base hover:opacity-70 duration-200 rounded-[8px] text-(--primary-green) font-normal 2xl:h-[50px]">
              <Image
                src="/images/bookmark.svg"
                alt=""
                width={24}
                height={24}
                className="w-5 2xl:w-6"
              />{" "}
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type ActionMenu = {
  value: string;
  label: string;
  onClick?: () => void;
};

const RenderActionMenu = (menu: ActionMenu) => {
  const { label, value, onClick } = menu;

  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-sm 2xl:text-base text-[#5D5D5D] font-normal">
        {value}
      </p>
      <button
        onClick={() => {
          onClick?.();
        }}
        className="hover:opacity-70 text-(--primary-green) text-sm 2xl:text-base font-normal"
      >
        {label}
      </button>
    </div>
  );
};

const RenderOrderDetail = (menu: { label: string; value: string }) => {
  const { label, value } = menu;

  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-sm 2xl:text-base text-[#5D5D5D] font-normal">
        {label}
      </p>
      <p className="text-sm 2xl:text-base text-[#5D5D5D] font-normal">
        {value}
      </p>
    </div>
  );
};
