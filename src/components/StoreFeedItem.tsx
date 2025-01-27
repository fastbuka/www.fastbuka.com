import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StoreFeedItemProps {
  store: {
    id: string;
    uuid: string;
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
    <Link href={`/stores/${store.id}`}>
      <Card className='overflow-hidden hover:shadow-md transition-shadow'>
        <div className='bg-slate-100 relative h-48'>
          <Image
            src={store.image || '/svg/placeholder.svg'}
            alt={store.name}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <CardContent className='p-4'>
          <h3 className='text-lg font-semibold mb-2'>{store.name}</h3>
          <Badge variant='secondary' className='mb-2'>
            {store.category}
          </Badge>
          <div className='flex items-center text-sm text-gray-600'>
            <Star className='w-4 h-4 text-yellow-400 mr-1' />
            <span>{store.ratings}</span>
          </div>
        </CardContent>
        <CardFooter className='p-4 pt-0 flex justify-between text-sm text-gray-600'>
          <span>{store.deliveryTime}</span>
          <span>{store.distance}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
