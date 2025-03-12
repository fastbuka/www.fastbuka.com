'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useApp } from '@/hooks/app';
import { Skeleton } from '@radix-ui/themes';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Vendor {
  id: string;
  uuid: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  opening_time: string;
  closing_time: string;
  profile: string | null;
  cover: string | null;
  email: string | null;
  contact: string | null;
  latitude: number | null;
  longitude: number | null;
  location: string | null;
  featured: number;
  ratings: number;
  balance: number;
  is_online: boolean;
  status: string;
  category: string | null;
  slug: string;
  user_uuid: string;
  createdAt: string;
  updatedAt: string;
}

export function StoreFeedSection() {
  const { vendors } = useApp();
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  

  const fetched = useRef(false);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await vendors();
        console.log("vendors:", response.data.vendors);
        setData(response.data.vendors);
      } catch (error) {
        setMessage('Failed to load categories');
      } finally {
        setLoading(false);
        fetched.current = true;
      }
    };

    if (!fetched.current){
      fetchData();
    }
  }, [vendors]);


  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {loading
        ? Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className='group block overflow-hidden rounded-lg border transition-shadow hover:shadow-md'
            >
              <div className='bg-slate-100 aspect-video overflow-hidden'>
                <img
                  src='/svg/placeholder.svg'
                  alt='alt'
                  className='h-full w-full object-cover transition-transform group-hover:scale-105'
                />
              </div>
              <div className='p-4'>
                <Skeleton width='50%' height='20px' />
                <div className='mt-1 flex items-center gap-1'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <Skeleton width='20%' height='20px' />
                </div>
              </div>
            </div>
          ))
        : data.map((store) => (
          <Link href={`/stores/${store.slug}`} aria-label={`View ${store.name}`}>
      <Card className='overflow-hidden hover:shadow-md transition-shadow'>
        <div className='bg-slate-100 h-48'>
          <Image
            className='object-cover h-full w-full'
            src={store.profile || '/svg/placeholder.svg'}
            onError={(e) => {
              e.currentTarget.src = '/svg/placeholder.svg';
            }}
            alt={store.name}
            width={200}
            height={200}
          />
        </div>
        <div className='h-26 p-4'>
          <CardContent className='p-0'>
            <h3 className='text-lg font-semibold mb-2'>{store.name}</h3>
            <Badge variant='secondary' className='mb-2'>
              {store.category}
            </Badge>
            <div className='flex items-center text-sm text-gray-600'>
              <Star className='w-4 h-4 text-yellow-400 mr-1' />
              <span>{store.ratings}</span>
            </div>
          </CardContent>
          {/* <CardFooter className='flex justify-between text-sm text-gray-600 p-0'>
            <span>{store.deliveryTime}</span>
            <span>{store.distance}</span>
          </CardFooter> */}
        </div>
      </Card>
    </Link>
        ))}
    </div>
  );
}
