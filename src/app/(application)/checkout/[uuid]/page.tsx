'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOrder } from '@/hooks/order';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CheckoutLayout from '../Partials/CheckoutLayout';
import { Wallet, CreditCard, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useOrderPayment } from '@/hooks/payment';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/Partials/use-toast';

export default function PaymentPage() {
  const router = useRouter();
  const { order } = useOrder();
  const { payment } = useOrderPayment();  
  const pathname = usePathname();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [orderUuid, setOrderUuid] = useState<string | null>(null);
  const order_uuid = pathname.split('/').pop() || null;

  useEffect(() => {
    if (!order_uuid) return;

    const fetchOrder = async () => {
      const response = await order({ order_uuid });
      if (response.success) {
        setOrderDetails(response.data.order);
        setOrderUuid(response.data.order.uuid);
      }
    };

    fetchOrder();
  }, [order, order_uuid]);

  const handlePayment = async () => {
    setIsLoading(true);
    if (!orderUuid) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid order",
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await payment(orderUuid);
      if (response?.message?.data?.message === 'Payment order created successfully') {
        toast({
          variant: "success",
          title: "Payment successful!",
          description: "Your payment has been successful!",
        });
        setIsLoading(false);
        router.push('/'); // Redirect to orders page
      } else if (response?.message?.data?.error === 'Not Found') {
        toast({
          variant: "destructive",
          title: "Wallet Error",
          description: "Activate your wallet, fund it and try again",
        });
        router.push('/wallet');
        setIsLoading(false);
      } else if (response?.message?.data?.error === 'Insufficient balance') {
        toast({
          variant: "destructive",
          title: "Insufficient balance",
          description: "Insufficient balance in your wallet",
        });
        router.push('/wallet');
        setIsLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response?.message?.data?.error || 'An error occurred',
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Payment error:', error?.message?.data?.error);
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error?.message?.data?.error || 'Payment failed. Please try again later.',
      });
      setIsLoading(false);
    }
  };

  if (!orderDetails) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='grid justify-items-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
          <p className='text-gray-500'>Your order is being processed...</p>
        </div>
      </div>
    );
  }

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
              {orderDetails.orderItems.map((item: any, index: number) => (
                <div key={index} className='space-y-2'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='font-medium'>{item.food.name}</p>
                      <p className='text-sm text-gray-500'>
                        Extras: {item.extras || 'None'}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium'>
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className='text-sm text-gray-500'>x{item.quantity}</p>
                    </div>
                  </div>
                  {index < orderDetails.orderItems.length - 1 && (
                    <Separator className='my-2' />
                  )}
                </div>
              ))}

              <Separator className='my-4' />

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal</span>
                  <span>₦{orderDetails.total_amount.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Delivery Fee</span>
                  <span>₦{orderDetails.delivery_charges.toLocaleString()}</span>
                </div>
                <Separator className='my-2' />
                <div className='flex justify-between font-semibold'>
                  <span>Total</span>
                  <span>₦{orderDetails.total_amount.toLocaleString()}</span>
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
                {/* <div className='flex items-center space-x-4 rounded-lg border p-4'>
                  <RadioGroupItem value='link' id='link' />
                  <Label htmlFor='link' className='flex items-center space-x-3'>
                    <CreditCard className='h-5 w-5' />
                    <span>Pay4me</span>
                  </Label>
                </div> */}
                {/* <div className='flex items-center space-x-4 rounded-lg border p-4'>
                  <RadioGroupItem value='exchange' id='exchange' />
                  <Label
                    htmlFor='exchange'
                    className='flex items-center space-x-3'
                  >
                    <RefreshCw className='h-5 w-5' />
                    <span>Pay with Exchange</span>
                  </Label>
                </div> */}
              </RadioGroup>
            </Card>

            <Button
              className='bg-green-500 w-full'
              size='lg'
              onClick={handlePayment}
            >
              Pay ₦{orderDetails.total_amount.toLocaleString()}
            </Button>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
