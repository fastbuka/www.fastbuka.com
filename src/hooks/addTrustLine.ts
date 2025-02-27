import { backend } from '@/lib/axios';

export const useAddTrustLine = () => {
  const userUuid = localStorage.getItem('userUuid');
  const addTrustLine = async () => {
    try {
        const response = await backend.post(`/api/auth/addTrustLine/${userUuid}`);
        console.log("Trustline: ", response)
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
        console.log("errror adding trustline:", error);
        return {
            success: false,
            message: error?.message || 'Failed to add trustline',
        };
    }
  };

  return { addTrustLine };

};