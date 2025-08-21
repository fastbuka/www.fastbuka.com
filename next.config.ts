import type { NextConfig } from "next";

const bucketURL = process.env.NEXT_PUBLIC_BUCKET_URL || "";
const bucketEnv = process.env.NEXT_PUBLIC_STORAGE_ENV || "";

const parsedURL = new URL(bucketURL);
const hostname = parsedURL.hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: hostname,
        pathname: `/buckets/${bucketEnv}/**`,
      },
      {
        protocol: "https",
        hostname: hostname,
        pathname: `/buckets/${bucketEnv}/**`,
      },
    ],
  },
};

export default nextConfig;
