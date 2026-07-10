"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article";
};

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}

/* ── FadeIn: directional, mount-triggered (for above-the-fold hero content) ── */

type FadeDirection = "top" | "bottom" | "left" | "right";

function fadeOffset(direction: FadeDirection, distance: number) {
  switch (direction) {
    case "top": return { y: -distance };
    case "bottom": return { y: distance };
    case "left": return { x: -distance };
    case "right": return { x: distance };
  }
}

export function FadeIn({
  children,
  direction = "bottom",
  distance = 24,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode;
  direction?: FadeDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...fadeOffset(direction, distance) }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── FloatingGlow: entrance fade + continuous float + pulsing glow ── */

export function FloatingGlow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 40 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -8, 0],
        boxShadow: [
          "0 30px 60px -15px rgba(0,166,81,0.10)",
          "0 30px 70px -10px rgba(0,166,81,0.25)",
          "0 30px 60px -15px rgba(0,166,81,0.10)",
        ],
      }}
      transition={{
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.6 },
        boxShadow: { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.6 },
      }}
    >
      {children}
    </motion.div>
  );
}
