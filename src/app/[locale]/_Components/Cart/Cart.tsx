import React from 'react'
import { CartProps } from './cart.types'
import CartItems from './CartItems'
import CartInvoice from './CartInvoice'

export default function Cart({ cartData }: CartProps) {
    console.log("object",cartData)
    return (
        <div className=' lg:flex p-5 gap-5'>
            <CartItems BasketItems={cartData.basketItems} />
            <CartInvoice cartData={cartData} />
        </div>
    )
}
