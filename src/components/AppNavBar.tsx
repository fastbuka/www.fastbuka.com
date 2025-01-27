'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/users';
import { Button } from '@/components/ui/button';
import { MapPin, Search, ShoppingBag, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function AppNavBar() {
  const { profile } = useUser();
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await profile();
      if (response.success) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem('token');
      }
    };

    fetchProfile();
  }, [profile, setUser]);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Logo */}
        <div className='flex items-center gap-6'>
          <Link href='/' className='flex items-center gap-2 pt-2'>
            <Image src='/images/logo.png' alt='Logo' width={120} height={70} />
          </Link>
        </div>

        {/* Location & Search */}
        <div className='hidden flex-1 items-center gap-4 px-6 md:flex'>
          <Button variant='ghost' className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-emerald-600' />
            <span className='text-sm'>{location}</span>
          </Button>
          <div className='flex flex-1 items-center gap-2 rounded-full border bg-gray-50 px-4 py-2'>
            <Search className='h-4 w-4 text-gray-400' />
            <input
              type='search'
              placeholder='Search restaurants or dishes'
              className='flex-1 bg-transparent text-sm outline-none'
            />
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon'>
            <ShoppingBag className='h-5 w-5' />
          </Button>
          {user ? (
            <Link href='/dashboard'>
              <Button className='hidden bg-emerald-600 hover:bg-emerald-700 md:inline-flex'>
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href='/login'>
              <Button className='hidden bg-emerald-600 hover:bg-emerald-700 md:inline-flex'>
                Get Started
              </Button>
            </Link>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <MenuIcon className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>{/* Mobile menu content */}</SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
