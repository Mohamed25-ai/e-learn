import { getUserCartAction } from '@/actions/cart/cart.actions'
import React from 'react'
import Cart from '../../_Components/Cart/Cart';

export default async function page() {
    const cartItems=await getUserCartAction();
    console.log("cartItems",cartItems)

    return (
        <>
        <Cart cartData={cartItems?.data} />
        </>
    )
}
