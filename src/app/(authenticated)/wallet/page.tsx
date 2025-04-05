"use client";

import Bridge from "@ngnc/bridge";
import { useUser } from "@/hooks/users";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  RefreshCw,
  Check,
  Copy,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaNairaSign } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSendXLM } from "@/hooks/sendXLM";
import { useAddTrustLine } from "@/hooks/addTrustLine";
import { set } from "react-hook-form";
import { useToast } from "@/hooks/Partials/use-toast";


interface Balance {
  balance: string;
  limit?: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
  asset_code?: string;
}

interface UserProfile {
  balances: Balance[];
  address: string;
  profile: {
    first_name: string;
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function UserWallet() {
  const router = useRouter();
  const { toast } = useToast();
  const { profile, wallet } = useUser();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [amount, setAmount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWalletActive, setIsWalletActive] = useState(false);
  const { sendXLM } = useSendXLM();
  const { addTrustLine } = useAddTrustLine();

  const fetchWallet = useCallback(async () => {
    setError(null);
  
    try {
      
      const response = await wallet();
      if (response.success && response.data?.wallet) {
        setUser(response.data.wallet);
        setIsWalletActive(true);
      } else {
        setIsWalletActive(false);
      }
    } catch (error) {
      console.error("Wallet fetch error:", error);
      setIsWalletActive(false);
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  const callWallet = useCallback(async () => {
    setIsWalletActive(false);
    try {
      await sendXLM();
      await addTrustLine();
      await fetchWallet();
      setIsWalletActive(true);
    } catch (err) {
      setError("Failed to enable wallet");
    }
  }, [fetchWallet, sendXLM, addTrustLine]);

  const enableWallet = useCallback(async () => {
    setLoading(true);
    try {
      await callWallet();
      setLoading(false);
    } catch (error) {
      setError("Failed to enable wallet");
      setLoading(false);
    }
    
  }, [callWallet]);

  // Always fetch wallet on mount
  useEffect(() => {
    if (isWalletActive == false) {
    fetchWallet();
    }
  }, [fetchWallet, isWalletActive]);

  const formattedAddress = user?.address
    ? `${user.address.slice(0, 4)}...${user.address.slice(-4)}`
    : "";

  const handleTopUp = (method: string) => {

    if (method === "ngn" && amount < 5000) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Amount must be at least 5000 NGN',
      });
      return;
    } else if (method === "usd" && amount < 5) {
      // 
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Amount must be at least 5 USD',
      });
      return;
    } else if (method !== "ngn" && method !== "usd" && method !== "exchange") {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid method',
      });
      return;
    }

    if (method === "exchange") {
      setIsModalOpen(true);
      return;
    }

    const widget = new Bridge({
      key: process.env.NEXT_PUBLIC_BRIDGE_KEY,
      type: "buy",
      currency: method,
      data: {
        amount: amount,
        network: "Stellar",
        wallet_address: user?.address,
        type: "buy",
      },
      onSuccess: (response: {}) => alert("Transaction successful")
    });
    widget.setup();
    widget.open();
  };

  const copyToClipboard = async () => {
    if (user?.address) {
      try {
        await navigator.clipboard.writeText(user.address);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 4000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const activateWallet = () => {
    setIsWalletActive(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        ) : (
          <CardContent>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="space-y-3 py-3"
            >
              <div className="flex justify-end items-center">
                <Button
                  onClick={fetchWallet}
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-100 transition-colors"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>

              <motion.div variants={cardVariants}>
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                  {isWalletActive == false ? (
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 mb-2 sm:mt-4">
                        Activating your wallet may incur future costs.
                      </p>
                      <Button
                        onClick={enableWallet}
                        variant="outline"
                        className="mt-4 text-lg"
                        disabled={loading || !isWalletActive}
                      >
                        Activate Wallet
                      </Button>
                    </div>
                  ) : (
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Wallet className="h-8 w-8 text-green-500 mr-3" />
                        <CardTitle className="text-2xl font-semibold">
                          Balance: ₦{Number(user?.balances?.[0]?.balance || 0)}
                        </CardTitle>
                      </div>

                      <div className="flex items-center mb-4">
                        <p className="text-gray-600 mr-2">Wallet Address:</p>
                        <button
                          onClick={copyToClipboard}
                          className="focus:outline-none flex items-center"
                          aria-label="Copy wallet address"
                        >
                          {formattedAddress}
                          {isCopied ? (
                            <Check className="w-5 h-5 text-green-500 ml-2" />
                          ) : (
                            <Copy className="w-5 h-5 ml-2" />
                          )}
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4">
                        Top up your wallet to order from your favorite
                        restaurants.
                      </p>

                      <div className="mb-4">
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="mb-2"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button
                            onClick={() => handleTopUp("ngn")}
                            className="flex items-center justify-center"
                          >
                            <FaNairaSign className="h-5 w-5 mr-2" />
                            Top-Up with NGN 
                          </Button>
                          {/* <Button
                            onClick={() => handleTopUp("usd")}
                            className="flex items-center justify-center"
                          >
                            <DollarSign className="h-5 w-5 mr-2" />
                            Top-Up with USD
                          </Button> */}
                          {/* <Button
                            onClick={() => handleTopUp("exchange")}
                            className="flex items-center justify-center"
                          >
                            <RefreshCw className="h-5 w-5 mr-2" />
                            Top-Up with Exchange
                          </Button> */}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      Transaction History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add transaction history table or list here */}
                    <p className="text-gray-600">No recent transactions.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </CardContent>
        )}

        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exchange Details</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center justify-between">
                    <p className="truncate max-w-xs">
                      Wallet Address: {formattedAddress}
                    </p>
                    <Button variant="ghost" onClick={copyToClipboard}>
                      {isCopied ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
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
      </AnimatePresence>
    </>
  );
}
