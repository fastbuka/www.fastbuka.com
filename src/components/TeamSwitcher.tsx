'use client';

import * as React from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='flex justify-center border rounded data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Link href='/' className='flex justify-center items-center'>
            <Image
              className='h-12 w-16 object-cover'
              src='/svg/logo.svg'
              alt='logo'
              height={100}
              width={100}
            />
          </Link>
          <Link
            href='/'
            className='grid flex-1 text-left text-sm leading-tight'
          >
            <span className='truncate font-semibold'>fastbuka</span>
            <span className='truncate text-xs'>Order now</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
