import axios from '@/lib/axios';
import {} from 'react';

export const useApp = () => {
  /**
   * Fetches all categories
   */
  const categories = async () => {
    try {
      const response = await axios.get('/api/v1/categories');
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Successful',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Faild',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }
  };

  /**
   * Fetches all vendors
   */
  const vendors = async () => {
    try {
      const response = await axios.get('/api/v1/vendors');
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Successful',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Successful',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }
  };

  /**
   * Show vendor
   * @param param0 
   * @returns 
   */
  const vendor = async ({ vendor_slug }: { vendor_slug: string | null }) => {
    let response;
    try {
      if (vendor_slug) {
        response = await axios.get(`/api/v1/vendor/${vendor_slug}`);
      } else {
        response = {
          status: 404,
          success: false,
          message: 'vendor not found',
        };
      }
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Successful',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Successful',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }
  };

  /**
   * Show vendor producats
   */
  const products = async ({ vendor_slug }: { vendor_slug: string | null }) => {
    let response;
    try {
      if (vendor_slug) {
        response = await axios.get(`/api/v1/food/${vendor_slug}`);
      } else {
        response = {
          status: 404,
          success: false,
          message: 'vendor not found',
        };
      }
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Successful',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Successful',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }
  };

  /**
   * Show trending
   * @returns 
   */
  const trending = async () => {
    try {
      const response = await axios.get('/api/v1/trending');
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Successful',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Successful',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }
  };

  return {
    categories,
    products,
    trending,
    vendors,
    vendor,
  };
};
