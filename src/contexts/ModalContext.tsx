import React, { createContext, useContext, useState, ReactNode } from "react";

export enum ModalTypeEnum {
  WalletActivation = "WalletActivation",
  MakePayment = "MakePayment",
  FundingOptions = "FundingOptions",
  WalletFunding = "WalletFunding",
  SwapCurrency = "SwapCurrency",
  SelectCurrencyForTransfer = "SelectCurrencyForTransfer",
  ValidateTransfer = "ValidateTransfer",
  Success = "Success",
  Error = "Error",
  CardDetails = "CardDetails",
  CardVerification = "CardVerification",
  Pending = "Pending",
  PromoCode = "PromoCode",
  DeliveryAddress = "DeliveryAddress",
  Search = "Search",
  DeactivateAccount = "DeactivateAccount",
  ViewProduct = "ViewProduct",
  FindLocation = "FindLocation",
  CardOTP = "CardOTP",
  CardAddress = "CardAddress",
}

type ModalType = ModalTypeEnum | null;

interface ModalContextProps {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }
  return context;
};
