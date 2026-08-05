import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { PayUserCartInvoiceProps } from './cart.types'

export default function PayUserCartInvoice({baskedId}:PayUserCartInvoiceProps) {
    return (
        <button className="BUTTON_STYLE w-full justify-center text-base rounded-2xl py-4">
            Checkout Now
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    )
}
