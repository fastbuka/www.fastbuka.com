'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from './ui/skeleton';

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = [
  'places',
];

interface Store {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  rating: number;
  address: string;
  distance: string;
}

const mockStores: Store[] = [
  {
    id: '1',
    name: 'Golden Kitchen',
    position: { lat: 6.5244, lng: 3.3792 },
    rating: 4.5,
    address: '123 Allen Avenue, Ikeja',
    distance: '0.3 km',
  },
  {
    id: '2',
    name: 'Spice Hub',
    position: { lat: 6.5244, lng: 3.3892 },
    rating: 4.2,
    address: '456 Opebi Road, Ikeja',
    distance: '0.7 km',
  },
  {
    id: '3',
    name: 'Pizza Palace',
    position: { lat: 6.5144, lng: 3.3792 },
    rating: 4.8,
    address: '789 Adeola Odeku, Victoria Island',
    distance: '1.2 km',
  },
];

const StoresMapSection: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const locateUser = useCallback(() => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    locateUser();
  }, [locateUser]);

  const defaultCenter = { lat: 6.5244, lng: 3.3792 }; // Lagos coordinates

  return (
    <section className='py-12'>
      <div className='container mx-auto px-4'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Restaurants near you</h2>
          <Button
            onClick={locateUser}
            variant='outline'
            className='flex items-center gap-2'
            disabled={isLocating}
          >
            <MapPin className='h-4 w-4' />
            {isLocating ? 'Locating...' : 'Find my location'}
          </Button>
        </div>
        <div className='relative h-[400px] overflow-hidden rounded-xl border'>
          {!isLoaded ? (
            <Skeleton />
          ) : (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={userLocation || defaultCenter}
              zoom={14}
            >
              {/* User Location Marker */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: '/placeholder.svg?height=30&width=30',
                    scaledSize: new google.maps.Size(30, 30),
                  }}
                />
              )}

              {/* Store Markers */}
              {mockStores.map((store) => (
                <Marker
                  key={store.id}
                  position={store.position}
                  onClick={() => setSelectedStore(store)}
                />
              ))}

              {/* Store Info Window */}
              {selectedStore && (
                <InfoWindow
                  position={selectedStore.position}
                  onCloseClick={() => setSelectedStore(null)}
                >
                  <div className='max-w-[200px] p-2'>
                    <h3 className='font-semibold'>{selectedStore.name}</h3>
                    <p className='mt-1 text-sm text-gray-600'>
                      {selectedStore.address}
                    </p>
                    <div className='mt-2 flex items-center justify-between text-sm'>
                      <span className='text-yellow-500'>
                        ★ {selectedStore.rating}
                      </span>
                      <span className='text-gray-500'>
                        {selectedStore.distance}
                      </span>
                    </div>
                    <Button
                      className='mt-3 w-full bg-emerald-600 hover:bg-emerald-700'
                      size='sm'
                    >
                      Order Now
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoresMapSection;
