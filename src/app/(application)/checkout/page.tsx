'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useOrder } from '@/hooks/order';
import { useCart } from '@/hooks/Partials/use-cart';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Progress } from '@/components/ui/progress';
import CheckoutLayout from './Partials/CheckoutLayout';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(11, 'Phone number must be at least 11 digits'),
  address: z.string().min(5, 'Please select a valid address'),
});

const mockAddresses = [
  '123 Victoria Island, Lagos',
  '45 Allen Avenue, Ikeja',
  '78 Admiralty Way, Lekki Phase 1',
  '90 Adeola Odeku Street, Victoria Island',
  '321 Herbert Macaulay Way, Yaba',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearAllCartItems } = useCart();
  const { create } = useOrder();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressSearch, setAddressSearch] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  const filteredAddresses = mockAddresses.filter((address) =>
    address.toLowerCase().includes(addressSearch.toLowerCase())
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { firstName, lastName, email, phone, address } = values;
    try {
      const response = await create({
        delivery_name: `${firstName} ${lastName}`,
        delivery_email: email,
        delivery_contact: phone,
        delivery_address: address,
        cartItems: cart,
      });

      if (response.success) {
        clearAllCartItems();
        router.push(`/checkout/${response.data.order.uuid}`);
      } else {
        alert('something went wrong');
      }
    } catch (error) {
      alert('something went wrong');
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='John' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john@example.com'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='08012345678' type='tel' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          role='combobox'
                          className='w-full justify-between'
                        >
                          {field.value || 'Search address...'}
                          <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Command>
                          <CommandInput
                            placeholder='Search address...'
                            value={addressSearch}
                            onValueChange={setAddressSearch}
                          />
                          <CommandList>
                            <CommandEmpty>No address found.</CommandEmpty>
                            <CommandGroup>
                              {filteredAddresses.map((address) => (
                                <CommandItem
                                  key={address}
                                  onSelect={() => {
                                    form.setValue('address', address);
                                    setOpen(false);
                                  }}
                                >
                                  {address}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='bg-green-500 w-full'>
              {loading ? (
                <span>
                  <Loader2 className='animate-spin' />
                </span>
              ) : (
                <span>Continue to Payment</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </CheckoutLayout>
  );
}
