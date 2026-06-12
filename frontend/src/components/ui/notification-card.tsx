'use client';

import { cn } from '@/lib/utils';
import { Sparkles, MessageSquare, Package, Bell } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

type NotificationType = 'match_found' | 'message_received' | 'item_update' | 'system';

interface NotificationCardProps {
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  onClick?: () => void;
  className?: string;
}

const typeIcons: Record<NotificationType, LucideIcon> = {
  match_found: Sparkles,
  message_received: MessageSquare,
  item_update: Package,
  system: Bell,
};

const typeColors: Record<NotificationType, string> = {
  match_found: 'bg-primary/10 text-primary',
  message_received: 'bg-info/10 text-info',
  item_update: 'bg-success/10 text-success',
  system: 'bg-muted text-muted-foreground',
};

export function NotificationCard({
  type,
  title,
  body,
  timestamp,
  isRead,
  onClick,
  className,
}: NotificationCardProps) {
  const Icon = typeIcons[type];

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted/50',
        !isRead && 'bg-primary/[0.03]',
        className
      )}
      aria-label={`${isRead ? '' : 'Unread: '}${title}`}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          typeColors[type]
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm', !isRead && 'font-semibold')}>{title}</p>
          {!isRead && (
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{body}</p>
        <time className="mt-1 text-xs text-muted-foreground">{timestamp}</time>
      </div>
    </button>
  );
}
