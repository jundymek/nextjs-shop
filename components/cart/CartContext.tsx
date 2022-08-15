import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getCartItemsFromLocalStorage, setCartItemsToLocalStorage } from "./CartLocalStorage";

export interface CartItem {
  readonly slug: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addItemToCart: (product: CartItem) => void;
  readonly removeItemFromCart: (slug: CartItem["slug"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }
    setCartItemsToLocalStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems || [],
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            if (!prevState) {
              return [];
            }
            const existingItem = prevState.find((existingItem) => existingItem.slug === item.slug);
            if (!existingItem) {
              return [...prevState, item];
            }

            return prevState.map((existingItem) => {
              if (existingItem.slug === item.slug) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemFromCart: (itemId) => {
          setCartItems((prevState) => {
            if (!prevState) {
              return [];
            }
            const existingItem = prevState.find((existingItem) => existingItem.slug === itemId);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((existingItem) => existingItem.slug !== itemId);
            }
            return prevState.map((existingItem) => {
              if (existingItem.slug === itemId) {
                return {
                  ...existingItem,
                  count: existingItem.count - 1,
                };
              }
              return existingItem;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("useCartState must be used within a CartStateContextProvider");
  }
  return cartState;
};
