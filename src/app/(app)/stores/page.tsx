import { Suspense } from 'react';
import { StoreCategoriesSection } from '@/components/StoreCategoriesSection';
import { StoreFeedSection } from '@/components/StoreFeedSection';
import { StoresSortOptions } from '@/components/StoresSortOptions';

export default function StoresPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Stores</h1>
      <StoreCategoriesSection />
      <div className='flex justify-end my-4'>
        <StoresSortOptions />
      </div>
      <Suspense fallback={<div>Loading stores...</div>}>
        <StoreFeedSection />
      </Suspense>
    </div>
  );
}
