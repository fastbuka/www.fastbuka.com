'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
  pathname,
}: {
  items: {
    url: string;
    path?: string;
    title: string;
    icon?: LucideIcon;
  }[];
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center rounded-md transition-colors ${
                pathname == item.url
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
