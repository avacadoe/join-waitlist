"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface TransitionLayoutProps {
  children: ReactNode;
}

// AVAX-style smooth easing - very subtle, no jarring movements
const smoothEase = [0.25, 0.1, 0.25, 1] as const;

export function TransitionLayout({ children }: TransitionLayoutProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: smoothEase,
          }
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: smoothEase,
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
