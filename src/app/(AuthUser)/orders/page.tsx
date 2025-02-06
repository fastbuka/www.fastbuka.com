'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const orderStatuses = ['Active', 'Completed', 'Cancelled'];

export default function UserOrders() {
  const [activeTab, setActiveTab] = useState('Active');

  // Mock data for orders
  const orders = [
    {
      uuid: 'FB123ABC',
      status: 'Active',
      restaurant: 'Mama Put',
      items: 'Jollof Rice with Chicken',
      total: '₦2,500',
    },
    {
      uuid: 'FB456DEF',
      status: 'Completed',
      restaurant: 'Iya Basira',
      items: 'Amala with Ewedu and Gbegiri',
      total: '₦1,800',
    },
    {
      uuid: 'FB789GHI',
      status: 'Cancelled',
      restaurant: 'Tantalizers',
      items: 'Meat Pie and Pepsi',
      total: '₦1,200',
    },
    {
      uuid: 'FB234JKL',
      status: 'Active',
      restaurant: 'Mr. Biggs',
      items: 'Chicken and Chips',
      total: '₦2,000',
    },
    {
      uuid: 'FB567MNO',
      status: 'Completed',
      restaurant: 'Kilimanjaro',
      items: 'Fried Rice and Grilled Fish',
      total: '₦3,500',
    },
    {
      uuid: 'FB890PQR',
      status: 'Active',
      restaurant: 'Buka Hut',
      items: 'Egusi Soup with Pounded Yam',
      total: '₦2,200',
    },
    {
      uuid: 'FB345STU',
      status: 'Cancelled',
      restaurant: 'Sweet Sensation',
      items: 'Shawarma and Smoothie',
      total: '₦1,700',
    },
  ];

  const tabColors = ['bg-green-500', 'bg-blue-500', 'bg-red-500'];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleUpdate = async () => {};

  return (
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
            onClick={handleUpdate}
            variant='outline'
            size='sm'
            className='bg-white hover:bg-gray-100 transition-colors'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>
        <Tabs defaultValue='Active' className='h-fit w-full'>
          <TabsList>
            {orderStatuses.map((status) => (
              <TabsTrigger key={status} value={status}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
          {orderStatuses.map((status) => (
            <TabsContent key={status} value={status}>
              <div className='bg-white rounded-lg shadow-md overflow-auto scroll-hidden'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='p-3 text-left'>Order ID</th>
                      <th className='p-3 text-left'>Restaurant</th>
                      <th className='p-3 text-left'>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((order) => order.status === status)
                      .map((order) => (
                        <tr key={order.uuid} className='border-b'>
                          <td className='p-3'>
                            {order.uuid.length > 5
                              ? order.uuid.substring(0, 5)
                              : order.uuid}
                          </td>
                          <td className='p-3'>
                            {order.restaurant.length > 9
                              ? order.restaurant.substring(0, 9) + '...'
                              : order.restaurant}
                          </td>
                          <td className='p-3'>{order.total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </CardContent>
  );
}
