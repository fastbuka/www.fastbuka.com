// src/app/user/layout.tsx
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Settings, ShoppingBag, Ticket, Wallet } from 'lucide-react';
import { DashboardIcon } from '@radix-ui/react-icons';

const menuItems = [
  { name: 'Dashboard', href: '/user/dashboard', icon: DashboardIcon },
  { name: 'Orders', href: '/user/orders', icon: ShoppingBag },
  { name: 'Wallet', href: '/user/wallet', icon: Wallet },
  { name: 'Tickets', href: '/user/tickets', icon: Ticket },
  { name: 'Settings', href: '/user/settings', icon: Settings },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile, visible on md and larger screens */}
      <aside className="hidden md:block w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* <div className="flex items-center justify-center h-16 bg-green-600 text-white">
            <h2 className="text-2xl font-bold">FastBuka</h2>
          </div> */}
          <nav className="flex-1 px-4 py-4 border-t">
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
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}