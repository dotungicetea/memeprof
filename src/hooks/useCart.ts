"use client";

import { create, persist } from "../external/zustand";

export interface Item {
  item: object | string;
  name: string;
  description: string;
  price: string;
  place: string;
  bookPrice: string;
  sale_price: string;
  images: {
    id: string;
    src: string;
    name: string;
  }[];
  options: unknown[];
  id: any;
  categories: {
    id: number;
    link: string;
    name: string;
    slug: string;
  }[];
  category: {
    _id: string;
    name: string;
  };
  price_html: string;
  currency_minor_unit: string;
  related_ids: string[];
}

export interface CartItem extends Item {
  quantity: number;
}

export type CartStore = {
  useBonus: boolean;
  items: CartItem[];

  addItem: (item: CartItem) => void;
  getItem: (id: string) => Nullable<CartItem>;
  inCart: (id: string) => boolean;
  removeItem: (id: string) => void;
  clearCart: () => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  isEmpty: () => boolean;
  cartTotal: number;
  curProduct: Nullable<Item>;
  setCurProduct: (product: Nullable<Item>) => void;
  deliveryMethod: "express" | "standard";
  deliveryFee: number;
  setDelivery: (type: "express" | "standard", fee: number) => void;
  paymentMethod: "cash" | "card | bonus";
  setPaymentType: (type: "cash" | "card | bonus") => void;
  setUseBonus: (bonus: number, checked: boolean) => void;
  reset: () => void;
};

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      curProduct: null,
      deliveryMethod: "standard",
      deliveryFee: 0,
      paymentMethod: "cash",
      useBonus: false,
      cartTotal: 0,

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        if (existingItem) {
          const nextItems = get().items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );

          const cartTotal = nextItems.reduce(
            (acc, item) => acc + +item.price * item.quantity,
            0
          );

          return set({
            cartTotal,
            items: nextItems,
          });
        }

        return set({
          items: [...get().items, item],
          cartTotal: get().cartTotal + +item.price * item.quantity,
        });
      },
      clearCart: () => {
        return set({ items: [], cartTotal: 0 });
      },

      removeItem: (id) => {
        const nextItems = get().items.filter((i) => i.id !== id);
        const cartTotal = nextItems.reduce(
          (acc, item) => acc + +item.price * item.quantity,
          0
        );

        return set({
          items: nextItems,
          cartTotal,
        });
      },

      incrementItem: (id) => {
        const nextItems = get().items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );

        const cartTotal = nextItems.reduce(
          (acc, item) => acc + +item.price * item.quantity,
          0
        );

        return set({
          items: nextItems,
          cartTotal: cartTotal,
        });
      },

      decrementItem: (id) => {
        const existingItem = get().items.find((i) => i.id === id);
        if (existingItem?.quantity === 1) {
          return set({
            items: get().items.filter((i) => i.id !== id),
            cartTotal: get().cartTotal - +existingItem.price,
          });
        }
        const nextItems = get().items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );

        const cartTotal = nextItems.reduce(
          (acc, item) => acc + +item.price * item.quantity,
          0
        );

        return set({
          items: nextItems,
          cartTotal: cartTotal,
        });
      },

      getItem: (id) => {
        return get().items.find((i) => i.id === id);
      },

      inCart: (id) => {
        return get().items.some((i) => i.id === id);
      },
      isEmpty: () => {
        return get().items.length === 0;
      },

      setCurProduct: (product) => {
        return set({ curProduct: product });
      },

      setDelivery: (type, fee) => {
        return set({ deliveryMethod: type, deliveryFee: fee });
      },

      setPaymentType: (type) => {
        return set({ paymentMethod: type });
      },

      setUseBonus: (bonus, checked) => {
        if (checked) {
          const cartTotal = get().cartTotal;
          const newTotal = cartTotal - bonus;
          return set({ useBonus: true, cartTotal: newTotal });
        } else {
          return set({ useBonus: false, cartTotal: get().cartTotal + bonus });
        }
      },

      reset: () => {
        return set({ items: [], curProduct: null });
      },
    }),
    {
      name: "webbot-cart",
    }
  )
);

export const selectCartItems = (state: CartStore) => state.items;
export const selectAddItem = (state: CartStore) => state.addItem;
export const selectRemoveItem = (state: CartStore) => state.removeItem;
export const selectClearCart = (state: CartStore) => state.clearCart;
export const selectGetItem = (id: string) => (state: CartStore) =>
  state.getItem(id);
export const selectIsInCart = (id: string) => (state: CartStore) =>
  state.inCart(id);

export const selectCartIsEmpty = (state: CartStore) => state.isEmpty();
export const selectCartTotal = (state: CartStore) => state.cartTotal;
export const selectIncrementItem = (state: CartStore) => state.incrementItem;
export const selectDecrementItem = (state: CartStore) => state.decrementItem;

export const selectCurProduct = (state: CartStore) => state.curProduct;
export const selectSetCurProduct = (state: CartStore) => state.setCurProduct;
export const selectDeliveryMethod = (state: CartStore) => state.deliveryMethod;
export const selectDeliveryFee = (state: CartStore) => state.deliveryFee;
export const selectSetDelivery = (state: CartStore) => state.setDelivery;
export const selectResetCart = (state: CartStore) => state.reset;
export const selectSetUseBonus = (state: CartStore) => state.setUseBonus;
export const selectUseBonus = (state: CartStore) => state.useBonus;
export const selectSetPaymentType = (state: CartStore) => state.setPaymentType;
