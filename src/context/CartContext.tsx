"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  isInitialized: boolean;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addItem: (productId: number) => void;
  increaseItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

type CartAction =
  | { type: "INITIALIZE"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: { productId: number } }
  | { type: "INCREASE_ITEM"; payload: { productId: number } }
  | { type: "DECREASE_ITEM"; payload: { productId: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "CLEAR_CART" };

const CART_STORAGE_KEY = "cart";

const initialState: CartState = {
  items: [],
  isInitialized: false,
};

export const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INITIALIZE": {
      return {
        items: action.payload,
        isInitialized: true,
      };
    }

    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.payload.productId,
            quantity: 1,
          },
        ],
      };
    }

    case "INCREASE_ITEM": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }

    case "DECREASE_ITEM": {
      const currentItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (!currentItem) {
        return state;
      }

      if (currentItem.quantity <= 1) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.productId !== action.payload.productId,
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.payload.productId,
        ),
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
      };
    }

    default: {
      return state;
    }
  }
}

function getStoredCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(storedCart) as CartItem[];

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.filter(
      (item) =>
        typeof item.productId === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedItems = getStoredCartItems();

    dispatch({
      type: "INITIALIZE",
      payload: storedItems,
    });
  }, []);

  useEffect(() => {
    if (!state.isInitialized) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, state.isInitialized]);

  const addItem = useCallback((productId: number) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { productId },
    });
  }, []);

  const increaseItem = useCallback((productId: number) => {
    dispatch({
      type: "INCREASE_ITEM",
      payload: { productId },
    });
  }, []);

  const decreaseItem = useCallback((productId: number) => {
    dispatch({
      type: "DECREASE_ITEM",
      payload: { productId },
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({
      type: "CLEAR_CART",
    });
  }, []);

  const totalItems = useMemo(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items: state.items,
      totalItems,
      addItem,
      increaseItem,
      decreaseItem,
      removeItem,
      clearCart,
    };
  }, [
    state.items,
    totalItems,
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}