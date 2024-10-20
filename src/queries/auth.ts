import { useMutation, useQuery, QueryClient } from 'react-query';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/constants';
import { request } from '@/utils/request';
import { setToken, getToken, clearToken } from '@/utils/token';
import { useAuth } from '@/context/AuthContext'; 

interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export function useLogin() {
  const router = useRouter();
  const { logout } = useAuth();  // Use your existing auth context

  return useMutation<AuthResponse, Error, LoginData>(
    (data) => request(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    {
      onSuccess: (data) => {
        setToken(data.token);
        router.push('/user/dashboard');
      },
      onError: (error) => {
        console.error('Login failed', error);
        logout();  // Use the logout function from your auth context
      },
    }
  );
}
export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterData>(
    async (data: RegisterData) => {
      const response = await request(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      return response.json();
    }
  );
}

export function useVerifyToken() {
  const { logout } = useAuth();  // Use your existing auth context

  return useQuery<{ isValid: boolean }, Error>(
    'verifyToken',
    () => request(API_ENDPOINTS.VERIFY_TOKEN, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getToken()}` },
    }),
    {
      retry: false,
      onError: () => {
        logout();  // Use the logout function from your auth context
      },
    }
  );
}

export function useLogout(queryClient: QueryClient) {
    return useMutation(
      async () => {
        const token = getToken();
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await fetch(API_ENDPOINTS.LOGOUT, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Logout failed');
        }
  
        return response.json();
      },
      {
        onSuccess: () => {
          clearToken();
          queryClient.clear(); // Clear all React Query caches
          window.location.href = '/auth/login'; // Redirect to login page
        },
        onError: (error) => {
          console.error('Logout failed', error);
          // You might want to show an error message to the user here
        },
      }
    );
  }
