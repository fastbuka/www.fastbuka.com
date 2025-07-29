import type { NextConfig } from "next";

const bucketURL = process.env.NEXT_PUBLIC_BUCKET_URL;
const bucketEnv = process.env.NEXT_PUBLIC_STORAGE_ENV;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        `${bucketURL}/${bucketEnv}/user/a33c7be8-236a-462d-bbf7-bdd89131f7f5/images/**`
      ),
    ],
  },
};

export default nextConfig;
