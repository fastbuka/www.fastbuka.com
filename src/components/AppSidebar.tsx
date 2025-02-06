'use client';

import * as React from 'react';
import { TeamSwitcher } from '@/components/TeamSwitcher';
import { SideBarMain } from '@/components/SideBarMain';
import { SideBarUser } from '@/components/SideBarUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Settings,
  ShoppingBag,
  Ticket,
  Wallet,
  PieChartIcon,
} from 'lucide-react';

const sideBarMain = [
  { title: 'Dashboard', url: '/dashboard', icon: PieChartIcon },
  { title: 'Orders', url: '/orders', icon: ShoppingBag },
  { title: 'Wallet', url: '/wallet', icon: Wallet },
  { title: 'Tickets', url: '/tickets', icon: Ticket },
  { title: 'Settings', url: '/settings', icon: Settings },
];

interface User {
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export function AppSidebar({
  user,
  pathname,
}: {
  user: User | null;
  pathname: string;
}) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SideBarMain items={sideBarMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
