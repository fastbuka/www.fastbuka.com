import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';


export const useUser = () => {
  /**
   * User
   * @param param0
   * @returns
  */
  const router = useRouter();
  const profile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        localStorage.removeItem('token');
        router.push('/login');
        return {
          success: false,
          message: response.data.message || 'Failed to load user',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load user',
      };
    }
  };

  return {
    profile,
  };
};
