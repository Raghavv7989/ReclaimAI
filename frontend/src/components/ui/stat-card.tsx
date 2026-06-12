'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  href?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  href,
  className,
}: StatCardProps) {
  const cardContent = (
    <Card className={cn(
      'relative overflow-hidden transition-all',
      href && 'hover:border-primary/50 hover:shadow-md cursor-pointer',
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span
              className={cn(
                'font-medium',
                trend.value > 0
                  ? 'text-success'
                  : trend.value < 0
                    ? 'text-destructive'
                    : 'text-muted-foreground'
              )}
            >
              {trend.value > 0 ? '+' : ''}
              {trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-110" />
    </Card>
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {href ? (
        <Link href={href} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
          {cardContent}
        </Link>
      ) : (
        <div className="group">{cardContent}</div>
      )}
    </motion.div>
  );
}
