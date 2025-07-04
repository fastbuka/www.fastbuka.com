"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import cookie from "js-cookie";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("TOKEN");
    if (token) {
      router.replace("/profile");
    }
  }, []);
  return <main className="w-full @container">{children}</main>;
}
