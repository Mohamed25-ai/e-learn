import React from 'react'
import { PuffLoader } from 'react-spinners';

export default function FormLoader() {

    return (
        <div
            className="w-3/4 h-100  mx-auto z-50 flex flex-col bg-background items-center justify-center gap-4"
        >
            {/* Logo mark */}
            <div
                className="w-12 h-12 bg-(--primary-color) rounded-2xl flex items-center justify-center text-white text-xl font-black mb-2 shadow-lg"
            >
                E
            </div>
            <PuffLoader
                color="var(--primary-color)"
                size={60}
            />
            <p
                className="text-sm text-(--text-muted) font-semibold tracking-widest uppercase animate-pulse"
            >
                Loading...
            </p>
        </div>
    );
}
