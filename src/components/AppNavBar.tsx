'use client';

import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useAuth } from '@/hooks/auth';
import { useUser } from '@/hooks/users';
import { useLocation } from '@/hooks/location';
import { useFastBukaContext } from '@/context';
import { useCart } from '@/hooks/Partials/use-cart';
import { useEffect, useState, useCallback } from 'react';
import { MapPin, Search, ShoppingBag, SidebarOpenIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function AppNavBar() {
  const { cart } = useCart();
  const { logout } = useAuth();
  const { profile } = useUser();
  const { addAddress, getAddress } = useLocation();
  const { location, setLocation } = useFastBukaContext();
  const [user, setUser] = useState<any | null>(null);

  // Fetch user profile once
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile();
        if (response.success) {
          setUser(response.data.user);
        } else {
          Cookies.remove('token');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfile();
  }, [profile]);

  // Fetch user location using Google Places API
  const fetchLocation = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          const city = addressComponents.find((comp: any) =>
            comp.types.includes('locality')
          )?.long_name;
          const country = addressComponents.find((comp: any) =>
            comp.types.includes('country')
          )?.long_name;

          const locationString =
            city && country ? `${city}, ${country}` : 'Location unavailable';

          setLocation({
            address: locationString,
            coordinates: {
              latitude,
              longitude,
            },
          });

          addAddress({
            name: 'Current Location',
            address: locationString,
            city: city || 'Unknown',
            state: city || 'Unknown',
            country: country || 'Nigeria',
            longitude,
            latitude,
          });
        } else {
          setLocation({
            address: 'Location unavailable',
            coordinates: {
              latitude: null,
              longitude: null,
            },
          });
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation({
          address: 'Unable to fetch location',
          coordinates: {
            latitude: null,
            longitude: null,
          },
        });
      }
    },
    [setLocation]
  );

  // Get user coordinates
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchLocation(coords.latitude, coords.longitude),
        (error) => {
          console.warn('Geolocation error:', error.message);
          setLocation({
            address: 'Location access denied',
            coordinates: {
              latitude: null,
              longitude: null,
            },
          });
        }
      );
    } else {
      setLocation({
        address: 'Geolocation not supported',
        coordinates: {
          latitude: null,
          longitude: null,
        },
      });
    }
  }, [fetchLocation]);

  function logOutAccount() {
    logout();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 pt-2">
            <Image src="/images/logo.png" alt="Logo" width={120} height={70} />
          </Link>
        </div>

        {/* Location & Search */}
        <div className="hidden flex-1 items-center gap-4 px-6 md:flex">
          <Button variant="ghost" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span className="text-sm">{location.address}</span>
          </Button>
          <div className="flex flex-1 items-center gap-2 rounded-full border bg-gray-50 px-4 py-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search restaurants or dishes"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>

          {/* Sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="flex items-center">
                <SidebarOpenIcon className="h-9 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid justify-between gap-3 h-full py-3">
                <div className="flex flex-col gap-3 py-3">
                  <Link href="/feeds" className="hover:text-green-600">
                    Browse feeds
                  </Link>
                  <Link href="/stores" className="hover:text-green-600">
                    Browse stores
                  </Link>
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link className="hover:text-green-600" href="/dashboard">
                        Dashboard
                      </Link>
                      <span
                        onClick={logOutAccount}
                        className="!text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        Logout
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link className="hover:text-green-600" href="/register">
                        Register
                      </Link>
                      <Link className="hover:text-green-600" href="/login">
                        Login
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <a
                    className="hover:text-green-600"
                    href="https://vendor.fastbuka.com"
                  >
                    Become a vendor
                  </a>
                  <a
                    className="hover:text-green-600"
                    href="https://rider.fastbuka.com"
                  >
                    Become a rider
                  </a>
                  <Link className="hover:text-green-600" href="/partner">
                    Partner with us
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
