'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, MapPin, User, Image as ImageIcon, AlertCircle, Search, ShieldCheck, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useMockItems, useMockMatches } from '@/lib/mocks/hooks';
import { ItemDTO } from '@/lib/mocks/types';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Timeline } from '@/components/ui/timeline';
import { SimilarityGauge } from '@/components/ui/similarity-gauge';
import { ScoreBreakdown } from '@/components/ui/score-breakdown';
import { EmptyState } from '@/components/ui/empty-state';

export function ItemDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: items, isLoading: isLoadingItems } = useMockItems();
  const { data: matches, isLoading: isLoadingMatches } = useMockMatches();
  
  const item = items?.find(i => i.id === id) || null;

  const handleAction = () => {
    toast.success(
      item?.type === 'lost' 
        ? 'Claim request submitted! We will notify the finder.' 
        : 'Thank you! The original owner has been notified.'
    );
  };

  if (isLoadingItems || isLoadingMatches) {
    return <ItemDetailSkeleton />;
  }

  if (!item && !isLoadingItems) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <EmptyState
          icon={Search}
          title="Item Not Found"
          description="The item you are looking for does not exist or has been removed."
          action={{
            label: "Back to Explore",
            onClick: () => router.push('/explore')
          }}
        />
      </div>
    );
  }

  if (!item) return null;

  // Build timeline based on status
  const timelineItems: Array<{
    id: string;
    title: string;
    date: string;
    status: 'completed' | 'active' | 'pending';
    icon: LucideIcon;
    description?: string;
  }> = [
    {
      id: '1',
      title: 'Report Submitted',
      date: item.dateReported,
      status: 'completed' as const,
      icon: ShieldCheck,
      description: 'The item was officially reported in our system.'
    },
    {
      id: '2',
      title: 'AI Matching Started',
      date: item.dateReported,
      status: 'completed' as const,
      icon: Search,
    },
  ];

  if (item.status === 'in_progress' || item.status === 'resolved') {
    timelineItems.push({
      id: '3',
      title: 'Potential Match Found',
      date: 'Recent',
      status: 'completed' as const,
      icon: CheckCircle2,
      description: 'Our AI found strong similarities with another reported item.'
    });
    timelineItems.push({
      id: '4',
      title: 'Claim Processing',
      date: 'Recent',
      status: item.status === 'resolved' ? 'completed' : 'active',
      icon: Clock,
    });
  } else {
    timelineItems.push({
      id: '3',
      title: 'Scanning for Matches',
      date: 'Ongoing',
      status: 'active' as const,
      icon: Clock,
      description: 'We are continuously checking new reports.'
    });
  }

  if (item.status === 'resolved') {
    timelineItems.push({
      id: '5',
      title: 'Resolved',
      date: 'Just now',
      status: 'completed' as const,
      icon: CheckCircle2,
      description: 'The item has been successfully returned.'
    });
  }

  // Find a related match just for the insights display
  const relatedMatch = matches.find(m => m.lostItemId === item.id || m.foundItemId === item.id);

  // Find related items (mock: just take 3 other items of opposite type)
  const relatedItems = items
    .filter(i => i.type !== item.type && i.id !== item.id)
    .slice(0, 3);

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-8">
      {/* Back Navigation */}
      <Button variant="ghost" onClick={() => router.back()} className="-ml-4 mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={item.type === 'lost' ? 'destructive' : 'default'} className="uppercase">
              {item.type}
            </Badge>
            <StatusBadge status={item.status} />
            <span className="text-sm text-muted-foreground border-l pl-3">
              ID: {item.id}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          {item.type === 'lost' ? (
            <>
              <Button variant="outline" className="flex-1 md:flex-none">Contact Support</Button>
              <Button onClick={handleAction} className="flex-1 md:flex-none">Claim This Match</Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="flex-1 md:flex-none">Report Incorrect Info</Button>
              <Button onClick={handleAction} className="flex-1 md:flex-none">I Found This Item</Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Images & Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video bg-muted border rounded-xl flex items-center justify-center overflow-hidden relative">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground/50">
                  <ImageIcon className="h-16 w-16 mb-2" />
                  <span>No image provided</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails (Mocked) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 w-32 bg-muted border rounded-md flex-shrink-0 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                  <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Item Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Item Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Location</h4>
                    <p className="text-muted-foreground text-sm mt-1">{item.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Date Reported</h4>
                    <p className="text-muted-foreground text-sm mt-1">{item.dateReported}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Reporter</h4>
                    <p className="text-muted-foreground text-sm mt-1">Anonymous User (Verified)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Matches Grid */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold">Similar Items</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedItems.map(related => (
                <Card key={related.id} className="overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push(`/item/${related.id}`)}>
                  <div className="h-32 bg-muted flex items-center justify-center border-b">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className="text-[10px]">{related.type}</Badge>
                      <span className="text-[10px] text-muted-foreground">{related.dateReported}</span>
                    </div>
                    <CardTitle className="text-sm line-clamp-1 group-hover:text-primary transition-colors">{related.title}</CardTitle>
                    <CardDescription className="text-xs line-clamp-1 mt-1">{related.location}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Timeline & AI Insights */}
        <div className="space-y-8">
          
          {/* AI Match Insights */}
          {relatedMatch && (
            <Card className="border-primary/20 bg-primary/5 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5 text-primary" />
                  AI Match Insights
                </CardTitle>
                <CardDescription>
                  Our AI determined high confidence for a potential match.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6">
                  <SimilarityGauge score={relatedMatch.scores.overall} size="lg" />
                  <ScoreBreakdown 
                    className="w-full"
                    scores={{
                      image_score: relatedMatch.scores.visual,
                      text_score: relatedMatch.scores.semantic,
                      location_score: relatedMatch.scores.location,
                      time_score: relatedMatch.scores.time
                    }} 
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lifecycle Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline items={timelineItems} />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

function ItemDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 space-y-8">
      <Skeleton className="h-10 w-24 mb-4" />
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-96" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-20 w-32 rounded-md" />
            <Skeleton className="h-20 w-32 rounded-md" />
            <Skeleton className="h-20 w-32 rounded-md" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="space-y-8">
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
