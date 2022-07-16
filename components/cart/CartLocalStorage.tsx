import { CartItem } from "./CartContext";

export const getCartItemsFromLocalStorage = () => {
  const NEXT_SHOP_CART = localStorage.getItem("NEXT_SHOP_CART");
  console.log(NEXT_SHOP_CART);
  if (!NEXT_SHOP_CART) {
    return [];
  }
  if (NEXT_SHOP_CART) {
    try {
      return JSON.parse(NEXT_SHOP_CART);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
};

export const setCartItemsToLocalStorage = (items: readonly CartItem[]) => {
  console.log(items);
  localStorage.setItem("NEXT_SHOP_CART", JSON.stringify(items));
};
