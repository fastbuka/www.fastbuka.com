"use client";

import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { UserProvider } from "@/contexts/UserContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { Toaster } from "@/components/ui/sonner";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export function Providers({ children }: { children: React.ReactNode }) {
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
