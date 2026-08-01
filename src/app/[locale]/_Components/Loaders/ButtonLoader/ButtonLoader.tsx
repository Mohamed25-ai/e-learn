"use client";
import { ClipLoader } from "react-spinners";
import { ButtonLoaderProps } from "./buttonloader.types";

export function ButtonLoader({size=14,width}:ButtonLoaderProps) {
    return (
        <ClipLoader className="text-(--primary-color)"
            color="currentColor"
            size={size}
        />
    );
}