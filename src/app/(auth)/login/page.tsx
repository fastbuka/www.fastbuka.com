'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
import Link from 'next/link';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoginSuccess(true);
      router.push('/dashboard');
    } catch (error) {
      setLoginError(
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-6 lg:p-8'>
      <Card className='max-w-4xl w-full shadow-lg'>
        <div className='grid md:grid-cols-2 gap-0'>
          {/* Left Side (Form) */}
          <CardContent className='p-6 sm:p-8'>
            <CardHeader className='p-0 mb-6'>
              <CardTitle className='text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                Welcome Back!
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Enter your login details below
              </CardDescription>
            </CardHeader>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant='destructive' className='mb-4'>
                  <ExclamationTriangleIcon className='h-4 w-4' />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {loginSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className='mb-4 border-emerald-600 text-emerald-600'>
                  <CheckCircle className='h-4 w-4' />
                  <AlertDescription>
                    Login successful! Welcome back.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className='space-y-6'>
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
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='h-12 pr-10'
                    disabled={isLoading}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-12 px-3 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-gray-400' />
                    ) : (
                      <Eye className='h-4 w-4 text-gray-400' />
                    )}
                  </Button>
                </div>
                <div className='flex justify-end'>
                  <Button
                    variant='link'
                    className='px-0 text-emerald-600 hover:text-emerald-700'
                    asChild
                  >
                    <a href='/forgot-password'>Forgot password?</a>
                  </Button>
                </div>
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
                    Sign In
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>

              <div className='text-center space-y-2'>
                <p className='text-gray-600'>
                  Don&apos;t have an account?{' '}
                  <Button
                    variant='link'
                    className='text-emerald-600 hover:text-emerald-700 p-0'
                    asChild
                  >
                    <Link href='/register'>Create an account</Link>
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>

          {/* Right Side (Image) */}
          <div className='hidden md:block relative bg-emerald-50 rounded-r-lg overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20' />
            <Image
              src='/svg/placeholder.svg'
              alt='Login illustration'
              width={600}
              height={600}
              className='w-full h-full object-cover'
              priority
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
