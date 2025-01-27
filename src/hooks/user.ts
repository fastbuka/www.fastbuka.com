import axios from '@/lib/axios';

export const useUser = () => {
  /**
   * User
   * @param param0
   * @returns
   */
  const profile = async ({
    setData,
    setMessage,
  }: {
    setData: (data: any) => void;
    setMessage: (message: string) => void;
  }) => {
    try {
      const response = await axios.get('/api/v1/users/profile');
      if (response.data.success) {
        setData(response.data.data.user);
      } else {
        setMessage(response.data.message || 'Failed to load user');
      }
    } catch (error: any) {
      setMessage(`Error fetching user: ${error.message}`);
    }
  };

  return {
    profile,
  };
};
