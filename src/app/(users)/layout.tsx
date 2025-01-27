'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardIcon } from '@radix-ui/react-icons';
import { Settings, ShoppingBag, Ticket, Wallet } from 'lucide-react';
import Image from 'next/image';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingBag },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Tickets', href: '/tickets', icon: Ticket },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-100'>
      <aside className='hidden md:block w-64 bg-white shadow-lg'>
        <div className='flex flex-col h-full'>
          <Link
            href={'/'}
            className='flex items-center pt-4 px-4 h-16 bg-green-300 text-white'
          >
            <Image src='/images/logo.png' alt='Logo' width={120} height={70} />
          </Link>
          <nav className='flex-1 p-4 border-t'>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center py-2 px-4 rounded-lg mb-2 ${
                  pathname === item.href
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className='mr-3 h-5 w-5' />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className='flex-1 p-4 md:p-8'>{children}</main>
    </div>
  );
}
