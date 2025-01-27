import axios from '@/lib/axios';
import { useCallback } from 'react';

interface Category {
  id: number;
  uuid: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Vendor {
  id: string;
  uuid: string;
  name: string;
  image: string;
  category: string;
  ratings: number;
  deliveryTime: string;
  distance: string;
}

interface CategoriesApi {
  data: {
    message: string;
    success: boolean;
    data: {
      categories: Category[];
    };
  };
}

interface VendorsApi {
  data: {
    message: string;
    success: boolean;
    data: {
      vendors: Vendor[];
    };
  };
}

export const useApp = () => {
  /**
   * Fetches all categories
   */
  const categories = useCallback(
    async ({
      setMessage,
      setData,
    }: {
      setMessage: (message: string) => void;
      setData: (data: Category[]) => void;
    }) => {
      try {
        const response: CategoriesApi = await axios.get('/v1/categories');
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
      setMessage: (message: string) => void;
      setData: (data: Vendor[]) => void;
    }) => {
      try {
        const response: VendorsApi = await axios.get('/v1/vendors');
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

  return {
    categories,
    vendors,
  };
};
