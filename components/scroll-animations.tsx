"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

// AVAX-style smooth easing - subtle and elegant
const smoothEase = [0.25, 0.1, 0.25, 1] as const;
const gentleEase = [0.4, 0, 0.2, 1] as const;

// ============================================
// TEXT REVEAL - Subtle character fade (AVAX style)
// ============================================
interface TextRevealProps {
  children: string;
  className?: string;
  once?: boolean;
}

export function TextReveal({ children, className = "", once = true }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -15% 0px" });

  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                duration: 0.5,
                ease: smoothEase,
                delay: 0.3 + (wordIndex * word.length + charIndex) * 0.012,
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

// ============================================
// TEXT FILL ON SCROLL (Polygon style - color fills as you scroll)
// ============================================
interface ScrollTextFillProps {
  children: string;
  className?: string;
  baseColor?: string;
  fillColor?: string;
}

export function ScrollTextFill({
  children,
  className = "",
  baseColor = "rgba(255, 107, 107, 0.2)",
  fillColor = "#FF6B6B",
}: ScrollTextFillProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const words = children.split(" ");
  const totalChars = children.replace(/ /g, "").length;
  let charCount = 0;

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => {
            const charPosition = charCount / totalChars;
            charCount++;
            return (
              <ScrollChar
                key={`${wordIndex}-${charIndex}`}
                char={char}
                scrollYProgress={scrollYProgress}
                charPosition={charPosition}
                baseColor={baseColor}
                fillColor={fillColor}
              />
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}

function ScrollChar({
  char,
  scrollYProgress,
  charPosition,
  baseColor,
  fillColor,
}: {
  char: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  charPosition: number;
  baseColor: string;
  fillColor: string;
}) {
  const color = useTransform(
    scrollYProgress,
    [charPosition, charPosition + 0.02],
    [baseColor, fillColor]
  );

  return <motion.span style={{ color }}>{char}</motion.span>;
}

// ============================================
// PARALLAX SECTION (AVAX-style subtle depth)
// ============================================
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 80]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

// ============================================
// SLIDE IN ON SCROLL (AVAX-style subtle slide)
// ============================================
interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
  once?: boolean;
}

export function SlideIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
  once = true,
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  // AVAX style - very subtle movement, mainly opacity
  const directions = {
    left: { x: -30, y: 0 },
    right: { x: 30, y: 0 },
    up: { x: 0, y: 25 },
    down: { x: 0, y: -25 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{
        duration: 0.7,
        ease: smoothEase,
        delay: 0.1 + delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// FADE IN SCALE (AVAX-style gentle entrance)
// ============================================
interface FadeInScaleProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeInScale({ children, delay = 0, className = "", once = true }: FadeInScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.8,
        ease: smoothEase,
        delay: 0.15 + delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STAGGER CONTAINER (for staggered children)
// ============================================
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

// ============================================
// SCROLL PROGRESS LINE (subtle indicator)
// ============================================
export function ScrollProgressLine({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[2px] bg-[#FF6B6B]/80 origin-left z-[9999] ${className}`}
      style={{ scaleX }}
    />
  );
}

// ============================================
// FADE IN (simple opacity transition - AVAX style)
// ============================================
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration,
        ease: smoothEase,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// MAGNETIC HOVER (interactive element)
// ============================================
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.2 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// COUNTER ANIMATION (number counting up)
// ============================================
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * eased));

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
