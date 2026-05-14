import { useRef } from 'react'
import { InputPropsType } from './reusablecomponents.types'



export default function OInput({ inputStyle, type, onChange, placeholder }: InputPropsType) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleChange = () => {
        const currentValue = inputRef.current?.value;
        if (currentValue) {
            onChange(currentValue);
        }
    };
    const handleRemove = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const currentValue = inputRef.current?.value||"";
        if (e.key === "Backspace" && currentValue.length==1) {
            onChange("");
        }
    }
    return (
        <>
            <input ref={inputRef} onKeyDown={(e) => handleRemove(e)} placeholder={placeholder} onChange={handleChange} type={type} className={inputStyle} />
        </>
    )
}
