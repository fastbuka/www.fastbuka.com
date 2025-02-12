import React from 'react';
import { Bell, Package, CreditCard, UserPlus, ShieldCheck } from 'lucide-react';

interface Notification {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    icon: <Package className='h-6 w-6 text-blue-500' />,
    title: 'Order Shipped',
    description: 'Your order #1234 has been shipped.',
    time: '2 hours ago',
  },
  {
    id: 2,
    icon: <CreditCard className='h-6 w-6 text-green-500' />,
    title: 'Payment Successful',
    description: 'Your payment of $59.99 was successful.',
    time: '5 hours ago',
  },
  {
    id: 3,
    icon: <Bell className='h-6 w-6 text-red-500' />,
    title: 'Reminder',
    description: "Don't forget to complete your profile.",
    time: '3 days ago',
  },
];

export function Notifications() {
  return (
    <div className='flex flex-col gap-3 rounded-xl'>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className='flex items-start space-x-4 p-4 bg-gray-50 rounded-lg'
        >
          <div className='flex-shrink-0'>{notification.icon}</div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-900'>
              {notification.title}
            </p>
            <p className='text-sm text-gray-500'>{notification.description}</p>
          </div>
          <div className='flex-shrink-0'>
            <p className='text-xs text-gray-400'>{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
