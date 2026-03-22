"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedDiv({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
