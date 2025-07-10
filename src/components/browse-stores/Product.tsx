"use client";
import { useCart } from "@/contexts/CartContext";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import { countVendorsWithProducts, formatNumber } from "@/lib/shared-utils";
import { Product } from "@/schema";
import React, { useMemo, useState } from "react";

export default function ProductComponent({ product }: { product: Product }) {
  const { description, image, name, price } = product;
  const [imgSrc, setImgSrc] = useState(image);
  const { setActiveProduct, setTotalVendorCarts } = useUser();
  const { openModal } = useModal();
  const { cart, addToCart, removeFromCart } = useCart();

  const inCart = useMemo(() => {
    return cart.some((p) => p.uuid === product.uuid);
  }, [cart]);

  const updateCartCount = () => {
    const count = countVendorsWithProducts();
    setTotalVendorCarts(count);
  };

  return (
    <div
      onClick={() => {
        setActiveProduct(product);
        openModal(ModalTypeEnum.ViewProduct);
      }}
      className="col-span-1 hover:scale-[1.02] duration-200 cursor-pointer gap-4 border border-[#E7E7E7] rounded-[12px] px-6 py-2.5 flex items-center justify-between"
    >
      <div className="w-full max-w-full flex flex-col">
        <h3 className="text-(--primary-black) line-clamp-1 text-base 2xl:text-xl font-medium mb-2 2xl:mb-2.5">
          {name}
        </h3>
        <p className="font-normal line-clamp-2  text-sm 2xl:text-base text-[#5D5D5D] mb-7 2xl:mb-8">
          {description}
        </p>
        <p className="font-normal text-sm 2xl:text-base text-[#5D5D5D] mb-2 2xl:mb-2.5">
          NGN{formatNumber(price)}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (inCart) {
              removeFromCart(product.uuid);
            } else {
              addToCart({
                uuid: product.uuid,
                vendor_uuid: product.vendor_uuid,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                description: product.description,
              });
            }
            updateCartCount();
          }}
          className="h-7 w-max px-3 rounded bg-[#FF9702] hover:opacity-80 duration-300 text-[13px] text-[#F6F6F6] font-normal"
        >
          {inCart ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
      <img
        src={imgSrc}
        alt=""
        onError={() => {
          console.log("error loading image");
          setImgSrc("/images/product-placeholder.jpg");
        }}
        className="min-w-[115px] w-[115px] h-[122px] object-cover"
      />
    </div>
  );
}
