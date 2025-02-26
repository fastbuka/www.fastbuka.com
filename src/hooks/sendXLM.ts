import { backend } from '@/lib/axios';

export const useSendXLM = () => {
  const sendXLM = async (userUuid: string) => {
    const response = await backend.post(`/api/auth/sendXLM/${userUuid}`);
  };
};