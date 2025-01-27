'use client';
import { useApp } from '@/hooks/app';
import { StoreFeedItem } from '@/components/StoreFeedItem';
import { useEffect, useState } from 'react';

export function StoreFeedSection() {
  interface Vendor {
    id: string;
    uuid: string;
    name: string;
    image: string;
    category: string;
    ratings: number;
    deliveryTime: string;
    distance: string;
  }

  const { vendors } = useApp();
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Vendor[]>([]);

  useEffect(() => {
    vendors({ setMessage, setData });
  }, [vendors]);

  return (
    <div className='grid gap-6 md:grid-cols-4 min-h-screen'>
      {data.map((store) => (
        <StoreFeedItem key={store.id} store={store} />
      ))}
    </div>
  );
}
