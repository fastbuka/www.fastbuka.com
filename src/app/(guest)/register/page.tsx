'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ApiError {
  response?: {
    status: number;
    data: {
      message?: string;
    };
  };
}

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      router.push('oard');
    }
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await register({ 
        name: name.trim(), 
        email: email.trim(), 
        password: password.trim() 
      });
      if (response.success) {
        setSuccess(true);
        router.push('/login');
      } else {
        if (response.message === "Request failed with status code 401") {
          setMessage("User email already exists");
        } else if (response.message === "Request failed with status code 400") {
          setMessage("Invalid credentials. Please try again.");
        } else {
          setMessage("Registration failed. Please try again later.");
        }
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.log("registration error: ", error);
    } finally {
      setLoading(false);
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
                Create an Account
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Sign up to start ordering from FastBuka
              </CardDescription>
            </CardHeader>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant='destructive' className='mb-4'>
                  <ExclamationTriangleIcon className='h-4 w-4' />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className='mb-4 border-emerald-600 text-emerald-600'>
                  <CheckCircle className='h-4 w-4' />
                  <AlertDescription>
                    Registration successful! Redirecting to login...
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleRegister} className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='Your Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='h-12'
                  disabled={loading}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='name@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-12'
                  disabled={loading}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Create a password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='h-12 pr-10'
                    disabled={loading}
                    required
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-12 px-3 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-gray-400' />
                    ) : (
                      <Eye className='h-4 w-4 text-gray-400' />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type='submit'
                className='w-full h-12 bg-emerald-600 hover:bg-emerald-700'
                disabled={loading}
              >
                {loading ? (
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
                    Create Account
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>

              <div className='text-center space-y-2'>
                <p className='text-gray-600'>
                  Already have an account?{' '}
                  <Button
                    variant='link'
                    className='text-emerald-600 hover:text-emerald-700 p-0'
                    asChild
                  >
                    <a href='/login'>Login</a>
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>

          {/* Right Side (Image) */}
          <div className='hidden md:block relative bg-emerald-50 rounded-r-lg overflow-hidden'>
            <div className='absolute bg-white' />
            <Image
              src='/svg/logo.svg'
              alt='Register illustration'
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
