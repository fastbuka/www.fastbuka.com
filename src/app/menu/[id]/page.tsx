'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import BreadCrumb from '@/components/BreadCrumb'; // Correct import for BreadCrumb
import { OUR_MENU } from '@/constants';
import CustomDropdown from '@/components/ui/CustomDropdown';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useGetOtherMeals } from '@/queries/frontPage';
import { Meal } from '@/lib/meal.interface';

// Define the DropdownOption type
interface DropdownOption {
  id: number | string;
  name: string;
  [key: string]: number | string; // Allow for additional properties
}

export default function SingleMealPage() {
  const params = useParams<{ id: string }>();
  const uuid = params.id;
  const { data: our_menu, isLoading, error } = useGetOtherMeals();
  const meal = our_menu?.find((item: Meal) => item.uuid.toString() === uuid);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!meal) return;
    addToCart({ ...meal, quantity });
    router.push('/cart'); // Redirect to cart after adding
  };

  // Make a list of vendors from the OUR_MENU data
  // This code makes a list of all the vendors from the OUR_MENU data
  // It makes sure each vendor is only in the list once
  // It uses the vendor's uuid as the id and the vendor's name as the name
  const vendorOptions: DropdownOption[] = useMemo(() => {
    const vendors: Record<string, string> = {}; // Create an empty object to store the vendors
    our_menu?.forEach((item) => {
      if (vendors[item.category_uuid]) return; // If the vendor is already in the list, don't add it again
      vendors[item.category_uuid] = item.vendor.name; // Add the vendor to the list
    });
    // Make the list of vendors into an array of objects with id and name
    return Object.entries(vendors).map(([uuid, name]) => ({
      id: uuid,
      name,
    }));
  }, [our_menu]);

  const [selectedVendor, setSelectedVendor] = useState<DropdownOption>(
    vendorOptions[0]
  );

  const handleSelectVendorChange = (option: DropdownOption) => {
    setSelectedVendor(option);
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!meal) {
    return (
      <div className='flex flex-col items-center justify-center h-40'>
        <h2 className='text-lg'>404</h2>
        <span className='mt-3 px-4 py-2'>Item not found.</span>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <BreadCrumb
        items={[
          { name: 'Home', href: '/' },
          { name: meal.vendor.name, href: '/' },
          { name: 'Menu', href: '/menu' },
          { name: meal.name, href: `/menu/${uuid}` },
        ]}
        title='Our Menu'
      />
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {/* Meal Details Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-8'>
          <div className='relative w-full h-96 bg-green-200 rounded-[32px]'>
            <Image
              src={meal.image ?? 'images/logo.png'}
              alt={meal.name}
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
              onError={(e) => {
                e.currentTarget.src = 'images/logo.png';
              }}
            />
          </div>

          <div className='flex flex-col justify-between space-y-6'>
            <div className='sm:flex'>
              <div>
                <h1 className='text-4xl font-bold mb-4'>{meal.name}</h1>
                <p className='text-lg text-gray-600 mb-4'>{meal.description}</p>
                <span className='bg-green-500 text-white px-4 py-1 rounded-lg font-semibold'>
                  ₦
                  {meal.price.toLocaleString('en-NG', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              {/* <div className='pt-6 sm:pt-0'>
                <CustomDropdown
                  options={vendorOptions}
                  initialSelectedOption={selectedVendor}
                  onSelectChange={handleSelectVendorChange}
                />
              </div> */}
            </div>
            {/* <div>
              <label htmlFor='extras' className='font-semibold mb-2'>
                Extras:
              </label>
              <select
                id='extras'
                className='border rounded px-4 py-2 mb-6 w-full'
              >
                <option value=''>Select an extra...</option>
                <option value='drink'>Drink</option>
                <option value='sauce'>Extra Sauce</option>
              </select>
            </div> */}
            <div className='flex items-center space-x-4'>
              <button
                className='bg-transparent border border-gray-400 text-gray-700 rounded-full w-8 h-8'
                onClick={() => handleQuantityChange('decrement')}
              >
                -
              </button>
              <span className='text-lg font-semibold'>{quantity}</span>
              <button
                className='bg-green-500 text-white rounded-full w-8 h-8'
                onClick={() => handleQuantityChange('increment')}
              >
                +
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              className='bg-green-500 text-white py-3 rounded-lg w-full mt-6'
            >
              Add to Cart
            </Button>
            <div className='flex items-center space-x-4 mt-4'>
              <span className='text-gray-600'>Category:</span>
              <Link href='#' className='text-green-500 hover:underline'>
                Fastfood
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className='mt-16 bg-gray-100 p-8 rounded-lg'>
          <h2 className='text-2xl font-bold mb-4'>Reviews (0)</h2>
          <p className='text-gray-500'>There are no reviews yet.</p>
          <p className='text-gray-500'>
            Only logged in customers who have purchased this product may leave a
            review.
          </p>
        </div>

        {/* Other Dishes You'll Love */}
        <div className='mt-16'>
          <h2 className='text-3xl font-bold mb-8'>
            Other Dishes You&apos;ll Love
          </h2>
          <div className='flex overflow-x-auto pb-6 space-x-6 scroll-hidden'>
            {OUR_MENU.slice(0, 4).map((otherMeal) => (
              <Link
                key={otherMeal.id}
                href={`/menu/${otherMeal.id}`}
                className='shrink-0 w-[300px] relative'
              >
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                  <div
                    className='relative w-full h-48'
                    style={{ background: '#B0E8D4' }}
                  >
                    <Image
                      src={otherMeal.image ?? 'images/logo.png'}
                      alt={otherMeal.name}
                      width={250}
                      height={250}
                      objectFit='fill'
                      className='rounded-lg w-56 h-40 object-cover'
                      onError={(e) => {
                        e.currentTarget.src = 'images/logo.png';
                      }}
                      priority={otherMeal.id <= 4}
                    />
                    <span className='absolute top-2 left-2 bg-orange-400 text-white px-3 py-1 rounded-lg font-bold'>
                      ₦
                      {otherMeal.price.toLocaleString('en-NG', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className='p-4'>
                    <h3 className='text-sm font-semibold mb-2'>
                      {otherMeal.name}
                    </h3>
                    <p className='text-sm text-gray-500 line-clamp-2'>
                      {otherMeal.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Previous and Next Products Navigation */}
        <div className='flex justify-between items-center mt-16'>
          <Link href='#' className='text-green-500 flex items-center space-x-2'>
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
              />
            </svg>
            <span>Previous Product</span>
          </Link>
          <Link href='#' className='text-green-500 flex items-center space-x-2'>
            <span>Next Product</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a1 1 0 01-.7-.3l-7-7a 1 1 0 010-1.4l7-7a1 1 0 111.4 1.4L5.41 9H17a 1 1 0 010 2H5.41l5.29 5.29a1 1 0 01-1.41 1.41z'
                clipRule='evenodd'
                transform='scale(-1, 1) translate(-20, 0)'
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
