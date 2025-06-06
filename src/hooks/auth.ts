import Cookies from 'js-cookie';
import { backend } from '@/lib/axios';

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
      const response = await backend.post('/api/v1/auth/register', {
        name,
        email,
        password,
      });
      // Log the response for debugging
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
      const response = await backend.post('/api/v1/auth/login', {
        email,
        password,
      });
      if (response.data.success) {
        Cookies.set('token', response.data.data.token, {
          expires: 7,
        });
        Cookies.set('userUuid', response.data.data.user.uuid, {
          expires: 7,
        });
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
      const token = Cookies.get('token');
      const response = await backend.delete('/api/v1/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        Cookies.remove('token');
        return {
          success: true,
          message: response.data.message || 'Logout successful',
        };
      } else {
        Cookies.remove('token');
        return {
          success: false,
          message: response.data.message || 'Failed to login',
        };
      }
    } catch (error: any) {
      Cookies.remove('token');
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
