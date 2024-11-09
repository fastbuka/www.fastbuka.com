import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@/constants";
import { QueryClient } from "react-query";

// Function to fetch user profile with token
export function useProfile(token: string | null) {
  return useQuery("userProfile", async () => {
    if (!token) throw new Error("No token found");

    const response = await fetch(API_ENDPOINTS.USERS_PROFILE, {
      method: "GET",
      headers: {
        'accept': '*/*',
        'token': token,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch profile");
    return response.json();
  });
}

// Function to fetch user wallet with token
export function useWallet(token: string | null) {
  return useQuery("userWallet", async () => {
    if (!token) throw new Error("No token found");

    const response = await fetch(API_ENDPOINTS.USERS_WALLET, {
      method: "GET",
      headers: {
        'accept': '*/*',
        'token': token,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch wallet");
    return response.json();
  });
}
