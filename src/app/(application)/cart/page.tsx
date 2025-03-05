'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/Partials/use-cart';
import { Button } from '@/components/ui/button';

interface CartItem {
  uuid: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const increase = (item: CartItem) => {
    increaseQuantity(item.uuid);
  };

  const decrease = (item: CartItem) => {
    decreaseQuantity(item.uuid);
  };

  const remove = (item: CartItem) => {
    removeFromCart(item.uuid);
  };

  return (
    <div className='container mx-auto px-4 py-8 min-h-screen'>
      <Link href='/feeds' className='flex items-center text-gray-600 mb-6'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 19l-7-7m0 0l7-7m-7 7h18'
          />
        </svg>
        Go to Feeds
      </Link>

      <h1 className='text-3xl font-bold mb-8'>Cart</h1>

      {cart.length === 0 ? (
        <div className='flex justify-center w-full'>
          <div className='bg-green-100 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Cart is empty</h2>
            <p className='text-gray-600'>
              Your cart is empty. Add items to your cart to continue.
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-grow'>
            {cart.map((item) => (
              <div
                key={item.uuid}
                className='flex items-center mb-6 bg-green-50 p-4 rounded-lg'
              >
                <div className='w-24 h-24 mr-4 relative flex-shrink-0'>
                  <img
                    src={item.image ?? '/svg/placeholder.svg'}
                    alt={item.name}
                    className='h-full w-full rounded-md'
                    onError={(e) => {
                      e.currentTarget.src = '/svg/placeholder.svg';
                    }}
                  />
                  <button
                    onClick={() => remove(item)}
                    className='absolute -top-2 -left-2 bg-red-500 rounded-full p-1 shadow-md'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 text-gray-50'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
                <div className='flex-grow'>
                  <h3 className='font-semibold text-lg'>{item.name}</h3>
                  <p className='text-gray-600 text-sm'> Chicken Republic</p>
                  <p className='text-gray-500 text-sm'>Extras: Water, Salad</p>
                  <p className='font-bold mt-1'>
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
                <div className='flex items-center'>
                  <button
                    onClick={() => decrease(item)}
                    className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600'
                  >
                    -
                  </button>
                  <span className='mx-3'>{item.quantity}</span>
                  <button
                    onClick={() => increase(item)}
                    className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600'
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='md:w-1/3'>
            <div className='bg-green-100 p-6 rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Subtotal</h2>
              <div className='flex justify-between mb-2'>
                <span>Summary</span>
                <span>₦{totalAmount.toLocaleString()}</span>
              </div>
              <div className='flex justify-between mb-2'>
                <span>Item count</span>
                <span>{itemCount}</span>
              </div>
              <div className='flex justify-between font-bold mt-4'>
                <span>Amount to pay</span>
                <span>₦{totalAmount.toLocaleString()}</span>
              </div>
              <a href='/checkout'>
                <Button className='w-full mt-6 bg-green-500 text-white rounded-full text-lg font-semibold'>
                  Checkout
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
