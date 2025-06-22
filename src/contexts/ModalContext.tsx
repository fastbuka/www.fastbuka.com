import React, { createContext, useContext, useState, ReactNode } from "react";

export enum ModalTypeEnum {
  WalletActivation = "WalletActivation",
  FundWallet = "FundWallet",
  FundingOptions = "FundingOptions",
  WalletFunding = "WalletFunding",
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
