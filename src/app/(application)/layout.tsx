'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/users';
import { useSocket } from '@/hooks/websocket';
import { useToast } from '@/hooks/Partials/use-toast';
import AppNavBar from '@/components/AppNavBar';
import AppFooter from '@/components/AppFooter';
import { User } from '@/types/user';


export default function layout({ children }: { children: React.ReactNode }) {
  const socket = useSocket();
  const { toast } = useToast();
  const { profile } = useUser();
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
      const response = await profile();
      if (response.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    }
    fetchProfile();
  }, [profile]);

  return (
    <div>
      <AppNavBar />
      {children}
      <AppFooter />
    </div>
  );
}
