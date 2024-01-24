import { Shoe } from "@/lib/definitions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends Shoe {
  count: number;
  size: number
}

export type CartStore = {
  cart: CartItem[];
  count: () => number;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  setItemCount: (id: number, count: number) => void;
  setItemSize: (id: number, size: number) => void;
  add: (product: Shoe, size: number) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        if (cart.length) {
          return cart.map((item) => item.count).reduce((a, b) => a + b);
        }
        return 0;
      },
      add: (product, size) => {
        const { cart } = get();
        const updatedCart = addToCart(cart, product, size);
        set({ cart: updatedCart });
      },
      removeItem: (id) => {
        const { cart } = get();
        const updatedCart = removeFromCart(cart, id);
        set({ cart: updatedCart });
      },
      removeAll: () => {
        set({ cart: [] });
      },
      incrementItem: (id) => {
        const { cart } = get();
        const updatedCart = incrementInCart(cart, id);
        set({ cart: updatedCart });
      },
      decrementItem: (id) => {
        const { cart } = get();
        const updatedCart = decrementInCart(cart, id);
        set({ cart: updatedCart });
      },
      setItemCount: (id, count) => {
        const { cart } = get();
        const updatedCart = setCountInCart(cart, id, count);
        set({ cart: updatedCart });
      },
      setItemSize: (id, size) => {
        const { cart } = get();
        const updatedCart = setSizeInCart(cart, id, size);
        set({ cart: updatedCart });
      },
      totalPrice: () => {
        const { cart } = get();
        if (cart.length) {
          return cart
            .map((item) => item.count * item.price)
            .reduce((a, b) => a + b);
        }
        return 0;
      },
    }),
    { name: "nike-cart-storage" }
  )
);

const addToCart = (cart: CartItem[], product: Shoe, size:number): CartItem[] => {
  const item = cart.find((item) => item.id === product.id);

  if (item) {
    return cart.map((item) => {
      if (item.id === product.id) {
        const itemCount = item.count >= 1 ? item.count : 1;
        return { ...item, count: itemCount, size };
      }
      return item;
    });
  }

  return [...cart, { ...product, count: 1, size }];
};

const removeFromCart = (cart: CartItem[], id: number): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.filter((item) => item.id !== id);
  }
  return cart;
};

const incrementInCart = (cart: CartItem[], id: number): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
  }
  return cart;
};

const decrementInCart = (cart: CartItem[], id: number): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        const itemCount = item.count > 1 ? item.count - 1 : 1;
        return { ...item, count: itemCount };
      }
      return item;
    });
  }
  return cart;
};

const setCountInCart = (
  cart: CartItem[],
  id: number,
  count: number
): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        const itemCount = count >= 1 ? count : 1;
        return { ...item, count: itemCount };
      }
      return item;
    });
  }
  return cart;
};

const setSizeInCart = (
  cart: CartItem[],
  id: number,
  size: number
): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        if (item.sizes.includes(size)) {
          return { ...item, size };
        }
      }
      return item;
    });
  }
  return cart;
};