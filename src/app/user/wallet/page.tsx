// src/app/user/wallet/page.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, CreditCard, RefreshCcw } from 'lucide-react';

export default function UserWallet() {
  const [amount, setAmount] = useState('');

  const handleTopUp = (method: string) => {
    // Implement top-up logic here
    console.log(`Top up ${amount} via ${method}`);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-6">Your Wallet</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Wallet className="h-8 w-8 text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold">Balance: ₦50,000.00</h2>
        </div>
        <p className="text-gray-600 mb-4">Top up your wallet to order from your favorite restaurants.</p>
        
        <div className="mb-4">
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-2"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => handleTopUp('Solana')} className="flex items-center justify-center">
              <img src="/images/solana-logo.png" alt="Solana" className="h-5 w-5 mr-2" />
              Top-Up with Solana
            </Button>
            <Button onClick={() => handleTopUp('Paystack')} className="flex items-center justify-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Top-Up with Paystack
            </Button>
            <Button onClick={() => handleTopUp('Flutterwave')} className="flex items-center justify-center">
              <RefreshCcw className="h-5 w-5 mr-2" />
              Top-Up with Flutterwave
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {/* Add transaction history table or list here */}
      </div>
    </div>
  );
}