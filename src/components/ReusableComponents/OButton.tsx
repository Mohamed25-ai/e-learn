import React from 'react'
import { ButtonPropsType } from './reusablecomponents.types'

export default function OButton({buttonStyle,title}:ButtonPropsType) {
    return (
        <>
            <button className={buttonStyle}>{title}</button>
        </>
    )
}
