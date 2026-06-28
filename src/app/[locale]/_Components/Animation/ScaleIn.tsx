"use client";

import { motion } from "framer-motion";

export default function ScaleIn({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: .92,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: .35,
            }}
        >
            {children}
        </motion.div>
    );
}