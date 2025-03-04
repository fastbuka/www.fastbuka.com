import { backend } from '@/lib/axios';

export const useOrderPayment = () => {
    const payment = (orderUuid: string) => {
        return backend.post(`/api/payment/order/${orderUuid}`)
            .then(response => {
                if (response.data.success) {
                    return {
                        success: true,
                        message: response.data.message,
                        data: response.data.data,
                    };
                } else {
                    return {
                        success: false,
                        message: response,
                    };
                }
            })
            .catch(error => {
                return {
                    success: false,
                    message: error.response || 'Payment failed'
                };
            });
    };

    return {
        payment,
    };
};