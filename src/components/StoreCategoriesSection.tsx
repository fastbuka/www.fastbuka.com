'use client';
import { useApp } from '@/hooks/app';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Category {
  id: number;
  uuid: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export function StoreCategoriesSection() {
  const { categories } = useApp();
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categories();
        setData(response.data.categories);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchData();
  }, [categories]);

  return (
    <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
      <div className='flex w-max space-x-4 p-4'>
        <Button variant='outline' className='flex-shrink-0'>
          All
        </Button>
        {data.map((category) => (
          <Button
            key={category.uuid}
            variant='outline'
            className='flex-shrink-0'
          >
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
      {message && <p className='text-red-500 p-2'>{message}</p>}
    </ScrollArea>
  );
}
