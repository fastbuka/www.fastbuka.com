import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@/constants";
import { setProfile, getProfile } from "@/utils/userProfile";
import { getToken } from "@/utils/token";

/**
 * Hook to fetch and store the user profile.
 */
export function useProfile() {
  return useQuery(
    "userProfile",
    async () => {
      const token = getToken();

      if (!token) {
        console.error("No token found.");
        throw new Error("No token found");
      }

      const response = await fetch(API_ENDPOINTS.USERS_PROFILE, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`, // Using Authorization header
        },
      });

      if (!response.ok) {
        const errorMessage = `Failed to fetch profile: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const profileData = await response.json();
      console.log("Fetched profile data:", profileData);
      return profileData;
    },
    {
      onSuccess: (data) => {
        console.log("Profile data fetched successfully, storing in localStorage.");
        setProfile(data); // Store profile data in localStorage
      },
      onError: (error) => {
        console.error("Error fetching profile data:", error);
      },
    }
  );
}

/**
 * Hook to fetch the user wallet data using the stored token.
 */
export function useWallet() {
  return useQuery("userWallet", async () => {
    const token = getToken();

    if (!token) {
      console.error("No token found.");
      throw new Error("No token found");
    }

    const response = await fetch(API_ENDPOINTS.USERS_WALLET, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`, // Using Authorization header
      },
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch wallet: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const walletData = await response.json();
    console.log("Fetched wallet data:", walletData);
    return walletData;
  });
}
