'use client';
import { useApp } from '@/hooks/app';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  uuid: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesSection() {
  const { categories } = useApp();

  const [message, setMessage] = useState('');
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categories();
        console.log("Categories response", response);
        setData(response.data.categories);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchData();
  }, [categories]);

  return (
    <section className='py-12'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-8 text-2xl font-bold'>What do you need?</h2>
        {message && <p className='text-red-500'>{message}</p>}
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
          {data.map((category) => (
            <Link
              key={category.uuid}
              href='/'
              className='group flex flex-col items-center gap-3 rounded-lg p-4 transition-colors hover:bg-gray-50'
            >
              <div className='bg-slate-100 aspect-square w-full overflow-hidden rounded-lg'>
                <Image
                  className='h-full w-full object-cover transition-transform group-hover:scale-105'
                  src={category.image || '/svg/placeholder.svg'}
                  onError={(e) => {
                    console.log(`Failed to load image: ${e.currentTarget.src}`);
                    e.currentTarget.src = '/svg/placeholder.svg';
                  }}
                  alt={category.name}
                  fill
                />
              </div>
              <span className='text-sm font-medium'>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
