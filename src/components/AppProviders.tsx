"use client";

import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { UserProvider } from "@/contexts/UserContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { Toaster } from "@/components/ui/sonner";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }
  }, []);

  return (
    <UserProvider>
      <WalletProvider>
        <AuthModalProvider>
          <CurrencyProvider>
            <ModalProvider>{children}</ModalProvider>
          </CurrencyProvider>
        </AuthModalProvider>
        <Toaster />
      </WalletProvider>
    </UserProvider>
  );
}
