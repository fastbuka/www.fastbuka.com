import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
