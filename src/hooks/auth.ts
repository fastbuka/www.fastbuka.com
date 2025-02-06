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
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Registration successful',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to register',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || 'Failed to register.',
      };
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
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        return {
          success: true,
          message: response.data.message || 'Login successful',
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to login',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || 'Invalid credentials, please try again.',
      };
    }
  };
  /**
   * Logout user
   * @returns
   */
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('/api/v1/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        localStorage.removeItem('token');
        return {
          success: true,
          message: response.data.message || 'Logout successful',
        };
      } else {
        localStorage.removeItem('token');
        return {
          success: false,
          message: response.data.message || 'Failed to login',
        };
      }
    } catch (error: any) {
      localStorage.removeItem('token');
      return {
        success: false,
        message: error?.message || 'Invalid credentials, please try again.',
      };
    }
  };

  return {
    register,
    login,
    logout,
  };
};
