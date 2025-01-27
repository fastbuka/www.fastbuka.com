import Image from 'next/image';
import { Star, Clock, MapPin, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function getStoreData(id: string) {
  return {
    id,
    name: 'Golden Kitchen',
    image: '/placeholder.svg?height=300&width=800',
    category: 'Restaurant',
    rating: 4.5,
    deliveryTime: '20-30 min',
    distance: '1.2 km',
    address: '123 Main St, Lagos, Nigeria',
    phone: '+234 123 456 7890',
    description:
      'Serving delicious meals with a golden touch. Our kitchen brings you the best of local and international cuisine.',
  };
}

export default function StoreProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const store = getStoreData(params.id);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-slate-100 relative h-64 mb-8 rounded-lg overflow-hidden'>
        {/* <Image
          src={store.image || '/placeholder.svg'}
          alt={store.name}
          layout='fill'
          objectFit='cover'
        /> */}
      </div>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>{store.name}</h1>
          <Badge variant='secondary' className='mb-2'>
            {store.category}
          </Badge>
          <div className='flex items-center text-sm text-gray-600 mb-2'>
            <Star className='w-4 h-4 text-yellow-400 mr-1' />
            <span className='mr-4'>{store.rating}</span>
            <Clock className='w-4 h-4 mr-1' />
            <span className='mr-4'>{store.deliveryTime}</span>
            <MapPin className='w-4 h-4 mr-1' />
            <span>{store.distance}</span>
          </div>
        </div>
        <Button className='mt-4 md:mt-0'>Order Now</Button>
      </div>
      <p className='text-gray-700 mb-8'>{store.description}</p>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='flex items-center'>
          <MapPin className='w-5 h-5 mr-2 text-gray-600' />
          <span>{store.address}</span>
        </div>
        <div className='flex items-center'>
          <Phone className='w-5 h-5 mr-2 text-gray-600' />
          <span>{store.phone}</span>
        </div>
      </div>
    </div>
  );
}
