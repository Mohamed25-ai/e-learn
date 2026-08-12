import { getUserCartAction } from "@/actions/cart/cart.actions";
import React from "react";
import Cart from "../../_Components/Cart/Cart";

export default async function page() {
  const cartItems = await getUserCartAction();
  return (
    <>
      <Cart cartData={cartItems?.data} />
    </>
  );
}
