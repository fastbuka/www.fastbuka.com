import type { NextConfig } from "next";

const bucketURL = process.env.NEXT_PUBLIC_BUCKET_URL || "";

const parsedURL = new URL(bucketURL);
const hostname = parsedURL.hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: hostname,
        pathname: `/**`,
      },
      {
        protocol: "https",
        hostname: hostname,
        pathname: `/**`,
      },
    ],
  },
};

export default nextConfig;
