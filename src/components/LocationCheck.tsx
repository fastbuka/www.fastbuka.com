'use client';

import { useEffect, useState } from 'react';
import { useFastBukaContext } from '@/context';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';


// still yet to fix the allow location button
export default function LocationCheck() {
  const { location, setLocation } = useFastBukaContext();
  const [isLocationDenied, setIsLocationDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if location is denied
    if (location === 'Location access denied') {
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
          // Location permission granted
          const { latitude, longitude } = position.coords;
          
          // Fetch address from coordinates
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          )
            .then(response => response.json())
            .then(data => {
              if (data.status === 'OK' && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                const city = addressComponents.find((comp: any) => comp.types.includes('locality'))?.long_name;
                const country = addressComponents.find((comp: any) => comp.types.includes('country'))?.long_name;
                
                const locationString = city && country ? `${city}, ${country}` : 'Location available';
                setLocation(locationString);
                setIsLocationDenied(false);
              } else {
                setLocation('Location available');
                setIsLocationDenied(false);
              }
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Error fetching address:', error);
              setLocation('Location available');
              setIsLocationDenied(false);
              setIsLoading(false);
            });
        },
        (error) => {
          // Location permission denied
          console.error('Geolocation error:', error);
          setLocation('Location access denied');
          setIsLocationDenied(true);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocation('Geolocation not supported');
      setIsLocationDenied(true);
      setIsLoading(false);
    }
  };

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