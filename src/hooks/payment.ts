import { backend } from '@/lib/axios';

export const useOrderPayment = () => {
    const payment = async (orderUuid: string) => {
    try {
      const response = await backend.post(`/api/payment/order/${orderUuid}`);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Payment failed'
      };
    }
  };

  return {
    payment,
  };
};