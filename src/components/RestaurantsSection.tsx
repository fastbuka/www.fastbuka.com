'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useApp } from '@/hooks/app';
import { Star } from 'lucide-react';
import { Skeleton } from '@radix-ui/themes';

interface Restaurant {
  id: number;
  uuid: string;
  slug: string | null;
  user_uuid: string;
  cover: string;
  name: string;
  description: string;
  cac_number: string;
  country: string;
  state: string;
  city: string;
  address: string;
  ratings: string;
  opening_time: string;
  closing_time: string;
  createdAt: string;
  updatedAt: string;
}

export default function RestaurantsSection() {
  const { vendors } = useApp();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendors();
        setRestaurants(response.data.vendors);
      } catch (error) {
        setMessage('Failed to load categories');
      }
      setLoading(false);
    };

    fetchData();
  }, [vendors]);

  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <div className='container mx-auto px-4'>
        <div className='text-center pb-16'>
          <h2 className='text-2xl md:text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-green-700 leading-tight'>
            Top Stores
            <br />
            for Every Craving
          </h2>
          <p className='text-center mt-4 text-gray-600 max-w-3xl mx-auto text-md sm:text-xl'>
            Our vendors take pride in crafting dishes that are both healthy,
            tasty and irresisting. Get yours delivered at your doorstep by
            placing an order! Fast delivery is guaranteed!
          </p>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
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
            : restaurants.map((restaurant: Restaurant) => (
                <Link
                  key={restaurant.name}
                  href='#'
                  className='group block overflow-hidden rounded-lg border transition-shadow hover:shadow-md'
                >
                  <div className='bg-slate-100 aspect-video overflow-hidden'>
                    <img
                      className='h-full w-full object-cover transition-transform group-hover:scale-105'
                      src={restaurant.cover || '/svg/placeholder.svg'}
                      onError={(e) => {
                        e.currentTarget.src = '/svg/placeholder.svg';
                      }}
                      alt={restaurant.name}
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='font-semibold'>{restaurant.name}</h3>
                    <div className='mt-1 flex items-center gap-1'>
                      <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                      <span className='text-sm'>
                        {restaurant.ratings} ({restaurant.ratings})
                      </span>
                    </div>
                    {/* <p className='mt-1 text-sm text-gray-600'>
                      {restaurant.category} • {restaurant.is_online} min •{' '}
                      {restaurant.is_online} delivery
                    </p> */}
                  </div>
                </Link>
              ))}
        </div>
        <div className='text-center mt-8'>
          <Link
            href='/stores'
            className='inline-block px-6 py-3 text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors'
          >
            Browse stores
          </Link>
        </div>
      </div>
    </section>
  );
}
