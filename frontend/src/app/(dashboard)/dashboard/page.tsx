'use client';

import Link from 'next/link';
import { Package, SearchCode, PlusCircle, Bell, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { NotificationCard } from '@/components/ui/notification-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { useMockDashboardStats, useMockNotifications } from '@/lib/mocks/hooks';

export default function DashboardOverviewPage() {
  const { data: stats, isLoading: isLoadingStats } = useMockDashboardStats();
  const { data: notifications, isLoading: isLoadingNotifs } = useMockNotifications();

  // Get recent 3 notifications for activity
  const recentActivity = notifications.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your items.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/report/lost" className={buttonVariants()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Report Lost
          </Link>
          <Link href="/report/found" className={buttonVariants({ variant: "outline" })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Report Found
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingStats || !stats ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8 rounded-xl" />
                </div>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <StatCard
              title="Active Claims"
              value={stats.activeClaims}
              icon={Package}
              trend={{ value: stats.activeClaimsTrend, label: "from last month" }}
            />
            <StatCard
              title="Pending Matches"
              value={stats.pendingMatches}
              icon={SearchCode}
              trend={{ value: stats.pendingMatchesTrend, label: "new this week" }}
            />
            <StatCard
              title="Items Recovered"
              value={stats.itemsRecovered}
              icon={CheckCircle2}
            />
            <StatCard
              title="Success Rate"
              value={`${stats.successRate}%`}
              icon={ArrowUpRight}
              trend={{ value: stats.successRateTrend, label: "vs average" }}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest notifications and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingNotifs ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3 p-3 border rounded-lg">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <NotificationCard
                    key={activity.id}
                    title={activity.title}
                    body={activity.body}
                    timestamp={activity.createdAt}
                    type={activity.type}
                    isRead={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Bell}
                title="No recent activity"
                description="When there are updates about your items, they will appear here."
              />
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Matches</CardTitle>
            <CardDescription>
              Items that closely match your reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={SearchCode}
              title="No matches yet"
              description="Our AI is scanning the network. We'll notify you when we find a match."
              action={{
                label: "Report another item",
                onClick: () => window.location.href = '/report/lost'
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
