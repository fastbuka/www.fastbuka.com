"use client";

import { AuthModalProvider } from "@/contexts/AuthModalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthModalProvider>{children}</AuthModalProvider>;
}
