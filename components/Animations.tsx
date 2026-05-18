'use client'

import { motion } from 'framer-motion'

const easeMentivis = [0.16, 1, 0.3, 1] as const
const easeCard = [0.22, 1, 0.36, 1] as const

export function StaggerBlock({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: easeMentivis }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedDivider({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ transformOrigin: 'left' }}
      className={className || 'border-t border-gray-200'}
    />
  )
}

export function AnimatedCard({ children, delay = 0, className, id, whileHover }: { children: React.ReactNode; delay?: number; className?: string; id?: string; whileHover?: { y?: number; scale?: number } }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={whileHover}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: easeMentivis }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, direction = 'up', className }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'left' | 'right'; className?: string }) {
  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
  }
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: easeMentivis }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
