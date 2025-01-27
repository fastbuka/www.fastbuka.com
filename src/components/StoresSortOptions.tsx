'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function StoresSortOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          Sort by <ChevronDown className='ml-2 h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>Price</DropdownMenuItem>
        <DropdownMenuItem>Rating</DropdownMenuItem>
        <DropdownMenuItem>Distance</DropdownMenuItem>
        <DropdownMenuItem>Delivery Time</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
