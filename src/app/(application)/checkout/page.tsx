'use client';

import { useState, useEffect, useRef } from 'react';
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
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useFastBukaContext } from '@/context';
import { useToast } from '@/hooks/Partials/use-toast';


const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries: ('places')[] = ['places'];

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
  const { location } = useFastBukaContext();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const [outOfStockItems, setOutOfStockItems] = useState<string[]>([]);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [orderUuid, setOrderUuid] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await profile();
      if (response.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    };
    fetchProfile();
  }, [profile]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.profile.first_name || '',
      lastName: user?.profile.last_name || '',
      email: user?.email || '',
      phone: user?.contact || '',
      address: '',
    },
  });

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (user && isFirstLoad.current) {
      form.reset({
        firstName: user.profile?.first_name || '',
        lastName: user.profile?.last_name || '',
        email: user.email || '',
        phone: user.contact || '',
      });
      isFirstLoad.current = false;
    }
  }, [user, form]);

  // Set initial coordinates from shared state
  useEffect(() => {
    if (location.coordinates.latitude && location.coordinates.longitude) {
      setLatitude(location.coordinates.latitude);
      setLongitude(location.coordinates.longitude);
    }
  }, [location.coordinates]);

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

  // Set up autocomplete options based on shared location
  const autocompleteOptions = {
    fields: ['address_components', 'geometry', 'formatted_address'],
    strictBounds: false,
    types: ['address'],
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setOutOfStockItems([]);
    setShowOutOfStockModal(false);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }

    try {
  
      const response = await create({
        delivery_name: `${values.firstName} ${values.lastName}`,
        delivery_email: values.email,
        delivery_contact: values.phone,
        delivery_address: values.address,
        latitude: latitude || 0,
        longitude: longitude || 0,
        cartItems: cart,
      });

    

      
      if (response.success && response.data) {
        if (!response.data?.outOfStockItems || response.data?.outOfStockItems.length === 0) {
          clearAllCartItems();
          router.push(`/checkout/${response.data.order.uuid}`);
        } else {
          setOrderUuid(response.data.order?.uuid || null);
          setOutOfStockItems(response.data?.outOfStockItems);
          setShowOutOfStockModal(true);
        }
      }
    } catch (error: any) {
      // console.error('Checkout error:', error);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: error.message || 'Something went wrong during checkout',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleContinueOrder() {
    setShowOutOfStockModal(false);
    if (orderUuid) {
      router.push(`/checkout/${orderUuid}`);
    }
  }

  return (
    <>
      {/* Out-of-Stock Items Modal */}
      <Dialog open={showOutOfStockModal} onOpenChange={setShowOutOfStockModal}>
        <DialogContent>
          {orderUuid ? (
            <DialogTitle>Some Items Are Out of Stock</DialogTitle>
          ): (
            <DialogTitle>All Items Are Out of Stock</DialogTitle>
          )}
          <DialogDescription>
            The following items are out of stock. You can proceed with the available items or cancel the order.
          </DialogDescription>
          <ul className="mt-4 list-disc list-inside text-red-600">
            {outOfStockItems.map((item: any, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOutOfStockModal(false)}>Cancel Order</Button>
            {orderUuid && (
              <Button onClick={handleContinueOrder}>Continue with Available Items</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Form */}
      <CheckoutLayout>
        <div className="mb-8">
          <Progress value={50} className="bg-green-500 h-2" />
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Delivery Information</h1>
            <p className="text-gray-500">Please enter your delivery details</p>
          </div>

          {GOOGLE_MAPS_API_KEY && (
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <Input placeholder="John" {...form.register('firstName')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" {...form.register('lastName')} />
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
                  <label className="block text-sm font-medium">Delivery Address</label>
                  <Autocomplete 
                    onLoad={(auto) => setAutocomplete(auto)} 
                    onPlaceChanged={handlePlaceSelect}
                    options={autocompleteOptions}
                  >
                    <Input 
                      placeholder={location.address !== 'Fetching location...' ? `Search address in ${location.address}...` : "Search address..."} 
                      {...form.register('address')} 
                    />
                  </Autocomplete>
                </div>

                <Button disabled={loading} type="submit" className="bg-green-500 w-full">
                  {loading ? <Loader2 className="animate-spin" /> : 'Continue to Payment'}
                </Button>
              </form>
            </LoadScript>
          )}
        </div>
      </CheckoutLayout>
    </>
  );
}