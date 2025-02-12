import { backend } from '@/lib/axios';

export const useOrder = () => {
  /**
   * Create
   * @param param0
   * @returns
   */
  const create = async ({
    delivery_name,
    delivery_email,
    delivery_contact,
    delivery_address,
    cartItems,
  }: {
    delivery_name: string;
    delivery_email: string;
    delivery_contact: string;
    delivery_address: string;
    cartItems: any;
  }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await backend.post(
        '/api/v1/order',
        {
          delivery_name,
          delivery_email,
          delivery_contact,
          delivery_address,
          cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to load menu',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load menu',
      };
    }
  };

  /**
   * Orders
   * @param param0
   * @returns
   */
  const orders = async ({ order_status }: { order_status: string | null }) => {
    try {
      const token = localStorage.getItem('token');
      let response;

      if (order_status) {
        response = await backend.get(
          `/api/v1/order/?order_status=${order_status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await backend.get(`/api/v1/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to load menu',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load menu',
      };
    }
  };

  /**
   * Order
   * @param param0
   * @returns
   */
  const order = async ({ order_uuid }: { order_uuid: string | null }) => {
    let response;
    try {
      const token = localStorage.getItem('token');

      if (order_uuid) {
        response = await backend.get(`/api/v1/order/${order_uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = {
          status: 404,
          success: false,
          message: 'Order not found',
        };
      }
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Successful',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Successful',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error: ${error.message}`,
      };
    }
  };

  return {
    create,
    orders,
    order,
  };
};
