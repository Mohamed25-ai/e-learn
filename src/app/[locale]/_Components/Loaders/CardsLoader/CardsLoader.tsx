import React from 'react'
import { CardsLoadetProps } from './CardsLoader.type'

export default function CardsLoader({ length }: CardsLoadetProps) {
    return (
        <div className="flex gap-4 overflow-hidden">
            {Array.from({ length }).map((_, i) => (
                <div
                    key={i}
                    className="min-w-60 rounded-(--radius) border border-border bg--(--primary-color) p-3"
                >
                    <div className="mb-3 h-35 animate-pulse rounded-[calc(var(--radius)-4px)] bg-(--primary-light)" />
                    <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                </div>
            ))}
        </div>
    )
}
