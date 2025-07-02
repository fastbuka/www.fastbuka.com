"use client";

import { useState } from "react";
import api from "@/lib/axios";
import cookie from "js-cookie";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { ModalTypeEnum, useModal } from "@/contexts/ModalContext";
import { useWallet } from "@/contexts/WalletContext";

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  username: string;
  uuid: string;
};

type UpdateUserPayload = {
  name?: string;
  email?: string;
  contact?: string;
  profile?: string;
};

type DeactivateAccountPayload = {
  password: string;
};

export const useManageUser = () => {
  const { setUser } = useUser();
  const { setWallet, setOngoingTransfer } = useWallet();
  const [loading, setLoading] = useState(false);
  const { openModal, closeModal } = useModal();

  const fetchUser = async (token: string) => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        setUser(response.data?.data?.user);
        return { success: true, data: response.data.data };
      }

      return { success: false };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      toast.error(err?.response?.data?.message || "Failed to fetch user");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const fetchWallet = async (uuid: string) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/api/v1/wallet/get-stellar-wallet/${uuid}`
      );

      if (response.data?.success) {
        setWallet(response.data?.data?.wallet);
        return { success: true, data: response.data.data };
      }

      return { success: false };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      if (err?.response?.data?.message === "Wallet not activated") {
        openModal(ModalTypeEnum.WalletActivation);
      } else {
        toast.error(err?.response?.data?.message || "Failed to fetch wallet");
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const activateWallet = async (uuid: string) => {
    try {
      setLoading(true);
      const response = await api.post(`/api/v1/wallet/activate-wallet/${uuid}`);

      if (response.data?.success) {
        await fetchWallet(uuid);
        toast.success("Your wallet has been activated");
        closeModal();
        return { success: true };
      }

      return { success: false };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      toast.error(err?.response?.data?.message || "Failed to activate wallet");
      closeModal();
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const generateAccountForTransfer = async (amount: number) => {
    const token = cookie.get("TOKEN");
    try {
      setLoading(true);
      const response = await api.post(
        "/api/v1/payment/fw/deposit/bank",
        {
          currency: "NGN",
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setOngoingTransfer(response?.data?.data?.query?.authorization);
        return { success: true };
      }

      return { success: false };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      toast.error(
        err?.response?.data?.message || "Failed to generate account details."
      );
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (payload: UpdateUserPayload) => {
    const token = cookie.get("TOKEN");
    try {
      setLoading(true);
      const response = await api.patch("/api/v1/users/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        await fetchUser(token || "");
        toast.success("Profile updated successfully.");
        return { success: true };
      }

      return { success: false };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      toast.error(err?.response?.data?.message || "Failed to update user");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deactivateAccount = async (payload: DeactivateAccountPayload) => {
    const token = cookie.get("TOKEN");
    try {
      setLoading(true);
      const response = await api.patch("/api/v1/users/deactivate", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        cookie.remove("TOKEN");
        toast.success("Profile deactivated successfully.");
        window.location.href = "/";
        return { success: true };
      }

      return { success: false };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      toast.error(
        err?.response?.data?.message || "Failed to deactivate account"
      );
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchUser,
    updateUser,
    fetchWallet,
    activateWallet,
    deactivateAccount,
    generateAccountForTransfer,
  };
};
