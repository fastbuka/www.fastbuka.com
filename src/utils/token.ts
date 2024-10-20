// The key used to store the token in localStorage
const TOKEN_KEY = 'fastbuka_auth_token';

/**
 * Retrieves the authentication token from localStorage
 * @returns {string | null} The stored token or null if not found
 */
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Stores the authentication token in localStorage
 * @param {string} token - The token to be stored
 */
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Removes the authentication token from localStorage
 */
export const clearToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Checks if a token exists in localStorage
 * @returns {boolean} True if a token exists, false otherwise
 */
export const hasToken = (): boolean => {
  return !!getToken();
};