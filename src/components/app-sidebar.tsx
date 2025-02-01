'use client';

import * as React from 'react';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings,
  ShoppingBag,
  Ticket,
  Wallet,
  PieChartIcon,
} from 'lucide-react';
import { NavMain } from './nav-main';

const teams = [
  {
    name: 'Acme Inc',
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
  },
  {
    name: 'Acme Corp.',
    logo: AudioWaveform,
    plan: 'Startup',
  },
  {
    name: 'Evil Corp.',
    logo: Command,
    plan: 'Free',
  },
];

const navMain = [
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
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
