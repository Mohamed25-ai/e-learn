"use client";
import { ClipLoader } from "react-spinners";

export function InlineLoader({ size = 20 }: { size?: number }) {
    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <ClipLoader
                color="var(--primary-color)"
                size={size}
            />
        </div>
    );
}