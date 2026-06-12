'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Calendar, MapPin, Image as ImageIcon, SearchCode } from 'lucide-react';
import { useMockMatches } from '@/lib/mocks/hooks';

import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MatchesPage() {
  const { data: matches, isLoading } = useMockMatches();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');

  const filteredMatches = matches.filter(match => {
    // Basic search on the associated items if they exist
    const searchLower = searchQuery.toLowerCase();
    const lostItemStr = match.lostItem?.title.toLowerCase() || '';
    const foundItemStr = match.foundItem?.title.toLowerCase() || '';
    const matchesSearch = lostItemStr.includes(searchLower) || foundItemStr.includes(searchLower);

    const matchesStatus = statusFilter === 'all' || match.status === statusFilter;
    
    let matchesConfidence = true;
    if (confidenceFilter === 'high') matchesConfidence = match.scores.overall >= 0.8;
    if (confidenceFilter === 'medium') matchesConfidence = match.scores.overall >= 0.5 && match.scores.overall < 0.8;
    if (confidenceFilter === 'low') matchesConfidence = match.scores.overall < 0.5;

    return matchesSearch && matchesStatus && matchesConfidence;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Matches</h1>
          <p className="text-muted-foreground">
            Review potential matches identified by our AI system.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search matches..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'all')}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={confidenceFilter} onValueChange={(val) => setConfidenceFilter(val || 'all')}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Confidence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (&gt;80%)</SelectItem>
                  <SelectItem value="medium">Medium (50-80%)</SelectItem>
                  <SelectItem value="low">Low (&lt;50%)</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="shrink-0" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-32 w-full rounded-none" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredMatches.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMatches.map(match => {
            const percentage = Math.round(match.scores.overall * 100);
            let confidenceColor = 'text-primary';
            if (percentage >= 80) confidenceColor = 'text-success';
            else if (percentage < 50) confidenceColor = 'text-destructive';

            const displayItem = match.lostItem || match.foundItem;
            
            return (
              <Card key={match.id} className="overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
                <div className="h-32 bg-muted relative flex items-center justify-center border-b">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center gap-1 border">
                    <div className={`h-2 w-2 rounded-full ${percentage >= 80 ? 'bg-success' : percentage >= 50 ? 'bg-primary' : 'bg-destructive'}`} />
                    <span className={`text-xs font-bold ${confidenceColor}`}>{percentage}% Match</span>
                  </div>
                  <Badge variant="outline" className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                    {match.status}
                  </Badge>
                </div>
                
                <CardHeader className="flex-1 pb-4">
                  <div className="flex justify-between items-start mb-1 text-xs text-muted-foreground">
                    <span>{match.createdAt}</span>
                    <span>ID: {match.id.substring(0,8)}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">
                    {displayItem?.title || 'Unknown Item'}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {displayItem?.description || 'No description available'}
                  </CardDescription>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1">{displayItem?.location || 'Unknown location'}</span>
                  </div>
                </CardHeader>
                
                <CardFooter className="pt-0 border-t mt-auto">
                  <Link href={`/matches/${match.id}`} className={buttonVariants({ variant: "default", className: "w-full mt-4" })}>
                    View Match Details
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <EmptyState
              icon={SearchCode}
              title="No matches found"
              description="We couldn't find any matches with the selected filters."
              action={{
                label: "Clear filters",
                onClick: () => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setConfidenceFilter('all');
                }
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
