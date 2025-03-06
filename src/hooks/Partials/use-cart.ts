import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Item = {
  uuid: string;
  name: string;
  image: string;
  vendor_uuid: string;
  food_uuid: string;
  quantity: number;
  price: number;
};

type CartState = {
  cart: Item[];
  addToCart: (item: Item, quantity?: number) => void;
  removeFromCart: (uuid: string) => void;
  increaseQuantity: (uuid: string) => void;
  decreaseQuantity: (uuid: string) => void;
  clearAllCartItems: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item, quantity = 1) => {
        set((state) => {
          const exists = state.cart.find((cartItem) => cartItem.uuid === item.uuid);
          if (exists) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.uuid === item.uuid
                  ? { ...cartItem, quantity: cartItem.quantity + quantity }
                  : cartItem
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity, food_uuid: item.uuid }] };
        });
      },

      removeFromCart: (uuid) => {
        set((state) => ({ cart: state.cart.filter((item) => item.uuid !== uuid) }));
      },

      increaseQuantity: (uuid) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.uuid === uuid ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decreaseQuantity: (uuid) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.uuid === uuid
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearAllCartItems: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);