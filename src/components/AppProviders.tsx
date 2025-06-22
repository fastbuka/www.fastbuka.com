"use client";

import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { ModalProvider } from "@/contexts/ModalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthModalProvider>
  );
}
