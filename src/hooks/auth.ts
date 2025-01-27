import axios from '@/lib/axios';

export const useAuth = () => {
  /**
   * Register user
   * @param param0
   * @returns
   */
  const register = async ({
    name,
    email,
    password,
    setData,
    setMessage,
  }: {
    name: string;
    email: string;
    password: string;
    setData: (response: any) => void;
    setMessage: (message: string) => void;
  }) => {
    try {
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setData(response.data);
        setMessage(response.data.message || 'Registration successful');
      } else {
        setMessage(response.data.message || 'Failed to login');
      }
    } catch (error: any) {
      setMessage(`Error: ${error?.message}`);
    }
  };

  /**
   * Login user
   * @param param0
   * @returns
   */
  const login = async ({
    email,
    password,
    setData,
    setMessage,
  }: {
    email: string;
    password: string;
    setData: (response: any) => void;
    setMessage: (message: string) => void;
  }) => {
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      if (response.data.success) {
        setData(response.data);
        setMessage(response.data.message || 'Login successful');
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      } else {
        setMessage(response.data.message || 'Failed to login');
      }
    } catch (error: any) {
      setMessage(`Error: ${error?.message}`);
    }
  };

  return {
    register,
    login,
  };
};
