'use client';

import { useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { NotificationCard } from '@/components/ui/notification-card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useMockNotifications } from '@/lib/mocks/hooks';

export default function NotificationsPage() {
  const { data: notifications, setData: setNotifications, isLoading } = useMockNotifications();
  const [filter, setFilter] = useState('all');

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on matches, messages, and claim statuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={isLoading || notifications.every(n => n.isRead)}>
            <Check className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
          <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleClearAll} disabled={isLoading || notifications.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {notifications.some(n => !n.isRead) && (
              <span className="ml-2 flex h-2 w-2 rounded-full bg-primary"></span>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-4">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="p-4 transition-colors hover:bg-muted/50">
                  <NotificationCard
                    title={notification.title}
                    body={notification.body}
                    timestamp={notification.createdAt}
                    type={notification.type}
                    isRead={notification.isRead}
                    className="hover:bg-transparent"
                    onClick={() => {
                      setNotifications(notifications.map(n => 
                        n.id === notification.id ? { ...n, isRead: true } : n
                      ));
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8">
              <EmptyState
                icon={Bell}
                title="No notifications"
                description={filter === 'unread' ? "You're all caught up! No new notifications." : "You don't have any notifications yet."}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
