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
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? data : data.slice(0, 6);

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
    <section className='py-12'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-8 text-2xl font-bold'>What do you need?</h2>
        {message && <p className='text-red-500'>{message}</p>}
        <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6'>
          {visibleCategories.map((category) => (
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
                    e.currentTarget.src = '/svg/placeholder.svg';
                  }}
                  alt={category.name}
                  width={200}
                  height={200}
                />
              </div>
              <span className='text-sm font-medium'>{category.name}</span>
            </Link>
          ))}
        </div>
        {data.length > 6 && (
          <div className='mt-4 text-center'>
            <button
              onClick={() => setShowAll(!showAll)}
              className='text-green-600 hover:underline'
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
