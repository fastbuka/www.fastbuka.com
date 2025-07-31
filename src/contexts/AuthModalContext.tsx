import React, { createContext, useContext, useState, ReactNode } from "react";

export enum AuthModalTypeEnum {
  LOGIN = "LOGIN",
  VERIFICATION = "VERIFICATION",
  RESETPASSWORD = "RESETPASSWORD",
  NEWPASSWORD = "NEWPASSWORD",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  SIGNUP = "SIGNUP",
  PHONEVERIFICATION = "PHONEVERIFICATION",
  ACCOUNTACTIVATION = "ACCOUNTACTIVATION",
}

type AuthModalType = AuthModalTypeEnum | null;

interface AuthModalContextProps {
  isOpen: boolean;
  modalType: AuthModalType;
  openModal: (type: AuthModalType) => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextProps | undefined>(
  undefined
);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<AuthModalType>(null);

  const openModal = (type: AuthModalType) => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
  };

  return (
    <AuthModalContext.Provider
      value={{ isOpen, modalType, openModal, closeModal }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
