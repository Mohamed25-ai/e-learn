"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface PasswordToggleProps {
    shown: boolean;
    onToggle: () => void;
    hasError?: boolean;
}

export function PasswordToggle({ shown, onToggle, hasError }: PasswordToggleProps) {
    return (
        <span
            onClick={onToggle}
            role="button"
            aria-label={shown ? "Hide password" : "Show password"}
            className={`
        absolute top-1/2 end-3 -translate-y-1/2
        select-none cursor-pointer px-1
        transition-colors duration-150
        ${hasError ? "text-red-500" : "text-(--primary-color)"}`}
        >
            <FontAwesomeIcon icon={shown ? faEye : faEyeSlash} />
        </span>
    );
}