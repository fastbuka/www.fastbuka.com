import Cookies from 'js-cookie';
import { backend } from '@/lib/axios';

export const useSendXLM = () => {
  const userUuid = Cookies.get('userUuid');
  const sendXLM = async () => {
    try {
      const response = await backend.post(`/api/auth/sendXLM/${userUuid}`);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'XLM sent successfully',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to send XLM',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || 'Failed to send XLM.',
      };
    }
  };

  return {
    sendXLM,
  };
};
