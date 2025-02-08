'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CheckoutLayout from '../Partials/CheckoutLayout';
import { Wallet, CreditCard, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const orderDetails = {
  items: [
    {
      name: 'Fried Fish and Jollof Rice',
      quantity: 2,
      price: 1500,
      extras: 'Water, Salad',
    },
    {
      name: 'Latte and Bread',
      quantity: 1,
      price: 1500,
      extras: 'Water, Salad',
    },
    {
      name: 'Pancake With Sliced Strawberry',
      quantity: 15,
      price: 1000,
      extras: 'Water, Salad',
    },
  ],
  subtotal: 19500,
  deliveryFee: 1000,
  total: 20500,
};

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  const handlePayment = () => {
    console.log('Processing payment with', paymentMethod);
  };

  return (
    <CheckoutLayout>
      <div className='mb-8'>
        <Progress value={90} className='bg-green-500 h-2' />
      </div>
      <div className='space-y-8'>
        <div>
          <h1 className='text-2xl font-bold'>Payment</h1>
          <p className='text-gray-500'>Choose your payment method</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
            <div className='space-y-4'>
              {orderDetails.items.map((item, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-sm text-gray-500'>
                        Extras: {item.extras}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium'>
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className='text-sm text-gray-500'>x{item.quantity}</p>
                    </div>
                  </div>
                  {index < orderDetails.items.length - 1 && (
                    <Separator className='my-2' />
                  )}
                </div>
              ))}

              <Separator className='my-4' />

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal</span>
                  <span>₦{orderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Delivery Fee</span>
                  <span>₦{orderDetails.deliveryFee.toLocaleString()}</span>
                </div>
                <Separator className='my-2' />
                <div className='flex justify-between font-semibold'>
                  <span>Total</span>
                  <span>₦{orderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          <div className='space-y-6'>
            <Card className='p-6'>
              <RadioGroup
                defaultValue={paymentMethod}
                onValueChange={setPaymentMethod}
                className='space-y-4'
              >
                <div className='flex items-center space-x-4 rounded-lg border p-4'>
                  <RadioGroupItem value='wallet' id='wallet' />
                  <Label
                    htmlFor='wallet'
                    className='flex items-center space-x-3'
                  >
                    <Wallet className='h-5 w-5' />
                    <span>Pay with Wallet</span>
                  </Label>
                </div>
                <div className='flex items-center space-x-4 rounded-lg border p-4'>
                  <RadioGroupItem value='link' id='link' />
                  <Label htmlFor='link' className='flex items-center space-x-3'>
                    <CreditCard className='h-5 w-5' />
                    <span>Pay with Link</span>
                  </Label>
                </div>

                <div className='flex items-center space-x-4 rounded-lg border p-4'>
                  <RadioGroupItem value='exchange' id='exchange' />
                  <Label
                    htmlFor='exchange'
                    className='flex items-center space-x-3'
                  >
                    <RefreshCw className='h-5 w-5' />
                    <span>Pay with Exchange</span>
                  </Label>
                </div>
              </RadioGroup>
            </Card>

            <Button
              className='bg-green-500 w-full'
              size='lg'
              onClick={handlePayment}
            >
              Pay ₦{orderDetails.total.toLocaleString()}
            </Button>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
