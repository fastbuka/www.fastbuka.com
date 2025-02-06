import axios from '@/lib/axios';

export const useProduct = () => {
   /**
   * Products
   * @param param0
   * @returns
   */
   const products = async () => {
    try {
      const response = await axios.get('/api/v1/menu');
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to load menu',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load menu',
      };
    }
  };


  /**
   * Vendors
   * @param param0
   * @returns
   */
  const vendors = async () => {
    try {
      const response = await axios.get('/api/v1/vendor');
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to load menu',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load menu',
      };
    }
  };


  /**
   * Vendor
   * @param param0 
   * @returns 
   */
  const vendor = async ({ vendor_slug }: { vendor_slug: string }) => {
    try {
      const response = await axios.get(`/api/v1/food/${vendor_slug}`);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to load menu',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load menu',
      };
    }
  };

  return {
    products,
    vendors,
    vendor,
  };
};
