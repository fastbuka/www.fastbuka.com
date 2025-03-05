'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useOrder } from '@/hooks/order';
import { useCart } from '@/hooks/Partials/use-cart';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import CheckoutLayout from './Partials/CheckoutLayout';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { User } from '@/types/user';
import { useUser } from '@/hooks/users';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(11, 'Phone number must be at least 11 digits'),
  address: z.string().min(5, 'Please select a valid address'),
});

export default function CheckoutPage() {
  
  const router = useRouter();
  const { profile } = useUser();
  const { cart, clearAllCartItems } = useCart();
  const { create } = useOrder();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await profile();
      if (response.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    }
    fetchProfile();
  }, [profile]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.profile.first_name || '',
      lastName:  user?.profile.last_name || '',
      email:  user?.email || '',
      phone:  user?.contact || '',
      address: '',
    },
  });

  // useEffect(() => {
  //   if (user) {
  //     form.reset({
  //       firstName: user.profile?.first_name || '',
  //       lastName: user.profile?.last_name || '',
  //       email: user.email || '',
  //       phone: user.contact || '',
  //     });
  //   }
  // }, [user, form]);
  

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setLatitude(place.geometry.location?.lat() || null);
        setLongitude(place.geometry.location?.lng() || null);
        form.setValue('address', place.formatted_address || '');
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { firstName, lastName, email, phone, address } = values;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      setLoading(false);
      return;
    }

    try {
      const response = await create({
        delivery_name: `${firstName} ${lastName}`,
        delivery_email: email,
        delivery_contact: phone,
        delivery_address: address,
        // latitude: latitude,
        // longitude: longitude,
        cartItems: cart,
      });

      if (response.success && response.data?.order?.uuid) {
        clearAllCartItems();
        router.push(`/checkout/${response.data.order.uuid}`);
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Something went wrong during checkout');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CheckoutLayout>
      <div className='mb-8'>
        <Progress value={50} className='bg-green-500 h-2' />
      </div>
      <div className='space-y-8'>
        <div>
          <h1 className='text-2xl font-bold'>Delivery Information</h1>
          <p className='text-gray-500'>Please enter your delivery details</p>
        </div>

        {GOOGLE_MAPS_API_KEY && (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium'>First Name</label>
                  <Input placeholder='John' {...form.register('firstName')} />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Last Name</label>
                  <Input placeholder='Doe' {...form.register('lastName')} />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium'>Email</label>
                  <Input placeholder='john@example.com' type='email' {...form.register('email')} />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Phone Number</label>
                  <Input placeholder='08012345678' type='tel' {...form.register('phone')} />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium'>Delivery Address</label>
                <Autocomplete
                  onLoad={(auto) => setAutocomplete(auto)}
                  onPlaceChanged={handlePlaceSelect}
                >
                  <Input placeholder='Search address...' {...form.register('address')} />
                </Autocomplete>
              </div>

              <Button type='submit' className='bg-green-500 w-full'>
                {loading ? <Loader2 className='animate-spin' /> : 'Continue to Payment'}
              </Button>
            </form>
          </LoadScript>
        )}

      </div>
    </CheckoutLayout>
  );
}
