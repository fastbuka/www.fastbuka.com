import Link from 'next/link';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StoreFeedItemProps {
  store: {
    id: number;
    uuid: string;
    slug: string;
    name: string;
    image: string;
    category: string;
    ratings: number;
    deliveryTime: string;
    distance: string;
  };
}

export function StoreFeedItem({ store }: StoreFeedItemProps) {
  return (
    <Link href={`/stores/${store.slug}`} aria-label={`View ${store.name}`}>
      <Card className='overflow-hidden hover:shadow-md transition-shadow'>
        <div className='bg-slate-100 h-48'>
          <img
            className='object-cover h-full w-full'
            src={store.image || '/svg/placeholder.svg'}
            onError={(e) => {
              e.currentTarget.src = '/svg/placeholder.svg';
            }}
            alt={store.name}
          />
        </div>
        <div className='h-26 p-4'>
          <CardContent className='p-0'>
            <h3 className='text-lg font-semibold mb-2'>{store.name}</h3>
            <Badge variant='secondary' className='mb-2'>
              {store.category}
            </Badge>
            <div className='flex items-center text-sm text-gray-600'>
              <Star className='w-4 h-4 text-yellow-400 mr-1' />
              <span>{store.ratings}</span>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between text-sm text-gray-600 p-0'>
            <span>{store.deliveryTime}</span>
            <span>{store.distance}</span>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
