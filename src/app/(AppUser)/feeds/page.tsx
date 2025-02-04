import { StoreCategoriesSection } from '@/components/StoreCategoriesSection';
import { StoreFeedSection } from '@/components/StoreFeedSection';
import { Suspense } from 'react';

export default function MenuPage() {
  return (
    <div className='container mx-auto px-4 py-8 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8'>Feeds</h1>
      <StoreCategoriesSection />
      <div className='py-3'>
        <h1 className='text-3xl font-bold mt-8 mb-2'>Stores</h1>
        <Suspense fallback={<div>Loading stores...</div>}>
          <StoreFeedSection />
        </Suspense>
      </div>
      <div>
        <h1 className='text-3xl font-bold mt-8 mb-2'>Menu</h1>
        <Suspense fallback={<div>Loading stores...</div>}>
          <StoreFeedSection />
        </Suspense>
      </div>
    </div>
  );
}
