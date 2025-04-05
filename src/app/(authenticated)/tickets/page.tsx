// src/app/user/tickets/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';


export default function UserTickets() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleUpdate = async () => {};


  return (
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
            onClick={handleUpdate}
            variant='outline'
            size='sm'
            className='bg-white hover:bg-gray-100 transition-colors'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Create New Ticket</h2>
          <form onSubmit={handleSubmitTicket}>
            <Input
              type='text'
              placeholder='Subject'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className='mb-4'
            />
            <Textarea
              placeholder='Describe your issue...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='mb-4'
              rows={5}
            />
            <Button type='submit'>Submit Ticket</Button>
          </form>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold mb-4'>Your Tickets</h2>
          {/* Add list of user's tickets here */}
        </div>
      </motion.div>
    </CardContent>
  );
}
