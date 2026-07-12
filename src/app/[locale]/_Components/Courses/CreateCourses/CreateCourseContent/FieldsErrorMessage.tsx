import React from 'react'
import { FieldsErrorMessagePropsType } from './createcoursecontent.types';

export default function FieldsErrorMessage({field,message}:FieldsErrorMessagePropsType) {
    return (
        <p className="text-sm" style={{ color: "var(--error)" }}>
            {message}
        </p>
    )
}
