"use client";
import { PuffLoader } from "react-spinners";

export default function MainLoader() {
    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
            style={{ background: "var(--background)" }}
        >
            {/* Logo mark */}
            <div
                className="w-12 h-12 bg-(--primary-color) rounded-2xl flex items-center justify-center text-white text-xl font-black mb-2 shadow-lg"
                style={{ background: "var" }}
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