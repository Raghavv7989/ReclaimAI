'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Search, Filter, PlusCircle, MoreHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/ui/status-badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useMockItems } from '@/lib/mocks/hooks';

export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabFilter, setTabFilter] = useState('all');
  const { data: items, isLoading } = useMockItems();

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = tabFilter === 'all' || item.type === tabFilter;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Items</h1>
          <p className="text-muted-foreground">
            Track your reported lost and found items.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/report/lost" className={buttonVariants()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Report Item
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Tabs defaultValue="all" className="w-full sm:w-[400px]" onValueChange={setTabFilter}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
            <TabsTrigger value="found">Found</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="flex flex-col h-[280px]">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-8" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="flex-1 space-y-4 mt-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-8 rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant={item.type === 'lost' ? 'destructive' : 'default'} className="mb-2 uppercase">
                    {item.type}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="-mr-2 -mt-2" />}>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={`/items/${item.id}`} />}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Report</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                <CardDescription>
                  {item.dateReported} • {item.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <StatusBadge status={item.status} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Potential Matches</span>
                  <Badge variant="secondary">{item.matchesCount}</Badge>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Link href={`/matches?itemId=${item.id}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                  View Matches
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={Package}
              title="No items found"
              description="You haven't reported any items yet, or none match your search."
              action={{
                label: "Report an item",
                onClick: () => window.location.href = '/report/lost'
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
