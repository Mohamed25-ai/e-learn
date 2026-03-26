"use client";

import {
    useRef,
    ClipboardEvent,
    KeyboardEvent,
    ChangeEvent,
} from "react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";

const LENGTH = 6;

interface OtpInputGroupProps {
    value: string[];
    onChange: (otp: string[]) => void;
    label?: string;
    hasError?: boolean;
}

export function OtpInputGroup({ value, onChange, label, hasError }: OtpInputGroupProps) {
    const t=useTranslations("Auth");
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(LENGTH).fill(null));
    const realLength = value.filter(Boolean).length;
    const percentage = (realLength / LENGTH) * 100;

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value.replace(/\D/g, "").slice(-1);
        const next = [...value];
        next[index] = val;
        onChange(next);
        if (val && index < LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!value[index] && index > 0) {
                const next = [...value];
                next[index - 1] = "";
                onChange(next);
                inputRefs.current[index - 1]?.focus();
            }
        }
        if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
        if (e.key === "ArrowRight" && index < LENGTH - 1) inputRefs.current[index + 1]?.focus();
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
        if (!pasted) return;
        const next = [...value];
        pasted.split("").forEach((char, i) => {
            if (index + i < LENGTH) next[index + i] = char;
        });
        onChange(next);
        const focusIndex = Math.min(index + pasted.length, LENGTH - 1);
        inputRefs.current[focusIndex]?.focus();
    };

    // ── Box styling ───────────────────────────────────────────────────────────

    const boxClass = (digit: string) => {
        const base =
            "h-12 sm:h-14 w-full min-w-0 rounded-xl border text-center text-lg sm:text-xl font-semibold " +
            "transition-all duration-150 selection:bg-blue-300 " +
            "focus-visible:ring-2 focus-visible:ring-offset-0 ";

        if (hasError)
            return base +
                "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 focus-visible:ring-red-300/30";

        if (digit)
            return base +
                "border-(--primary-color) bg-(--primary-color)/8 text-(--primary-color) " +
                "focus-visible:ring-(--primary-color)/20 scale-[1.03]";

        return base +
            "border-(--border-color) bg-(--input-bg) text-foreground " +
            "focus-visible:ring-(--primary-color)/20 focus-visible:border-(--primary-color)";
    };

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="flex flex-col gap-3 w-full">

            {label && (
                <span className="text-sm font-medium text-foreground">{label}</span>
            )}

            {/*
        grid-cols-6: each box takes equal width.
        gap-2 on mobile (375px → ~48px per box), gap-3 on sm+.
        No fixed widths — boxes scale with the container.
      */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {value.map((digit, index) => (
                    <Input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={1}
                        value={digit}
                        onPaste={(e) => handlePaste(e, index)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        aria-label={`Digit ${index + 1} of ${LENGTH}`}
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        className={boxClass(digit)}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
                <Progress
                    value={percentage}
                    className={`h-1.5 transition-all duration-300 ${hasError ? "[&>div]:bg-red-500" : ""}`}
                />
                <div className="flex justify-between items-center">
                    <p className={`text-xs italic ${hasError ? "text-red-500" : "text-(--text-secondary)"}`}>
                        {t("verifyCodePage.digitsEntered", { count: realLength })}
                    </p>
                    {realLength === LENGTH && !hasError && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in duration-200">
                            All set ✓
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}