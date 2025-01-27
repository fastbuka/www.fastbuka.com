'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardIcon } from '@radix-ui/react-icons';
import {
  Settings,
  ShoppingBag,
  Ticket,
  Wallet,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

interface User {
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

interface AppSidebarProps {
  user: User | null;
}

const items = [
  { title: 'Dashboard', url: '/dashboard', icon: DashboardIcon },
  { title: 'Orders', url: '/orders', icon: ShoppingBag },
  { title: 'Wallet', url: '/wallet', icon: Wallet },
  { title: 'Tickets', url: '/tickets', icon: Ticket },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar({ user }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        className='fixed top-4 left-4 z-50 md:hidden'
        onClick={toggleSidebar}
      >
        <Menu className='h-6 w-6 text-gray-600' />
      </Button>
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial='closed'
            animate='open'
            exit='closed'
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
            className='fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:relative'
          >
            <div className='flex flex-col h-full'>
              <div className='flex items-center justify-between p-4 bg-green-600'>
                <Link href='/' className='flex items-center'>
                  <Image
                    src='/images/logo.png'
                    alt='Logo'
                    width={120}
                    height={40}
                    className='w-auto h-8 md:h-14'
                  />
                </Link>
                {isMobile && (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-white'
                    onClick={toggleSidebar}
                  >
                    <X className='h-6 w-6' />
                  </Button>
                )}
              </div>
              {user && (
                <div className='flex items-center space-x-4 p-4 border-b bg-green-50'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage
                      src={user.profile.avatar}
                      alt={`${user.profile.first_name} ${user.profile.last_name}`}
                    />
                    <AvatarFallback className='bg-green-500 text-white'>
                      {user.profile.first_name[0]}
                      {user.profile.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-gray-900 truncate'>
                      {`${user.profile.first_name} ${user.profile.last_name}`
                        .length > 20
                        ? `${user.profile.first_name} ${user.profile.last_name}`.slice(
                            0,
                            20
                          ) + '...'
                        : `${user.profile.first_name} ${user.profile.last_name}`}
                    </p>
                    <p className='text-sm text-gray-500 truncate'>
                      {user.email.length > 25
                        ? user.email.slice(0, 25) + '...'
                        : user.email}
                    </p>
                  </div>
                </div>
              )}
              <ScrollArea className='flex-1 py-4'>
                <nav className='space-y-1 px-2'>
                  {items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                        pathname === item.url
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className='w-5 h-5' />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
              <div className='p-4 border-t'>
                <Button
                  variant='outline'
                  className='w-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors'
                  onClick={() => {
                    /* Add logout logic */
                  }}
                >
                  <LogOut className='w-4 h-4 mr-2' />
                  Logout
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
