import BreadCrumb from '@/components/BreadCrumb';
import { StoreCategoriesSection } from '@/components/StoreCategoriesSection';
import { StoreFeedSection } from '@/components/StoreFeedSection';
import { Suspense } from 'react';

export default function MenuPage() {
  return (
    <>
      {/* <BreadCrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Feeds', href: '/feeds' },
        ]}
        title='Browse from top Restaurant'
      /> */}
      <div className='container mx-auto px-4 py-8 min-h-screen'>
        <h1 className='text-3xl font-bold mb-8'>Feeds</h1>
        <StoreCategoriesSection />
        <div className='py-3'>
          <Suspense fallback={<div>Loading stores...</div>}>
            <StoreFeedSection />
          </Suspense>
        </div>
      </div>
    </>
  );
}
