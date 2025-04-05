'use client';

import { useEffect, useState } from 'react';
import { useFastBukaContext } from '@/context';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export default function LocationCheck() {
  const { location, setLocation } = useFastBukaContext();
  const [isLocationDenied, setIsLocationDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if location is denied
    if (location.address === 'Location access denied') {
      setIsLocationDenied(true);
    } else {
      setIsLocationDenied(false);
    }
  }, [location]);

  const requestLocationPermission = () => {
    setIsLoading(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Location permission granted, but we don't need to fetch the address here
          // The AppNavBar component will handle that
          setLocation({
            address: 'Fetching location...',
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
          setIsLocationDenied(false);
          setIsLoading(false);
        },
        (error) => {
          // Location permission denied
          console.error('Geolocation error:', error);
          setLocation({
            address: 'Location access denied',
            coordinates: {
              latitude: null,
              longitude: null
            }
          });
          setIsLocationDenied(true);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocation({
        address: 'Geolocation not supported',
        coordinates: {
          latitude: null,
          longitude: null
        }
      });
      setIsLocationDenied(true);
      setIsLoading(false);
    }
  };

  // Only show the location check UI if location is denied
  if (!isLocationDenied) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Location Access Required</h1>
        <p className="text-gray-600 mb-6">
          FastBuka requires access to your location to provide you with the best experience. 
          Please enable location access to continue using the app.
        </p>
        <Button 
          onClick={requestLocationPermission} 
          className="bg-green-500 hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? 'Enabling...' : 'Enable Location Access'}
        </Button>
      </div>
    </div>
  );
} 