import axios from '@/lib/axios';
import { useCallback } from 'react';

export const useApp = () => {
  /**
   * Fetches all categories
   */
  const categories = useCallback(
    async ({
      setData,
      setMessage,
    }: {
      setData: (data: any) => void;
      setMessage: (message: string) => void;
    }) => {
      try {
        const response = await axios.get('/api/v1/categories');
        if (response.data.success) {
          setData(response.data.data.categories);
        } else {
          setMessage(response.data.message || 'Failed to load categories');
        }
      } catch (error: any) {
        setMessage(`Error fetching categories: ${error.message}`);
      }
    },
    []
  );

  /**
   * Fetches all vendors
   */
  const vendors = useCallback(
    async ({
      setMessage,
      setData,
    }: {
      setData: (data: any) => void;
      setMessage: (message: string) => void;
    }) => {
      try {
        const response = await axios.get('/api/v1/vendors');
        if (response.data.success) {
          setData(response.data.data.vendors);
        } else {
          setMessage(response.data.message || 'Failed to load stores');
        }
      } catch (error: any) {
        setMessage(`Error fetching stores: ${error.message}`);
      }
    },
    []
  );

  /**
   * Show vendor
   */
  const vendor = useCallback(
    async ({
      slug,
      setData,
      setMessage,
    }: {
      slug: string;
      setData: (data: any) => void;
      setMessage: (message: string) => void;
    }) => {
      try {
        const response = await axios.get(`/api/v1/vendor/${slug}`);
        if (response.data.success) {
          setData(response.data.data.vendor);
        } else {
          setMessage(response.data.message || 'Failed to load stores');
        }
      } catch (error: any) {
        setMessage(`Error fetching stores: ${error.message}`);
      }
    },
    []
  );

  return {
    categories,
    vendors,
    vendor,
  };
};
