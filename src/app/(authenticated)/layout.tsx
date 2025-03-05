'use client';

import { useUser } from '@/hooks/users';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/hooks/websocket';
import { useToast } from '@/hooks/Partials/use-toast';
import { User } from '@/types/user';


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const socket = useSocket();
  const { toast } = useToast()
  const { profile } = useUser();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if(!socket) return;
    socket.on(`user.${user?.uuid}`, (data) => {
      toast({ variant: data.variant, title: data.title, description: data.message });
    });
    return () => {
      socket.off('message');
    };  
  }, [socket]);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile();
        if (response.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profile, router]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} pathname={pathname} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbPage>{user?.profile?.first_name}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem className='capitalize'>
                  <BreadcrumbLink href={pathname}>
                    {pathname.replace(/^\//, '')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className='flex-1 overflow-x-hidden bg-gray-100'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
