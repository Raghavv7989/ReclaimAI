'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type GaugeSize = 'sm' | 'md' | 'lg';

interface SimilarityGaugeProps {
  score: number;
  size?: GaugeSize;
  label?: string;
  className?: string;
}

const sizeConfig: Record<GaugeSize, { px: number; stroke: number }> = {
  sm: { px: 64, stroke: 4 },
  md: { px: 96, stroke: 5 },
  lg: { px: 128, stroke: 6 },
};

function getScoreColor(score: number): string {
  if (score < 0.3) return 'oklch(0.577 0.245 27.325)';
  if (score < 0.6) return 'oklch(0.769 0.188 70.08)';
  if (score < 0.8) return 'oklch(0.527 0.154 150.069)';
  return 'oklch(0.208 0.042 265.755)';
}

export function SimilarityGauge({
  score,
  size = 'md',
  label,
  className,
}: SimilarityGaugeProps) {
  const clampedScore = Math.max(0, Math.min(1, score));

  const config = sizeConfig[size];

  const radius = (config.px - config.stroke * 2) / 2;

  const circumference = 2 * Math.PI * radius;

  const arcLength = circumference * 0.75;

  const filledLength = arcLength * clampedScore;

  const color = getScoreColor(clampedScore);

  const percentage = Math.round(clampedScore * 100);

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2',
        className
      )}
      role="meter"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `Match score: ${percentage}%`}
    >
      {/* Gauge Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: config.px,
          height: config.px,
        }}
      >
        <svg
          width={config.px}
          height={config.px}
          viewBox={`0 0 ${config.px} ${config.px}`}
          className="-rotate-[135deg]"
        >
          {/* Background Arc */}
          <circle
            cx={config.px / 2}
            cy={config.px / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-muted/40"
            strokeWidth={config.stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Filled Arc */}
          <motion.circle
            cx={config.px / 2}
            cy={config.px / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke}
            strokeDasharray={`${filledLength} ${circumference}`}
            strokeLinecap="round"
            initial={{
              strokeDasharray: `0 ${circumference}`,
            }}
            animate={{
              strokeDasharray: `${filledLength} ${circumference}`,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <span
            className={cn(
              'font-bold leading-none tracking-tight',
              size === 'sm' && 'text-lg',
              size === 'md' && 'text-2xl',
              size === 'lg' && 'text-3xl'
            )}
          >
            {percentage}%
          </span>

          {label && (
            <span className="mt-1 text-xs text-muted-foreground text-center">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}