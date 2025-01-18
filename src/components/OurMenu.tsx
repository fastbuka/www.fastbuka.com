'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiClock, FiSearch, FiSliders } from 'react-icons/fi';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useGetOtherMeals } from '@/queries/frontPage';
import { Meal } from '@/lib/meal.interface';
import { reduceImageWidth } from '@/utils/reduceImageWidth';

interface OurMenuProps {
  title?: string;
  subtitle?: string;
}

export default function OurMenu({
  title = 'Our Restaurant',
  subtitle = 'Amazing wide variety of nutritious meals: pasta, rice, grilled chicken, turkey & much more.',
}: OurMenuProps) {
  const { data: our_menu, isLoading, error } = useGetOtherMeals();

  const [visibleMeals, setVisibleMeals] = useState(8); // Initially show 8 items
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Load more meals when 'See More' is clicked
  const loadMoreMeals = () => {
    setVisibleMeals((prevVisible) => prevVisible + 8); // Load 8 more items per click
  };

  if (isLoading) {
    return <h2>Loading our menu...</h2>;
  }

  if (error) {
    return <h2>Failed to get menu. Please try again</h2>;
  }

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceRange([0, parseInt(event.target.value)]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <section className='py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <h2 className='text-3xl font-bold text-center mb-8'>{title}</h2>
      <p className='text-center text-gray-600 max-w-2xl mx-auto mb-12'>
        {subtitle}
      </p>

      {/* Price Range, Search, and Sorting */}
      <div className='flex justify-between items-center mb-8 flex-wrap gap-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='flex items-center gap-2'>
              <FiSliders className='h-4 w-4' />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogTitle className='sr-only'>Filters</DialogTitle>
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <label htmlFor='price-range' className='font-semibold'>
                  Price range: ₦{priceRange[0]} - ₦{priceRange[1]}
                </label>
                <input
                  id='price-range'
                  type='range'
                  min='0'
                  max='50000'
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className='w-full'
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='sort' className='font-semibold'>
                  Sort by:
                </label>
                <select
                  id='sort'
                  className='border rounded px-4 py-2'
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value='default'>Default sorting</option>
                  <option value='price-low-high'>Price (low to high)</option>
                  <option value='price-high-low'>Price (high to low)</option>
                </select>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className='relative flex-grow max-w-md'>
          <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='search'
            placeholder='Search meals, restaurants...'
            className='border rounded-lg px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Meals Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {our_menu?.slice(0, visibleMeals).map((meal: Meal) => (
          <Link key={meal.id} href={`/menu/${meal.uuid}`} passHref>
            {/* {console.log("this is the meal uuid being clicked: ", meal.uuid)} */}
            <div
              key={meal.id}
              className='bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow duration-300'
            >
              <div className='relative w-full h-48 mb-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Image
                    src={reduceImageWidth(meal.image ?? 'images/logo.png')}
                    alt={meal.name}
                    width={250}
                    height={250}
                    objectFit='fill'
                    className='rounded-lg w-56 h-40 object-cover'
                    onError={(e) => {
                      e.currentTarget.src = 'images/logo.png';
                    }}
                  />
                </div>
                <span className='absolute top-2 left-2 bg-orange-400 text-white px-3 py-1 rounded-lg font-bold'>
                  ₦
                  {meal.price.toLocaleString('en-NG', {
                    minimumFractionDigits: 2,
                  })}
                </span>
                {/* No rating available in api */}

                <span className='absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-sm'>
                  {meal.ratings} ⭐
                </span>
              </div>
              <h3 className='text-md font-semibold mb-2'>
                {meal.name.length > 20
                  ? `${meal.name.substring(0, 25)}...`
                  : meal.name}
              </h3>
              <p className='text-gray-500 mb-4'>
                {meal.description.length > 20
                  ? `${meal.description.substring(0, 30)}...`
                  : meal.description}
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 text-gray-500'>
                  <FiClock />
                  <span>{meal.processing_time} mins</span>
                </div>
                <Button className='bg-green-500 text-white px-4 py-2 rounded-lg'>
                  Order
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* See More Button */}
      {/* using the non-null assertion operator (!) to assert that our_menu is not null or undefined for stupid typescript  or the conditional `&&` operator*/}
      {our_menu && visibleMeals < our_menu.length && (
        <div className='flex justify-center mt-12'>
          <Button
            onClick={loadMoreMeals}
            className='bg-transparent border border-green-500 text-green-500 px-12 py-6 rounded-lg w-64'
          >
            See More →
          </Button>
        </div>
      )}
    </section>
  );
}
