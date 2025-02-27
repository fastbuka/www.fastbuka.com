'use client';

import { useEffect, useState, useCallback } from 'react';
import { useOrder } from '@/hooks/order';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

interface Order {
  uuid: string;
  order_number: string;
  vendor: {
    name: string;
  };
  total_amount: number;
  order_status: string;

  payment_status: string;


const orderStatuses = ['All', 'Pending', 'Completed', 'Cancelled'];

export default function UserOrders() {
  const { orders } = useOrder();
  const [loading, setLoading] = useState(true);
  const [orderFetch, setOrderFetch] = useState(false);
  const [orderStatus, setOrderStatus] = useState('All');
  const [orderDetails, setOrderDetails] = useState<Order[]>([]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setOrderFetch(false);
    try {
      const response = await orders({

        order_status: orderStatus !== 'All' ? orderStatus.toLowerCase() : null,
      if (response.success) {
        setOrderDetails(response.data.orders);
      }

      // console.log(response);

    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
      setOrderFetch(true);
    }
  }, [orderStatus, orders]);

  useEffect(() => {
    if (!orderFetch) {
      fetchOrders();
    }
  }, [fetchOrders, orderFetch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <CardContent>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className='space-y-6 py-6'
      >

        <div className='flex justify-between items-center space-x-4'>
          <Select
            value={orderStatus}
            onValueChange={(value) => {
              setOrderStatus(value), setOrderFetch(false);
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              {orderStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={fetchOrders}
            variant='outline'
            size='sm'
            className='bg-white hover:bg-gray-100 transition-colors'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>

        {orderDetails.length > 0 ? (
          <div className='flex flex-col space-y-4'>

            {orderDetails.map((order) => (
              <Link key={order.uuid} href={`/checkout/${order.uuid}`}>
                <motion.div
                  variants={cardVariants}
                  className='bg-white rounded-lg shadow-md p-6 flex justify-between items-center'
                >
                  <div className='space-y-2'>
                    <h3 className='text-lg font-semibold'>

                      {order?.vendor?.name || 'Vendor deleted'}

                    </h3>
                    <p className='text-sm text-gray-500'>
                      Order #{order.order_number}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className='text-right space-y-2'>
                    <p className='text-lg font-bold'>
                      ₦{order.total_amount.toFixed(2)}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.order_status
                      )}`}
                    >
                      {order.order_status}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No orders found.</p>
          </div>
        )}
      </motion.div>
    </CardContent>
  );
}
