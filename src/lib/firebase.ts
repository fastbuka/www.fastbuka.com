import { initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";
import { toast } from "sonner";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let messaging: Messaging | null = null;

export const getDeviceToken = async (): Promise<string | null> => {
  try {
    if (typeof window === "undefined") return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return null;
    }

    if (!messaging) {
      const app = initializeApp(firebaseConfig);
      messaging = getMessaging(app);
    }

    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return currentToken || null;
  } catch (error) {
    console.error("Error retrieving device token:", error);
    toast.error("Error retrieving device token");
    return null;
  }
};
