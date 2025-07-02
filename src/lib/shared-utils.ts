import { Asset } from "@/contexts/WalletContext";
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
