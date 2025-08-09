import { Asset } from "@/contexts/WalletContext";
import { OrderStatus } from "@/schema";
import cookie from "js-cookie";

export const checkIsListedAsset = (asset: Asset) => {
  return (
    asset?.asset_type === "native" ||
    asset?.asset_code === "NGN" ||
    asset?.asset_code === "NGNC" ||
    asset?.asset_code === "USDC"
  );
};

export const getAssetImage = (asset: Asset) => {
  if (asset?.asset_type === "native") {
    return "/images/xlm-coin.png";
  } else if (asset?.asset_code === "NGN" || asset?.asset_code === "NGNC") {
    return "/images/ngnc-coin.png";
  } else {
    return "/images/usdc-coin.png";
  }
};

export function formatNumber(value: string | number) {
  const number = Number(value);
  if (isNaN(number)) return "0.00";

  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseExpirationTime(expiration: string): Date | null {
  const regex = /^(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2}):(\d{2}) (AM|PM)$/i;
  const match = expiration.match(regex);

  if (!match) return null;

  const [_, year, month, day, hourRaw, minute, second, meridiem] = match;
  console.log(_);

  let hour = parseInt(hourRaw, 10);
  if (meridiem.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (meridiem.toUpperCase() === "AM" && hour === 12) hour = 0;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    hour,
    Number(minute),
    Number(second)
  );

  return date;
}

export function getTimeLeft(expiration: string): string {
  const expireDate = parseExpirationTime(expiration);
  if (!expireDate) return "00:00";

  const now = new Date();
  const diff = expireDate.getTime() - now.getTime();

  if (diff <= 0) return "00:00";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const format = (num: number) => String(num).padStart(2, "0");

  return hours > 0
    ? `${format(hours)}:${format(minutes)}:${format(seconds)}`
    : `${format(minutes)}:${format(seconds)}`;
}

export const logout = async () => {
  try {
    cookie.remove("TOKEN");
    window.location.href = "/";
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};

export function scrollToElement(selector: string) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export async function reverseGeocodeWithGoogle(lat: number, lng: number) {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );

  const data = await res.json();

  if (data.status !== "OK" || !data.results.length) {
    throw new Error("Failed to reverse geocode");
  }

  const addressComponents = data.results[0].address_components;
  const formattedAddress = data.results[0].formatted_address;

  const cityObj = addressComponents.find(
    (c: { types: string[] }) =>
      c.types.includes("locality") ||
      c.types.includes("administrative_area_level_2")
  );

  const countryObj = addressComponents.find((c: { types: string[] }) =>
    c.types.includes("country")
  );

  return {
    city: cityObj?.long_name || "Unknown City",
    country: countryObj?.long_name || "Unknown Country",
    address: formattedAddress || "Unknown Address",
  };
}

export function countVendorsWithProducts() {
  const cart = localStorage.getItem("vendor_carts") || "{}";
  const vendorCarts = JSON.parse(cart);

  let count = 0;

  for (const vendor in vendorCarts) {
    const products = vendorCarts[vendor].products || [];

    const hasValidProduct = products.some(
      (product: { quantity: number }) => product.quantity > 0
    );
    if (hasValidProduct) {
      count++;
    }
  }

  return count;
}

export function getFirstVendorWithProducts() {
  const cart = localStorage.getItem("vendor_carts") || "{}";
  const vendorCarts = JSON.parse(cart);
  for (const vendorSlug in vendorCarts) {
    const products = vendorCarts[vendorSlug].products || [];
    const hasValidProduct = products.some(
      (product: { quantity: number }) => product.quantity > 0
    );

    if (hasValidProduct) {
      return vendorSlug;
    }
  }

  return null;
}

export function getOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PendingVendor:
    case OrderStatus.PendingRider:
      return "Pending";
    case OrderStatus.PendingCustomer:
    case OrderStatus.AcceptedRider:
      return "Awaiting Pickup";
    case OrderStatus.Cancelled:
      return "Cancelled";
    case OrderStatus.Rejected:
      return "Rejected";
    case OrderStatus.AcceptedVendor:
      return "Accepted";
    case OrderStatus.Delivered:
      return "Delivered";
  }
}
