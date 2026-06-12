'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Users, Package, SearchCode, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useMockAdminAnalytics } from '@/lib/mocks/hooks';

const chartConfig = {
  matches: {
    label: "Matches Found",
    color: "hsl(var(--primary))",
  },
  claims: {
    label: "Claims Filed",
    color: "hsl(var(--muted-foreground))",
  },
};

const resolutionConfig = {
  resolved: {
    label: "Resolved Cases",
    color: "hsl(var(--success))",
  },
};

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useMockAdminAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Platform performance, recovery trends, and system metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading || !analytics ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-32 animate-pulse bg-muted/50" />
          ))
        ) : (
          <>
            <StatCard
              title="Total Users"
              value={analytics.totalUsers.toLocaleString()}
              icon={Users}
              trend={{ value: analytics.totalUsersTrend, label: "from last month" }}
              href="/admin/analytics"
            />
            <StatCard
              title="Active Items"
              value={analytics.activeItems.toLocaleString()}
              icon={Package}
              trend={{ value: analytics.activeItemsTrend, label: "from last month" }}
              href="/admin/claims"
            />
            <StatCard
              title="AI Matches Generated"
              value={analytics.aiMatches.toLocaleString()}
              icon={SearchCode}
              trend={{ value: analytics.aiMatchesTrend, label: "from last month" }}
              href="/admin/matches"
            />
            <StatCard
              title="Global Recovery Rate"
              value={`${analytics.globalRecoveryRate}%`}
              icon={ArrowUpRight}
              trend={{ value: analytics.globalRecoveryRateTrend, label: "vs average" }}
              href="/admin/analytics"
            />
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Matches and claims over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading || !analytics ? (
              <div className="flex flex-col justify-end gap-2 h-[300px] pb-4 px-4 items-end">
                <div className="w-full flex items-end gap-4 h-full pt-8">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="w-full flex gap-1 items-end h-full">
                      <Skeleton className="w-1/2 rounded-t-sm" style={{ height: `${[30, 50, 40, 70, 45, 60, 35][i]}%` }} />
                      <Skeleton className="w-1/2 rounded-t-sm" style={{ height: `${[40, 60, 55, 80, 65, 75, 50][i]}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={analytics.matchTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="matches" fill="var(--color-matches)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="claims" fill="var(--color-claims)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Resolution Trend</CardTitle>
            <CardDescription>Successfully recovered items over time.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading || !analytics ? (
              <div className="flex justify-center items-center h-[300px] p-4 w-full">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : (
              <ChartContainer config={resolutionConfig} className="h-[300px] w-full">
                <LineChart data={analytics.resolutionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="var(--color-resolved)" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
