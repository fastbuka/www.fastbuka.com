"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Asset = {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
  is_authorized?: boolean;
  buying_liabilities: string;
  selling_liabilities: string;
  is_authorized_to_maintain_liabilities?: boolean;
  last_modified_ledger?: number;
  limit?: string;
  sponsor?: string;
};

type Wallet = {
  address: string;
  network: string;
  balances: Asset[];
};

type TransferDetails = {
  account_expiration: string;
  transfer_account: string;
  transfer_amount: string;
  transfer_bank: string;
  transfer_note: string;
  transfer_reference: string;
  account_name: string;
};

type WalletContextType = {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
  ongoingTransfer: TransferDetails | null;
  setOngoingTransfer: (ongoingTransfer: TransferDetails | null) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [ongoingTransfer, setOngoingTransfer] =
    useState<TransferDetails | null>(null);

  return (
    <WalletContext.Provider
      value={{ wallet, setWallet, ongoingTransfer, setOngoingTransfer }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
