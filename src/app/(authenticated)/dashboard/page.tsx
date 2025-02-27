'use client';

import { useUser } from '@/hooks/users';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Wallet, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Notifications } from '@/components/Notifications';

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
  order_status: 'completed' | 'processing' | 'pending';
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
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchProfile = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await profile();
      if (response.success) {
        setUser(response.data.user);
      }
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      ) : (
        <CardContent>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className='space-y-3 py-3'
          >
            <div className='flex justify-end items-center'>
              <Button
                onClick={fetchProfile}
                variant='outline'
                size='sm'
                className='bg-white hover:bg-gray-100 transition-colors'
              >
                <RefreshCw className='mr-2 h-4 w-4' />
                Refresh
              </Button>
            </div>

            <div className='flex flex-1 flex-col gap-4 pt-0'>
              <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                <DashboardCard
                  title='Wallet Balance'
                  value={user?.balance || 0}
                  icon={<Wallet className='h-6 w-6 text-white' />}
                  color='bg-gradient-to-r from-green-400 to-green-600 aspect-video rounded-xl'
                />
                <DashboardCard
                  title='Active Orders'
                  value={
                    orders.filter((order) => order.order_status !== 'completed')
                      .length
                  }
                  icon={<AlertCircle className='h-6 w-6 text-white' />}
                  color='bg-gradient-to-r from-yellow-400 to-yellow-600 aspect-video rounded-xl'
                />
                <DashboardCard
                  title='Total Orders'
                  value={orders.length}
                  icon={<ShoppingBag className='h-6 w-6 text-white' />}
                  color='bg-gradient-to-r from-blue-400 to-blue-600 aspect-video rounded-xl'
                />
              </div>
            </div>

            <motion.div variants={cardVariants}>
              <Card className='bg-white shadow-lg rounded-lg overflow-hidden'>
                <CardHeader>
                  <CardTitle className='text-2xl font-bold text-gray-800'>
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Notifications />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </CardContent>
      )}
    </AnimatePresence>
  );
}
