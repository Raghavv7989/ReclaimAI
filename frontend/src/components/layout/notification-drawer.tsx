'use client';

import { Bell } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { NotificationCard } from '@/components/ui/notification-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMockNotifications } from '@/lib/mocks/hooks';

export function NotificationDrawer() {
  const { data: notifications, isLoading } = useMockNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Sheet>
      <SheetTrigger
        className={cn("relative rounded-full", buttonVariants({ variant: "ghost", size: "icon" }))}
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} unread</Badge>
            )}
          </div>
          <SheetDescription>
            Updates about your items and matches.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {isLoading ? (
            <div className="flex flex-col gap-2 pr-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 pr-4">
              {notifications.map((notification) => (
                <NotificationCard 
                  key={notification.id} 
                  title={notification.title}
                  body={notification.body}
                  timestamp={notification.createdAt}
                  type={notification.type}
                  isRead={notification.isRead}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
