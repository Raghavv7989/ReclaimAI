'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar as CalendarIcon, Filter, SearchCode, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { useMockItems } from '@/lib/mocks/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ExplorePage() {
  const { data: items, isLoading } = useMockItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState('');

  // Apply filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesLocation = locationFilter === '' || item.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // We don't have category on the mock ItemDTO currently, but we'll simulate it by searching the title/desc
    const matchesCategory = categoryFilter === 'all' || 
                            item.title.toLowerCase().includes(categoryFilter) || 
                            item.description.toLowerCase().includes(categoryFilter);

    return matchesSearch && matchesType && matchesLocation && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Explore the Network
          </h1>
          <p className="text-lg text-muted-foreground">
            Search across our global database of reported lost and found items.
            Our AI matches descriptions to connect people with their belongings.
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-card border rounded-lg p-4 space-y-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for an item (e.g., 'MacBook Pro', 'Keys', 'Wallet')..."
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Item Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="lost">Lost Items</SelectItem>
                <SelectItem value="found">Found Items</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="keys">Keys</SelectItem>
                <SelectItem value="wallet">Wallets & Bags</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="pets">Pets</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location..."
                className="pl-8"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Date Reported
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              {isLoading ? 'Loading results...' : `${filteredItems.length} items found`}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Sorted by Newest</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="flex flex-col overflow-hidden h-[360px]">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <CardHeader className="pb-2 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="flex flex-col overflow-hidden group hover:border-primary/50 transition-colors">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-muted flex items-center justify-center border-b relative">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                    <Badge variant={item.type === 'lost' ? 'destructive' : 'default'} className="absolute top-3 left-3 uppercase shadow-sm">
                      {item.type}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.dateReported}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                    <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {item.description}
                    </CardDescription>
                    
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="line-clamp-1">{item.location}</span>
                    </div>
                  </CardHeader>
                  
                  <CardFooter className="pt-0 pb-4 px-6 border-t mt-auto flex flex-col gap-3">
                    {/* Simulated similarity score if it were a match context, but here it's just explore. 
                        We can show a relevance score if searching. */}
                    {searchQuery && (
                      <div className="w-full flex items-center justify-between text-xs mt-3">
                        <span className="text-muted-foreground">Relevance</span>
                        <span className="font-medium text-primary">High</span>
                      </div>
                    )}
                    <Link href={`/item/${item.id}`} className={buttonVariants({ variant: "default", className: "w-full mt-3" })}>
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <EmptyState
                  icon={SearchCode}
                  title="No items found"
                  description="We couldn't find any items matching your current filters. Try adjusting your search criteria."
                  action={{
                    label: "Clear filters",
                    onClick: () => {
                      setSearchQuery('');
                      setTypeFilter('all');
                      setCategoryFilter('all');
                      setLocationFilter('');
                    }
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
