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
    profileUrl,
    address,
  }: {
    email: string;
    contact: string;
    first_name: string;
    last_name: string;
    profileUrl: string;
    address: string;
  }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('email', email);
      formData.append('contact', contact);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('address', address);
      formData.append('profileUrl', profileUrl);

      const response = await backend.patch('/api/v1/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

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
