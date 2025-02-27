'use client';

import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  useCallback,
} from 'react';
import { useUser } from '@/hooks/users';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, User } from 'lucide-react';
import { AvatarUploadModal } from '@/components/AvatarUploadModal';
import Image from 'next/image';

interface User {
  email: string;
  contact: string;
  profile: {
    first_name: string;
    last_name: string;
    profile: string;
    address: string;
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function UserSettings() {
  const { profile, update } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await profile();
      if (response.success) {
        setUser(response.data.user);
        setAvatar(response.data.user?.profile.profile);
      }
    } finally {
      setLoading(false);
    }
  }, [profile]);
  console.log(user);

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, profile, fetchProfile]);

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await update({
        email: user?.email ?? '',
        contact: user?.contact ?? '',
        first_name: user?.profile.first_name ?? '',
        last_name: user?.profile.last_name ?? '',
        profile: avatar ?? '',
        address: user?.profile.address ?? '',
      });
      if (response.success) {
        fetchProfile();
        alert('Profile updated successfully!');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      if (!prevState) return null;

      if (name === 'email' || name === 'contact') {
        return { ...prevState, [name]: value };
      }

      return {
        ...prevState,
        profile: { ...prevState.profile, [name]: value },
      };
    });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      ) : (
        <CardContent>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className='space-y-3 py-3'
          >
            <div className='flex justify-end items-center'>
              <Button
                onClick={fetchProfile}
                variant='outline'
                size='sm'
                className='bg-white hover:bg-gray-100 transition-colors'
              >
                <RefreshCw className='mr-2 h-4 w-4' />
                Refresh
              </Button>
            </div>

            <motion.div variants={cardVariants}>
              <Card className='bg-white shadow-lg rounded-lg overflow-hidden'>
                <CardHeader>
                  <CardTitle className='text-2xl font-bold text-gray-800'>
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center space-x-4 mb-6'>
                    <div className='relative w-20 h-20'>
                      <Image
                        src={avatar || '/images/profile.png'}
                        alt='Profile'
                        className='rounded-full'
                        fill
                        onError={(e) => {
                          e.currentTarget.src = '/images/logo.png';
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => setIsAvatarModalOpen(true)}
                      className='bg-gray-200 text-gray-700 hover:bg-gray-300'
                    >
                      Change Avatar
                    </Button>
                  </div>

                  <form onSubmit={handleUpdateProfile}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          First Name
                        </label>
                        <Input
                          type='text'
                          name='first_name'
                          value={user?.profile.first_name || ''}
                          onChange={handleInputChange}
                          className='w-full'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Last Name
                        </label>
                        <Input
                          type='text'
                          name='last_name'
                          value={user?.profile.last_name || ''}
                          onChange={handleInputChange}
                          className='w-full'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Email
                        </label>
                        <Input
                          type='email'
                          name='email'
                          value={user?.email || ''}
                          onChange={handleInputChange}
                          className='w-full'
                          disabled
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Phone Number
                        </label>
                        <Input
                          type='tel'
                          name='contact'
                          value={user?.contact || ''}
                          onChange={handleInputChange}
                          className='w-full'
                        />
                      </div>
                    </div>

                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Address
                      </label>
                      <Input
                        type='text'
                        name='address'
                        value={user?.profile.address || ''}
                        onChange={handleInputChange}
                        className='w-full'
                      />
                    </div>

                    <Button
                      type='submit'
                      className='bg-green-600 text-white'
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className='bg-white shadow-lg rounded-lg overflow-hidden'>
                <CardHeader>
                  <CardTitle className='text-2xl font-bold text-gray-800'>
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Current Password
                        </label>
                        <Input type='password' className='w-full' />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          New Password
                        </label>
                        <Input type='password' className='w-full' />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Confirm New Password
                        </label>
                        <Input type='password' className='w-full' />
                      </div>
                    </div>
                    <Button className='bg-blue-600 text-white'>
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </CardContent>
      )}
      <AvatarUploadModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        avatar={avatar}
        setAvatar={setAvatar}
      />
    </AnimatePresence>
  );
}
