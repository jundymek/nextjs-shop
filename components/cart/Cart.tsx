import { ShoppingCartIcon } from "components/icons/ShoppingCartIcon";
import Link from "next/link";
import { useCartState } from "./CartContext";

export const Cart = () => {
  const cartState = useCartState();
  return (
    <Link href="/cart">
      <a>
        {cartState.items.length}
        <ShoppingCartIcon />
      </a>
    </Link>
  );
};
