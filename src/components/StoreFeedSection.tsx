'use client';
import { useApp } from '@/hooks/app';
import { useEffect, useState } from 'react';
import { StoreFeedItem } from '@/components/StoreFeedItem';

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

export function StoreFeedSection() {
  const { vendors } = useApp();
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendors();
        setData(response.data);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchData();
  }, [vendors]);

  return (
    <div className='grid gap-6 md:grid-cols-4 min-h-screen'>
      {data.map((store) => (
        <StoreFeedItem key={store.id} store={store} />
      ))}
    </div>
  );
}
