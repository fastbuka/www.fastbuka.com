'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/users';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface User {
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { profile } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile();
        if (response.success) {
          setUser(response.data.user);
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load user profile. Please try again.',
          variant: 'destructive',
        });
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profile, router, toast]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className='flex h-screen bg-gray-100'>
        <AppSidebar user={user} />
        <main className='flex-1 overflow-x-hidden bg-gray-100'>
          <div className='container mx-auto px-6 pt-16 pb-9'>{children}</div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
