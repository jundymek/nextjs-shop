import { useCartState } from "components/cart/CartContext";
import { TrashIcon } from "components/icons/TrashIcon";
import Layout from "components/Layout";
import React from "react";

const CartContent = () => {
  const cartState = useCartState();
  return (
    <div className="col-span-2">
      <ul className="divide-y divide-gray-200">
        {cartState.items.map((item, index) => (
          <li key={`${item.title}_${index}`} className="py-4 flex justify-between">
            <div>
              {item.count}x {item.title}
            </div>
            <div className="flex items-center">
              <span>{item.price}</span>
              <button className="ml-4 text-red-500" onClick={() => cartState.removeItemFromCart(item.slug)}>
                <TrashIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSummary = () => {
  const cartState = useCartState();
  return (
    <div>
      Cart summary
      <div>Cart items: {cartState.items.length}</div>
      <div>Total: {cartState.items.reduce((acc, item) => acc + item.price, 0)} PLN</div>
    </div>
  );
};

const CartPage = () => {
  const cartState = useCartState();
  return (
    <div className="max-w-5xl mx-auto p-4 w-full">
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
