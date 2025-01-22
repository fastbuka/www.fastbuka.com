// src/app/user/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/queries/auth';
import { Button } from '@/components/ui/button';
import { QueryClient } from 'react-query';
import { getUser, getToken } from '@/utils/token';
import { ShoppingBag, Wallet, AlertCircle } from 'lucide-react';
import { getDefaultFirstName } from '@/utils/defaults';

interface UserProfile {
  balance: number;
  profile: {
    first_name: string;
  };
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const token = getToken(); // Get the token from storage
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(token, queryClient); // Pass token to useLogout hook

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push('/auth/login');
    } else {
      setUser(userData as UserProfile);
    }
  }, [router]);

  const handleLogout = () => {
    logout.mutate();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl md:text-4xl font-bold mb-6'>
        Welcome, {getDefaultFirstName(user.profile?.first_name)}!
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-white rounded-lg shadow-md p-6 flex items-center'>
          <div className='bg-green-500 rounded-full p-3 mr-4'>
            <Wallet className='h-6 w-6 text-white' />
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Wallet Balance</h3>
            <p className='text-2xl font-bold'>{user?.balance || 0}</p>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 flex items-center'>
          <div className='bg-yellow-500 rounded-full p-3 mr-4'>
            <AlertCircle className='h-6 w-6 text-white' />
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Active Orders</h3>
            <p className='text-2xl font-bold'>{user.balance || 0}</p>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 flex items-center'>
          <div className='bg-blue-500 rounded-full p-3 mr-4'>
            <ShoppingBag className='h-6 w-6 text-white' />
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Total Orders</h3>
            <p className='text-2xl font-bold'>{user.balance || 0}</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
        {/* Add a table or list of recent orders here */}
      </div>

      <Button onClick={handleLogout} className='bg-red-600 text-white'>
        Logout
      </Button>
    </div>
  );
}
