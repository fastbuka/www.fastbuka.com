'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser, getToken } from '@/utils/token';
import { ShoppingBag, Wallet, AlertCircle, RefreshCcw } from 'lucide-react';
import { getDefaultFirstName } from '@/utils/defaults';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface UserProfile {
  balance: number;
  profile: {
    first_name: string;
  };
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function DashboardCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div variants={cardVariants}>
      <Card className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <CardContent className='flex items-center p-6'>
          <div className={`rounded-full p-3 mr-4 ${color}`}>{icon}</div>
          <div>
            <CardTitle className='text-lg font-semibold text-gray-700'>
              {title}
            </CardTitle>
            <p className='text-3xl font-bold text-gray-900'>{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = getToken();
        const userData = getUser();
        if (!token || !userData) {
          // router.push('/login');
        } else {
          setUser(userData as UserProfile);
          // Simulating API call for orders
          const mockOrders: Order[] = [
            { id: '1', date: '2023-06-01', total: 25.99, status: 'Delivered' },
            { id: '2', date: '2023-06-03', total: 34.5, status: 'Processing' },
            { id: '3', date: '2023-06-05', total: 19.99, status: 'Shipped' },
          ];
          setOrders(mockOrders);
        }
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log('Refreshing dashboard data...');
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      className='space-y-8'
    >
      <div className='flex justify-between items-center'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='text-4xl font-bold text-gray-800'
        >
          Welcome, {getDefaultFirstName(user?.profile?.first_name)}!
        </motion.h1>
        <Button
          onClick={handleRefresh}
          variant='outline'
          size='sm'
          className='bg-white'
        >
          <RefreshCcw className='mr-2 h-4 w-4' />
          Refresh
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <DashboardCard
          title='Wallet Balance'
          value={user?.balance || 0}
          icon={<Wallet className='h-6 w-6 text-white' />}
          color='bg-gradient-to-r from-green-400 to-green-600'
        />
        <DashboardCard
          title='Active Orders'
          value={orders.filter((order) => order.status !== 'Delivered').length}
          icon={<AlertCircle className='h-6 w-6 text-white' />}
          color='bg-gradient-to-r from-yellow-400 to-yellow-600'
        />
        <DashboardCard
          title='Total Orders'
          value={orders.length}
          icon={<ShoppingBag className='h-6 w-6 text-white' />}
          color='bg-gradient-to-r from-blue-400 to-blue-600'
        />
      </div>

      <motion.div variants={cardVariants}>
        <Card className='bg-white shadow-lg rounded-lg overflow-hidden'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-gray-800'>
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-gray-600'>Order ID</TableHead>
                  <TableHead className='text-gray-600'>Date</TableHead>
                  <TableHead className='text-gray-600'>Total</TableHead>
                  <TableHead className='text-gray-600'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <TableCell className='font-medium'>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function DashboardSkeleton() {
  return (
    <div className='space-y-8'>
      <Skeleton className='h-12 w-[300px]' />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-[120px] w-full' />
        ))}
      </div>
      <Skeleton className='h-[400px] w-full' />
    </div>
  );
}
