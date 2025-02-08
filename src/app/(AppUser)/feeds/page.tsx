'use client';
import { Suspense, useEffect, useState } from 'react';
import { StoreFeedSection } from '@/components/StoreFeedSection';
import { ProductsFeedSection } from '@/components/ProductsFeedSection';
import { StoreCategoriesSection } from '@/components/StoreCategoriesSection';
import { useApp } from '@/hooks/app';
import { CardContent } from '@/components/ui/card';

interface Product {
  uuid: string;
  name: string;
  price: number;
  image: string;
  ratings: number;
  category: string;
  description: string;
  processing_time: string;
  item_uuid: string;
  vendor_uuid: string;
  quantity: number;
}

export default function TrendingPage() {
  const { trending } = useApp();
  const [message, setMessage] = useState('');
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await trending();
        setItems(response.data.food);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchData();
  }, [trending]);


  return (
    <div className='container mx-auto px-4 py-8 min-h-screen'>
      <CardContent>
        <h1 className='text-3xl font-bold mb-8'>Feeds</h1>
        <StoreCategoriesSection />
        <div className='py-3'>
          <h1 className='text-3xl font-bold mt-8 mb-2'>Stores</h1>
          <Suspense fallback={<div>Loading stores...</div>}>
            <StoreFeedSection />
          </Suspense>
        </div>
        <div>
          <h1 className='text-3xl font-bold mt-8 mb-2'>Trending</h1>
          <Suspense fallback={<div>Loading stores...</div>}>
            <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {items.map((item) => (
                <ProductsFeedSection key={item.uuid} item={item} />
              ))}
            </div>
          </Suspense>
        </div>
      </CardContent>
    </div>
  );
}
