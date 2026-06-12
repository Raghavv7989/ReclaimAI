'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ScoreBreakdownProps {
  scores: {
    image_score: number;
    text_score: number;
    location_score: number;
    time_score: number;
  };
  className?: string;
}

const scoreConfig = [
  { key: 'image_score' as const, label: 'Image', color: 'bg-primary' },
  { key: 'text_score' as const, label: 'Text', color: 'bg-info' },
  { key: 'location_score' as const, label: 'Location', color: 'bg-success' },
  { key: 'time_score' as const, label: 'Time', color: 'bg-warning' },
];

export function ScoreBreakdown({ scores, className }: ScoreBreakdownProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {scoreConfig.map((item, index) => {
        const value = Math.max(0, Math.min(1, scores[item.key]));
        const percentage = Math.round(value * 100);

        return (
          <div key={item.key} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{percentage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className={cn('h-full rounded-full', item.color)}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
