'use client';

import type React from 'react';
import { motion } from 'framer-motion';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container max-w-3xl mx-auto py-8 px-4'>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
