'use client';

import { Card } from '@/components/ui/card';
import { Meal } from '@/lib/meal.interface';
import { useGetTrendingMeals } from '@/queries/frontPage';
import { FiClock } from 'react-icons/fi';
import Link from 'next/link';
import { reduceImageWidth } from '@/utils/reduceImageWidth';
import { Skeleton } from '@radix-ui/themes';
import { Alert, AlertDescription } from './ui/alert';
import { TriangleAlert } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface TrendingMealsProps {
  title?: string;
  subtitle?: string;
}

export default function TrendingMeals({
  title = 'Trending Meals',
  subtitle = 'Nutritious meals from our top restaurants you would love',
}: TrendingMealsProps) {
  const { data: meals, isLoading, isFetching, error } = useGetTrendingMeals();
  const { addToCart } = useCart();

  if (error) {
    console.error(error);
    return (
      <Alert variant='destructive' className='mx-auto'>
        <TriangleAlert color='red' size={28} className='mx-4' />
        <AlertDescription>
          Failed to load meals. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  const handleAddToCart = (meal: Meal) => {
    if (!meal) return;
    addToCart({ ...meal, quantity: 1 });
  };
  // Loading skeleton array
  const skeletonArray = Array.from({ length: 4 }) as Array<Meal | undefined>;

  return (
    <section className='py-10 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold'>
          <Skeleton loading={isLoading || isFetching}>{title}</Skeleton>
        </h2>
        <p className='hidden sm:block sm:text-center sm:text-gray-600 sm:max-w-2xl sm:mx-auto sm:mb-12'>
          <Skeleton loading={isLoading || isFetching}>{subtitle}</Skeleton>
        </p>
        <a href='#' className='text-green-500 flex items-center space-x-2'>
          <Skeleton loading={isLoading}>
            <span>See more</span>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 010-1.4l7-7a1 1 0 111.4 1.4L5.41 9H17a1 1 0 010 2H5.41l5.29 5.29a1 1 0 01-1.41 1.41z'
                clipRule='evenodd'
                transform='scale(-1, 1) translate(-20, 0)'
              />
            </svg>
          </Skeleton>
        </a>
      </div>

      {/* Horizontal scroll wrapper */}
      <div className='flex overflow-x-auto pb-6 space-x-6 scroll-hidden'>
        {(isLoading || isFetching ? skeletonArray : meals || []).map(
          (meal, index) =>
            meal ? (
              <div key={index} className='shrink-0 w-80 relative rounded-lg'>
                <Card className='hover:shadow-lg transition-shadow duration-200'>
                  <Link key={meal.id} href={`/menu/${meal.uuid}`} passHref>
                    <div
                      className='relative m-2 rounded-md'
                      style={{ background: '#B0E8D4' }}
                    >
                      <img
                        src={reduceImageWidth(meal.image ?? 'images/logo.png')}
                        alt={meal.name}
                        className='h-40 w-full object-cover rounded-lg'
                        onError={(e) => {
                          e.currentTarget.src = 'images/logo.png';
                        }}
                      />
                      <span className='absolute top-2 left-2 bg-orange-400 text-white px-3 py-1 rounded-lg font-bold'>
                        ₦
                        {meal.price.toLocaleString('en-NG', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </Link>
                  <div className='p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className='text-sm font-semibold line-clamp-1'>
                        {meal.name.length > 20
                          ? meal.name.substring(0, 20) + '...'
                          : meal.name}
                      </h3>
                      <div className='flex items-center space-x-1 text-gray-500 text-xs'>
                        <FiClock />
                        <span>{meal.processing_time} mins</span>
                      </div>
                    </div>
                    <p className='text-sm text-gray-500 line-clamp-2'>
                      {meal.description.length > 30
                        ? meal.description.substring(0, 30) + '...'
                        : meal.description}
                    </p>
                    <button
                      onClick={() => handleAddToCart(meal)}
                      className='mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200'
                    >
                      Order Now
                    </button>
                  </div>
                </Card>
              </div>
            ) : (
              <div key={index} className='shrink-0 w-80 relative'>
                <Card className='hover:shadow transition-shadow duration-200'>
                  <div className='p-4 space-y-4'>
                    <Skeleton
                      width='100%'
                      height='192px'
                      className='rounded-lg'
                    />
                    <Skeleton width='80%' height='20px' />
                    <Skeleton width='60%' height='16px' />
                    <Skeleton
                      width='100%'
                      height='40px'
                      className='rounded-lg'
                    />
                  </div>
                </Card>
              </div>
            )
        )}
      </div>
    </section>
  );
}
