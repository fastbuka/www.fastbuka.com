'use client';
import { useApp } from '@/hooks/app';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin, Phone } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { ItemFeedSection } from '@/components/ItemFeedSection';
import Image from 'next/image';

interface Vendor {
  id: string;
  uuid: string;
  slug: string;
  name: string;
  profile: string;
  category: string;
  ratings: number;
  deliveryTime: string;
  address: string;
  description: string;
  quantity: number;
  contact: string;
}

interface Product {
  id: number;
  uuid: string;
  name: string;
  price: number;
  image: string;
  profile: string;
  ratings: number;
  category: string;
  description: string;
  processing_time: string;
  food_uuid: string;
  quantity: number;
  vendor_uuid: string;
}

export default function StoreProfilePage() {
  const pathname = usePathname();
  const router = useRouter();
  const { vendor, products } = useApp();
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Vendor | null>(null);
  const [items, setItems] = useState<Product[]>([]);
  const [imageLoading, setImageLoading] = useState(true);

  const vendor_slug = pathname.split('/').pop() || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendor({
          vendor_slug,
        });
        setData(response?.data?.vendor);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchData();
  }, [vendor_slug, vendor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products({
          vendor_slug,
        });
        setItems(response?.data?.foods);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchData();
  }, [vendor_slug, products]);

  return (
    <div className='container mx-auto px-4 py-8 min-h-screen'>
      <CardContent>
        <div className='bg-slate-100 relative h-48 md:h-64 mb-5 rounded-lg overflow-hidden'>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 animate-pulse">
              <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            className='object-cover'
            src={data?.profile || '/svg/placeholder.svg'}
            alt={data?.name || 'Store profile'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onLoadingComplete={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              const img = document.querySelector('img');
              if (img) img.src = '/svg/placeholder.svg';
            }}
          />
        </div>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-5'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{data?.name}</h1>
            <Badge variant='secondary' className='mb-2'>
              {data?.category}
            </Badge>
            <div className='flex items-center text-sm text-gray-600 mb-2'>
              <Star className='w-4 h-4 text-yellow-400 mr-1' />
              <span className='mr-4'>{data?.ratings}</span>
              <Clock className='w-4 h-4 mr-1' />
              <span className='mr-4'>{data?.deliveryTime}</span>
              <MapPin className='w-4 h-4 mr-1' />
              {/* <span>{data?.distance}</span> */}10KM
            </div>
          </div>
          <Button 
            className='mt-4 md:mt-0' 
            onClick={() => router.push('/cart')}
          >
            Order Now
          </Button>
        </div>
        <p className='text-gray-700 mb-5'>{data?.description}</p>
        <div className='grid md:flex justify-start gap-4 mb-5'>
          <div className='flex items-center'>
            <MapPin className='w-5 h-5 mr-2 text-gray-600' />
            <span>{data?.address}</span>
          </div>
          <div className='flex items-center'>
            <Phone className='w-5 h-5 mr-2 text-gray-600' />
            <span>{data?.contact || '+2348000000000'}</span>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {items.map((item) => (
            <ItemFeedSection key={item.uuid} item={item} />
          ))}
        </div>
      </CardContent>
    </div>
  );
}
