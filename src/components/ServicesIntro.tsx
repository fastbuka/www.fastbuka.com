'use client';
import Link from 'next/link';

export default function ServicesIntro() {
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
