"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

type ContactUsPayload = {
  email: string;
  subject: string;
  message: string;
};

export const useContact = () => {
  const [loading, setLoading] = useState(false);

  const contactUs = async (payload: ContactUsPayload) => {
    try {
      setLoading(true);
      const response = await api.request({
        url: "/api/v1/contact",
        method: "POST",
        data: payload,
      });

      if (response.data?.success) {
        toast.success(response.data?.message);
      }

      return { success: true };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      toast.error(err?.response?.data?.message || "An error occured");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    contactUs,
  };
};
