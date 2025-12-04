"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Custom cubic-bezier easing similar to Barba.js
const customEase = [0.22, 1, 0.36, 1] as const;

// Barba.js-style page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: customEase,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: customEase,
    },
  },
};

// Overlay transition for Barba.js-style loading screen effect
const overlayVariants = {
  initial: {
    scaleY: 1,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.6,
      ease: customEase,
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.4,
      ease: customEase,
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Barba.js-style overlay */}
      <motion.div
        className="fixed inset-0 z-[100] origin-top bg-[#FF6B6B]"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={overlayVariants}
        style={{ pointerEvents: "none" }}
      />

      {/* Page content */}
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
}

// Child element animation for staggered reveals (like Barba.js content animations)
export const childVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: customEase,
    },
  },
};

// Animated wrapper for individual elements
export function AnimatedElement({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: customEase,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
