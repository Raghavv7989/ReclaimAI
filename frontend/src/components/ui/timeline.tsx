'use client';

import { cn } from '@/lib/utils';
import { type LucideIcon, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  status?: 'completed' | 'active' | 'pending';
  icon?: LucideIcon;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const statusStyles: Record<string, string> = {
  completed: 'bg-success text-success-foreground',
  active: 'bg-primary text-primary-foreground',
  pending: 'bg-muted text-muted-foreground',
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative space-y-0', className)}>
      {items.map((item, index) => {
        const Icon = item.icon ?? Circle;
        const status = item.status ?? 'pending';
        const isLast = index === items.length - 1;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="relative flex gap-4 pb-8"
          >
            {/* Vertical line */}
            {!isLast && (
              <div className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-px bg-border" />
            )}

            {/* Node */}
            <div
              className={cn(
                'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                statusStyles[status]
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                <time className="text-xs text-muted-foreground">{item.date}</time>
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
