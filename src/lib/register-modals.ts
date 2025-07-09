"use client";
import ActivateWallet from "@/components/modals/ActivateWallet";
import FundingOptions from "@/components/modals/FundingOptions";
import WalletFunding from "@/components/modals/WalletFunding";
import SwapCurrency from "@/components/modals/SwapCurrency";
import SelectCurrencyForTransfer from "@/components/modals/SelectCurrencyForTransfer";
import ValidateTransfer from "@/components/modals/ValidateTransfer";
import Success from "@/components/modals/Success";
import ErrorModal from "@/components/modals/Error";
import CardDetails from "@/components/modals/CardDetails";
import CardVerification from "@/components/modals/CardVerification";
import PendingModal from "@/components/modals/Pending";
import ApplyPromoCode from "@/components/modals/PromoCode";
import { ModalTypeEnum } from "@/contexts/ModalContext";
import DeliveryAddress from "@/components/modals/DeliveryAddress";
import DeactivateAccount from "@/components/modals/DeactivateAccount";
import SearchVendor from "@/components/modals/Search";
import ViewProduct from "@/components/modals/ViewProduct";
import SelectLocation from "@/components/modals/SelectLocation";
import MakePayment from "@/components/modals/MakePayment";

export const modalRegistry: Record<ModalTypeEnum, React.FC> = {
  [ModalTypeEnum.WalletActivation]: ActivateWallet,
  [ModalTypeEnum.MakePayment]: MakePayment,
  [ModalTypeEnum.FundingOptions]: FundingOptions,
  [ModalTypeEnum.WalletFunding]: WalletFunding,
  [ModalTypeEnum.SwapCurrency]: SwapCurrency,
  [ModalTypeEnum.SelectCurrencyForTransfer]: SelectCurrencyForTransfer,
  [ModalTypeEnum.ValidateTransfer]: ValidateTransfer,
  [ModalTypeEnum.Success]: Success,
  [ModalTypeEnum.Error]: ErrorModal,
  [ModalTypeEnum.CardDetails]: CardDetails,
  [ModalTypeEnum.CardVerification]: CardVerification,
  [ModalTypeEnum.Pending]: PendingModal,
  [ModalTypeEnum.PromoCode]: ApplyPromoCode,
  [ModalTypeEnum.DeliveryAddress]: DeliveryAddress,
  [ModalTypeEnum.DeactivateAccount]: DeactivateAccount,
  [ModalTypeEnum.Search]: SearchVendor,
  [ModalTypeEnum.ViewProduct]: ViewProduct,
  [ModalTypeEnum.FindLocation]: SelectLocation,
};
