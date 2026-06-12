import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type ItemStatus = 'active' | 'matched' | 'resolved' | 'closed';
type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

interface StatusBadgeProps {
  status: string;
  variant?: 'item' | 'match';
  className?: string;
}

const itemStatusStyles: Record<ItemStatus, { dot: string; bg: string; text: string }> = {
  active: { dot: 'bg-success', bg: 'bg-success/10', text: 'text-success' },
  matched: { dot: 'bg-info', bg: 'bg-info/10', text: 'text-info' },
  resolved: { dot: 'bg-success', bg: 'bg-success/10', text: 'text-success' },
  closed: { dot: 'bg-muted-foreground', bg: 'bg-muted', text: 'text-muted-foreground' },
};

const matchStatusStyles: Record<MatchStatus, { dot: string; bg: string; text: string }> = {
  pending: { dot: 'bg-warning', bg: 'bg-warning/10', text: 'text-warning' },
  accepted: { dot: 'bg-success', bg: 'bg-success/10', text: 'text-success' },
  rejected: { dot: 'bg-destructive', bg: 'bg-destructive/10', text: 'text-destructive' },
  expired: { dot: 'bg-muted-foreground', bg: 'bg-muted', text: 'text-muted-foreground' },
};

export function StatusBadge({ status, variant = 'item', className }: StatusBadgeProps) {
  const styles =
    variant === 'match'
      ? matchStatusStyles[status as MatchStatus]
      : itemStatusStyles[status as ItemStatus];

  if (!styles) {
    return (
      <Badge variant="secondary" className={className}>
        {status}
      </Badge>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles.bg,
        styles.text,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} />
      <span className="capitalize">{status}</span>
    </span>
  );
}
