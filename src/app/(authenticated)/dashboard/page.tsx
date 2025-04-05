"use client";

import { useUser } from "@/hooks/users";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Wallet, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notifications } from "@/components/Notifications";
import { useSendXLM } from "@/hooks/sendXLM";
import { useAddTrustLine } from "@/hooks/addTrustLine";

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
  activeOrders: number;
  completedOrders: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function DashboardCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div variants={cardVariants}>
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="flex items-center p-6">
          <div className={`rounded-full p-3 mr-4 ${color}`}>{icon}</div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-700">
              {title}
            </CardTitle>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function UserDashboard() {
  const { profile, wallet } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [walletEnabled, setWalletEnabled] = useState(false);
  const { sendXLM } = useSendXLM();
  const { addTrustLine } = useAddTrustLine();

  const fetchWallet = useCallback(async () => {
    setError(null);
   
    try {
      const response = await wallet();
      if (response?.success && response.data?.wallet) {
        setUser(response.data.wallet);
        setWalletEnabled(true);
      } 
    } catch (error) {
      console.error("Wallet fetch error:", error);
      setWalletEnabled(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  // Activate wallet when button is clicked
  const enableWallet = useCallback(async () => {
    setLoading(true);
    setWalletEnabled(false);
    try {
      await sendXLM();
      await addTrustLine();
      await fetchWallet(); // Refetch wallet after activation
      setWalletEnabled(true);
     
    } catch (err) {
      setError("Failed to enable wallet");
      setWalletEnabled(false);
    } finally {
      setLoading(false);
    }
  }, [fetchWallet, sendXLM, addTrustLine]);

  // Always fetch wallet on mount
  useEffect(() => {
    if (walletEnabled == false) {
    fetchWallet();
    }
  }, [fetchWallet, walletEnabled]);

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

              <div className="flex flex-1 flex-col gap-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  {walletEnabled == false ? (
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 mb-2 sm:mt-4">
                        Activating your wallet may incur future costs.
                      </p>
                      <Button
                        onClick={enableWallet}
                        variant="outline"
                        className="mt-4 text-lg"
                        disabled={loading || walletEnabled}
                      >
                        Activate Wallet
                      </Button>
                    </div>
                  ) : (
                    <DashboardCard
                      title={`Wallet Balance`}
                      value={Number(user?.balances?.[0]?.balance || 0)}
                      icon={<Wallet className="h-6 w-6 text-white" />}
                      color="bg-gradient-to-r from-green-400 to-green-600 aspect-video rounded-xl"
                    />
                  )}
                  <DashboardCard
                    title="Active Orders"
                    value={user?.activeOrders || 0}
                    icon={<AlertCircle className="h-6 w-6 text-white" />}
                    color="bg-gradient-to-r from-yellow-400 to-yellow-600 aspect-video rounded-xl"
                  />
                  <DashboardCard
                    title="Total Orders"
                    value={user?.completedOrders || 0}
                    icon={<ShoppingBag className="h-6 w-6 text-white" />}
                    color="bg-gradient-to-r from-blue-400 to-blue-600 aspect-video rounded-xl"
                  />
                </div>
              </div>

              <motion.div variants={cardVariants}>
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Notifications />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </CardContent>
        )}
      </AnimatePresence>
    </>
  );
}
