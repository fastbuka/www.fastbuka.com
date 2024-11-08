// src/app/user/wallet/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getToken } from "@/utils/token";
import { Wallet, CreditCard, RefreshCcw, Check, Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function UserWallet() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [isCopied, setIsCopied] = useState(false)

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!getToken());
  const router = useRouter()

  const handleTopUp = (method: string) => {
    // Implement top-up logic here
    console.log(`Top up ${amount} via ${method}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 4000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <>
      {isUserLoggedIn ? (
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-6">Your Wallet</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <Wallet className="h-8 w-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-semibold">Balance: ₦50,000.00</h2>
              
            </div>
            
            <button
                    onClick={copyToClipboard}
                    className="focus:outline-none flex "
                    aria-label="Copy mint hash"
                  >
                    0x33300000
                    {isCopied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
          
            
            <p className="text-gray-600 mb-4">
              Top up your wallet to order from your favorite restaurants.
            </p>

            <div className="mb-4">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleTopUp("Solana")}
                  className="flex items-center justify-center"
                >
                  <img
                    src="/images/ngnc.png"
                    alt="Solana"
                    className="h-5 w-5 mr-2"
                  />
                  Top-Up with NGNC (Stellar)
                </Button>
                <Button
                  onClick={() => handleTopUp("Paystack")}
                  className="flex items-center justify-center"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Top-Up with Paystack
                </Button>
                <Button
                  onClick={() => handleTopUp("Flutterwave")}
                  className="flex items-center justify-center"
                >
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
      ) : (
          <>
        <Alert variant={"warning"} className="mb-4">
          <AlertDescription>
            You must be logged in to access this page
          </AlertDescription>
            </Alert>
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push("/auth/login")}>Login</button>
        </>
      )}
    </>
  );
}
