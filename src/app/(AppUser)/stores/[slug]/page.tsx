'use client';
import { useApp } from '@/hooks/app';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/hooks/Partials/cart-funtions';

interface Vendor {
  id: string;
  uuid: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  ratings: number;
  deliveryTime: string;
  address: string;
  description: string;
  quantity: number;
}

interface Food {
  id: number;
  uuid: string;
  name: string;
  price: number;
  image: string;
  ratings: number;
  category: string;
  description: string;
  processing_time: string;
}

export default function StoreProfilePage() {
  const pathname = usePathname();
  const { addToCart } = useCart();
  const { vendor, products } = useApp();
  const [message, setMessage] = useState('');
  const [data, setData] = useState<Vendor | null>(null);
  const [items, setItems] = useState<Food[]>([]);

  const vendor_slug = pathname.split('/').pop() || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vendor({
          vendor_slug,
        });
        setData(response.data.vendor);
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
        setItems(response.data.foods);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchData();
  }, [vendor_slug, products]);

  function submitTOCart(item: any) {
    addToCart(item);
    setMessage(`${item.name} added to cart!`);
  }

  return (
    <div className='container mx-auto px-4 py-8 min-h-screen'>
      <CardContent>
        <div className='bg-slate-100 relative h-64 mb-5 rounded-lg overflow-hidden'>
          <img
            className='object-cover'
            src={data?.image || '/svg/placeholder.svg'}
            onError={(e) => {
              e.currentTarget.src = '/svg/placeholder.svg';
            }}
            alt={data?.name}
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
          <Button className='mt-4 md:mt-0'>Order Now</Button>
        </div>
        <p className='text-gray-700 mb-5'>{data?.description}</p>
        <div className='grid md:grid-cols-2 gap-4 mb-5'>
          <div className='flex items-center'>
            <MapPin className='w-5 h-5 mr-2 text-gray-600' />
            <span>{data?.address}</span>
          </div>
          {/* <div className='flex items-center'>
            <Phone className='w-5 h-5 mr-2 text-gray-600' />
            <span>{data?.phone}</span>
          </div> */}
        </div>

        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {items.map((item) => (
            <div key={item.uuid}>
              <Card>
                <div className='bg-slate-100 relative h-56'>
                  <img
                    className='h-full w-full object-cover'
                    src={item.image || '/svg/placeholder.svg'}
                    onError={(e) => {
                      e.currentTarget.src = '/svg/placeholder.svg';
                    }}
                    alt={item.name}
                  />
                </div>
                <div className='px-4'>
                  <h3 className='text-lg font-semibold mb-2'>{item.name}</h3>
                  <Badge variant='secondary' className='mb-2'>
                    {item.category}
                  </Badge>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Star className='w-4 h-4 text-yellow-400 mr-1' />
                    <span>{item.ratings}</span>
                  </div>
                </div>
                <div className='flex justify-between items-center px-4 text-sm text-gray-600'>
                  <div className='flex flex-cols gap-2'>
                    <span>{item.processing_time}Min</span>
                    <span>{/* <span>{data?.distance}</span> */}10KM</span>
                  </div>
                  <div className='p-4 flex justify-between text-sm text-gray-600'>
                    <Button onClick={() => submitTOCart(item)}>
                      Add to cart
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
}
