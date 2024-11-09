// Define keys for localStorage
const TOKEN_KEY = "fastbuka_auth_token";
const USER_KEY = "fastbuka_user_data";

import { getToken } from "./token";

/**
 * Stores the user profile data in localStorage
 * @param {any} profile - The profile object to be stored
 */
export const setProfile = (profile: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  }
};

/**
 * Retrieves the user profile data from localStorage
 * @returns {any | null} The stored profile object or null if not found
 */
export const getProfile = (): any | null => {
  if (typeof window !== "undefined") {
    const profileData = localStorage.getItem(USER_KEY);
    return profileData ? JSON.parse(profileData) : null;
  }
  return null;
};

/**
 * Removes the user profile data from localStorage
 */
export const clearProfile = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
};
