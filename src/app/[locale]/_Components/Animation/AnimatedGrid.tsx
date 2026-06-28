"use client";

import { motion } from "framer-motion";

export default function AnimatedGrid({
    children,
    page,
}: {
    children: React.ReactNode;
    page: number;
}) {
    return (
        <motion.div
            key={page}
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: -20,
            }}
            transition={{
                duration: .35,
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
        >
            {children}
        </motion.div>
    );
}