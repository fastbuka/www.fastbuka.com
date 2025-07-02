"use client";

import { useState } from "react";
import api from "@/lib/axios";
import cookie from "js-cookie";
import { getDeviceToken } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthModalTypeEnum, useAuthModal } from "@/contexts/AuthModalContext";
import { useManageUser } from "./useManageUser";

type LoginPayload = {
  email: string;
  password: string;
};

type PhoneLoginPayload = {
  phone: string;
};

type RegisterPayload = {
  name: string;
  contact: string;
  email: string;
  password: string;
};

type VerifyEmailPayload = {
  email: string;
  code: string;
};

type VerifyPhonePayload = {
  contact: string;
  code: string;
};

type ResetPasswordPayload = {
  email: string;
  code: string;
  password: string;
};

type ResendEmailVerificationCodePayload = {
  email: string;
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { openModal } = useAuthModal();
  const { fetchUser } = useManageUser();

  const login = async (payload: LoginPayload, asPage?: boolean) => {
    try {
      const deviceToken = await getDeviceToken();
      setLoading(true);
      const response = await api.request({
        url: "/api/v1/auth/login",
        method: "POST",
        data: JSON.stringify({
          email_or_contact: payload.email,
          password: payload.password,
        }),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-device-token": deviceToken || "",
        },
      });

      if (response.data?.success) {
        const token = response.data?.data?.token;
        cookie.set("TOKEN", token);
        await fetchUser(token);
        toast.success("Login successful");
        if (asPage) {
          router.push("/profile");
        } else {
          // Proceed with Order
        }
      }

      return { success: true };
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string; message?: string } };
      };

      if (error?.response?.data?.error === "DEACTIVATED") {
        if (asPage) {
          localStorage.setItem("ACCOUNT_ACTIVATION_EMAIL", payload.email);
          router.push("/login/activate");
        } else {
          openModal(AuthModalTypeEnum.VERIFICATION);
        }
      }

      toast.error(error?.response?.data?.message || "An error occured");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      cookie.remove("TOKEN");
      window.location.href = "/";
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  };

  const phoneLogin = async (
    payload: PhoneLoginPayload,
    asPage?: boolean,
    asResend?: boolean,
    switchToEmail?: () => void
  ) => {
    try {
      const deviceToken = await getDeviceToken();
      if (!asResend) {
        setLoading(true);
      }
      const response = await api.request({
        url: "/api/v1/auth/login",
        method: "POST",
        data: JSON.stringify({
          email_or_contact: payload.phone,
        }),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-device-token": deviceToken || "",
        },
      });

      if (response.data?.success) {
        toast.success(response.data?.message);
        if (asResend) {
          return;
        }
        if (asPage) {
          localStorage.setItem("ACCOUNT_REGISTRATION_NUMBER", payload.phone);
          router.push("/login/verification");
        } else {
          openModal(AuthModalTypeEnum.PHONEVERIFICATION);
        }
      }

      return { success: true };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      if (err?.response?.data?.error === "DEACTIVATED") {
        toast.error(
          "Your account is deactivated, please sign in with email to continue"
        );
        switchToEmail?.();
      } else {
        toast.error(err?.response?.data?.message || "An error occured");
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload, asPage?: boolean) => {
    try {
      setLoading(true);
      const response = await api.request({
        url: "/api/v1/auth/register",
        method: "POST",
        data: JSON.stringify(payload),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data?.success) {
        toast.success("Registration Successful.");
        if (asPage) {
          localStorage.setItem("ACCOUNT_REGISTRATION_EMAIL", payload.email);
          router.push("/register/verification");
        } else {
          openModal(AuthModalTypeEnum.VERIFICATION);
        }
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

  const verifyPhone = async (payload: VerifyPhonePayload, asPage?: boolean) => {
    try {
      setLoading(true);
      const response = await api.request({
        url: "/api/v1/auth/verify-contact",
        method: "POST",
        data: JSON.stringify(payload),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data?.success) {
        const token = response.data?.data?.token;
        cookie.set("TOKEN", token);
        await fetchUser(token);
        toast.success(response.data?.message);
        if (asPage) {
          router.push("/profile");
        } else {
          // Proceed with Order
        }
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

  const resetPassword = async (
    payload: ResetPasswordPayload,
    asPage?: boolean
  ) => {
    try {
      setLoading(true);
      const response = await api.request({
        url: "/api/v1/auth/reset-forgot-password",
        method: "POST",
        data: JSON.stringify(payload),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data?.success) {
        toast.success(response.data?.message);
        if (asPage) {
          router.push("/login");
        } else {
          openModal(AuthModalTypeEnum.LOGIN);
        }
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

  const verifyEmail = async (payload: VerifyEmailPayload, asPage?: boolean) => {
    try {
      setLoading(true);
      const response = await api.request({
        url: "/api/v1/auth/verify-email",
        method: "POST",
        data: JSON.stringify(payload),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data?.success) {
        toast.success("Email successfully verified.");
        if (asPage) {
          localStorage.removeItem("ACCOUNT_REGISTRATION_EMAIL");
          router.push("/login");
        } else {
          openModal(AuthModalTypeEnum.LOGIN);
        }
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

  const activateAccount = async (
    payload: VerifyEmailPayload,
    asPage?: boolean
  ) => {
    try {
      setLoading(true);
      const response = await api.request({
        url: "/api/v1/users/activate",
        method: "PATCH",
        data: JSON.stringify(payload),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data?.success) {
        toast.success("Account successfully activated.");
        if (asPage) {
          localStorage.removeItem("ACCOUNT_ACTIVATION_EMAIL");
          router.push("/login");
        } else {
          openModal(AuthModalTypeEnum.LOGIN);
        }
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

  const resendEmailVerificationCode = async (
    payload: ResendEmailVerificationCodePayload
  ) => {
    try {
      const response = await api.request({
        url: "/api/v1/auth/resend-email-verification",
        method: "POST",
        data: JSON.stringify(payload),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data?.success) {
        toast.success(response.data.message);
      }

      return { success: true };
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      toast.error(err?.response?.data?.message || "An error occured");
      return { success: false };
    }
  };

  const requestForgotPassword = async (
    payload: ResendEmailVerificationCodePayload,
    asPage?: boolean,
    asResend?: boolean
  ) => {
    try {
      if (!asResend) {
        setLoading(true);
      }
      const response = await api.request({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        data: JSON.stringify(payload),
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_SECRET_KEY,
          "x-api-public": process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data?.success) {
        toast.success(response.data?.message);
        if (asResend) {
          return;
        }
        if (asPage) {
          localStorage.setItem("ACCOUNT_EMAIL", payload.email);
          router.push("/login/reset-password");
        } else {
          openModal(AuthModalTypeEnum.NEWPASSWORD);
        }
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
    login,
    register,
    loading,
    phoneLogin,
    verifyEmail,
    resetPassword,
    verifyPhone,
    logout,
    requestForgotPassword,
    activateAccount,
    resendEmailVerificationCode,
  };
};
