import { backend } from '@/lib/axios';
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
      const response = await backend.get('/api/v1/users/profile', {
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

  const update = async ({
    email,
    contact,
    first_name,
    last_name,
    profile,
    address,
  }: {
    email: string;
    contact: string;
    first_name: string;
    last_name: string;
    profile: string;
    address: string;
  }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await backend.patch(
        '/api/v1/users/profile',
        {
          email,
          contact,
          first_name,
          last_name,
          profile,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to update profile',
        };
      }
    } catch (error: any) {
      console.error('Profile Update Error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile',
      };
    }
  };

  return {
    profile,
    update,
  };
};
