// src/app/user/wallet/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getToken, getUser } from '@/utils/token';
import { getProfile } from '@/utils/userProfile';
import {
  Wallet,
  CreditCard,
  RefreshCcw,
  Check,
  Copy,
  DollarSign,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/queries/profile';
import { getDefaultAddress } from '@/utils/defaults';
import { FaNairaSign } from 'react-icons/fa6';
import Bridge from '@ngnc/bridge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function UserWallet() {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!getToken());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Set the wallet address directly from profile data when available
  useEffect(() => {
    const profile = getProfile();
    // console.log(profile)
    if (profile) {
      setAddress(profile.walletAddress);
      setBalance(profile.balance);
    }
  }, []);

  // Display only the first 4 and last 4 characters of the address
  const formattedAddress =
    address.length > 8
      ? `${getDefaultAddress(address).slice(0, 9)}...${getDefaultAddress(
          address
        ).slice(-9)}`
      : getDefaultAddress(address);

  const handleTopUp = (method: string) => {
    // Implement top-up logic here
    console.log(`Top up ${amount} via ${method}`);

    if (method === 'ngn' && amount < 5000) {
      alert('Amount must be at least 5000 NGN');
      return;
    } else if (method === 'usd' && amount < 5) {
      alert('Amount must be at least 5 USD');
      return;
    } else if (method !== 'ngn' && method !== 'usd' && method !== 'exchange') {
      alert('Invalid method');
      return;
    }

    if (method === 'exchange') {
      setIsModalOpen(true);
      return;
    }

    const widget = new Bridge({
      key: process.env.NEXT_PUBLIC_BRIDGE_KEY,
      type: 'buy',
      currency: method,
      data: {
        amount: amount,
        network: 'Stellar',
        wallet_address: address,
        type: 'buy',
      },
      onSuccess: (response: {}) => alert('Transaction successful'),
      onLoad: () => console.log('Bridge widget loaded successfully'),
    });
    widget.setup();
    widget.open();
  };

  // copy wallet address to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 4000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      {isUserLoggedIn ? (
        <>
          <h1 className='text-2xl md:text-4xl font-bold mb-6'>Your Wallet</h1>

          <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
            <div className='flex items-center mb-4'>
              <Wallet className='h-8 w-8 text-green-500 mr-3' />
              <h2 className='text-2xl font-semibold'>Balance: ₦{balance}</h2>
            </div>

            <button
              onClick={copyToClipboard}
              className='focus:outline-none flex '
              aria-label='Copy mint hash'
            >
              {formattedAddress}
              {isCopied ? (
                <Check className='w-5 h-5 text-green-500' />
              ) : (
                <Copy className='w-5 h-5' />
              )}
            </button>

            <p className='text-gray-600 mb-4'>
              Top up your wallet to order from your favorite restaurants.
            </p>

            <div className='mb-4'>
              <Input
                type='number'
                placeholder='Enter amount'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className='mb-2'
              />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Button
                  onClick={() => handleTopUp('ngn')}
                  className='flex items-center justify-center'
                >
                  <FaNairaSign className='h-5 w-5 mr-2' />
                  Top-Up with NGN (Links)
                </Button>
                <Button
                  onClick={() => handleTopUp('usd')}
                  className='flex items-center justify-center'
                >
                  <DollarSign className='h-5 w-5 mr-2' />
                  Top-Up with USD (Links)
                </Button>
                <Button
                  onClick={() => handleTopUp('exchange')}
                  className='flex items-center justify-center'
                >
                  <RefreshCcw className='h-5 w-5 mr-2' />
                  Top-Up with Exchange
                </Button>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>Transaction History</h2>
            {/* Add transaction history table or list here */}
          </div>
        </>
      ) : (
        <>
          <Alert variant={'warning'} className='mb-4'>
            <AlertDescription>
              You must be logged in to access this page
            </AlertDescription>
          </Alert>

          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => router.push('/auth/login')}
          >
            Login
          </button>
        </>
      )}

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exchange Details</DialogTitle>
              <DialogDescription>
                <div className='flex items-center justify-between'>
                  <p className='truncate max-w-xs'>Wallet Address: {formattedAddress}</p>
                  <Button variant='ghost' onClick={copyToClipboard}>
                  {isCopied ? (
                    <Check className='w-5 h-5 text-green-500' />
                  ) : (
                    <Copy className='w-5 h-5' />
                  )}
                  </Button>
                </div>
                <p>Network: Stellar</p>
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
