import Cookies from 'js-cookie';
import { backend } from '@/lib/axios';

export const useAddTrustLine = () => {
  const userUuid = Cookies.get('userUuid');
  const addTrustLine = async () => {
    try {
      const response = await backend.post(`/api/auth/addTrustLine/${userUuid}`);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Trust line added successfully',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to  add trustline',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || 'Failed to add trustline',
      };
    }
  };

  return { addTrustLine };
};
