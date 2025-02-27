'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResetError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setResetSuccess(true);
    } catch (error) {
      setResetError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-6 lg:p-8'>
      <Card className='max-w-md w-full shadow-lg'>
        <CardContent className='p-6 sm:p-8'>
          <CardHeader className='p-0 mb-6'>
            <div className='flex justify-center mb-6'>
              <Image
                src='/images/logo.png'
                alt='FastBuka Logo'
                width={150}
                height={50}
              />
            </div>
            <CardTitle className='text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
              Reset Password
            </CardTitle>
            <CardDescription className='text-center text-gray-600'>
              Let&apos;s verify it&apos;s you. Kindly enter your email.
            </CardDescription>
          </CardHeader>

          {resetError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant='destructive' className='mb-4'>
                <ExclamationTriangleIcon className='h-4 w-4' />
                <AlertDescription>{resetError}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {resetSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className='mb-4 border-emerald-600 text-emerald-600'>
                <CheckCircle className='h-4 w-4' />
                <AlertDescription>
                  Reset link sent successfully. Please check your email.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='h-12'
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type='submit'
              className='w-full h-12 bg-emerald-600 hover:bg-emerald-700'
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className='h-5 w-5 border-2 border-white border-t-transparent rounded-full'
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                />
              ) : (
                <>
                  Send reset link
                  <ArrowRight className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>

            <div className='text-center space-y-2'>
              <Button
                variant='link'
                className='text-emerald-600 hover:text-emerald-700 p-0'
                asChild
              >
                <a href='/login'>Back to login</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
