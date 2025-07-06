import { Product } from "@/src/backend/model/schemaModel";
import { create } from "zustand";

interface CartState {
  items: Product[];
  total: number;
  addCart: (cart: Product) => void;
  addToCart: (item: Product, quantity?: number) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,

  addToCart: (item, quantity = 1) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      const newItems = existingItem
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...state.items, { ...item, quantity }];

      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

      return { items: newItems, total };
    }),

  addCart: (cart) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === cart.id);
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === cart.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...cart, quantity: 1 }];

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const newItems = state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),
  clearCart: () => set({ items: [], total: 0 })
}));
