'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, MapPin, XCircle, Search, ShieldAlert, ArrowRightLeft, Image as ImageIcon, Map as MapIcon, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useMockMatches, useMockItems } from '@/lib/mocks/hooks';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Timeline } from '@/components/ui/timeline';
import { SimilarityGauge } from '@/components/ui/similarity-gauge';
import { ScoreBreakdown } from '@/components/ui/score-breakdown';
import { EmptyState } from '@/components/ui/empty-state';
import { ItemDTO } from '@/lib/mocks/types';

export function MatchDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: matches, isLoading: isLoadingMatches } = useMockMatches();
  const { data: items, isLoading: isLoadingItems } = useMockItems();
  
  const match = matches?.find(m => m.id === id) || null;
  
  const handleClaim = () => {
    toast.success('Claim submitted successfully!', {
      description: 'We will review your claim and notify the finder.'
    });
    router.push('/items');
  };

  const handleReject = () => {
    toast.success('Match rejected.', {
      description: 'This match will no longer appear in your active matches.'
    });
    router.push('/matches');
  };

  if (isLoadingMatches || isLoadingItems) {
    return <MatchDetailSkeleton />;
  }

  if (!match) {
    return (
      <div className="py-12 px-4 max-w-5xl mx-auto">
        <EmptyState
          icon={Search}
          title="Match Not Found"
          description="The match you are looking for does not exist or has been removed."
          action={{
            label: "Back to Matches",
            onClick: () => router.push('/matches')
          }}
        />
      </div>
    );
  }

  // Attempt to resolve full item details
  const lostItem = match.lostItem || items.find(i => i.id === match.lostItemId);
  const foundItem = match.foundItem || items.find(i => i.id === match.foundItemId);

  const percentage = Math.round(match.scores.overall * 100);
  let confidenceColor = 'text-primary';
  if (percentage >= 80) confidenceColor = 'text-success';
  else if (percentage < 50) confidenceColor = 'text-destructive';

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(d);
    } catch {
      return dateStr;
    }
  };

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
      title: 'Match Created',
      date: formatDate(match.createdAt),
      status: 'completed',
      icon: Search,
      description: 'AI identified a potential match.'
    },
    {
      id: '2',
      title: 'User Notified',
      date: formatDate(match.createdAt),
      status: 'completed',
      icon: Clock,
      description: 'Both parties were alerted.'
    },
    {
      id: '3',
      title: 'Claim Submitted',
      date: match.status !== 'pending' ? 'Recent' : 'Pending',
      status: match.status !== 'pending' ? 'completed' : 'active',
      icon: ShieldAlert,
    },
    {
      id: '4',
      title: 'Review Completed',
      date: match.status === 'approved' ? 'Just now' : 'Pending',
      status: match.status === 'approved' ? 'completed' : 'pending',
      icon: CheckCircle2,
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <Button variant="ghost" onClick={() => router.back()} className="-ml-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Matches
      </Button>

      {/* 1. Match Summary */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className="uppercase bg-background/80">
            {match.status}
          </Badge>
          <span className="text-sm text-muted-foreground border-l pl-3">
            Match ID: {match.id.substring(0,8)}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Match Review</h1>
        <p className="text-muted-foreground max-w-2xl">
          Our AI has determined a <span className={`font-semibold ${confidenceColor}`}>{percentage}% probability</span> that these two reported items are the same object.
        </p>
      </div>
      
      {/* AI Recommendation Card */}
      <Card className="border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="pt-6 flex gap-4 items-start">
          <Search className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">AI Recommendation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              High confidence match based on strong visual similarity and close geographic proximity. Both items share identical distinguishing features (enamel pins) and were reported within a highly correlated timeframe.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* 2. Actions */}
      {match.status === 'pending' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="default" onClick={handleClaim} className="flex-1">Claim This Match</Button>
          <Button variant="outline" onClick={handleReject} className="flex-1 text-destructive hover:bg-destructive/10">Reject Match</Button>
        </div>
      )}

      {/* 3. Side-by-Side Comparison */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight">Side-by-Side Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
            <div className="bg-background border shadow-sm rounded-full p-2">
              <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <ItemCard item={lostItem} title="Reported Lost" />
          <ItemCard item={foundItem} title="Reported Found" />
        </div>
      </div>

      {/* 4. Similarity Analysis */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight">Similarity Analysis</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <SimilarityGauge score={match.scores.overall} size="lg" />
              <ScoreBreakdown 
                className="w-full max-w-xs"
                scores={{
                  image_score: match.scores.visual,
                  text_score: match.scores.semantic,
                  location_score: match.scores.location,
                  time_score: match.scores.time
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Location Insights */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight">Location Insights</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mb-6">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" /> AI Location Analysis
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The items were reported within a <strong>0.5 mile</strong> radius of each other. 
                Given the high foot traffic of this transit corridor, items are frequently recovered 
                along this specific route within 24-48 hours. The proximity strongly supports a match.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-destructive flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Lost Location
                </h4>
                <p className="text-sm text-muted-foreground pl-6">{lostItem?.location || 'Unknown'}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-success flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Found Location
                </h4>
                <p className="text-sm text-muted-foreground pl-6">{foundItem?.location || 'Unknown'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 6. Timeline */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight">Match Lifecycle</h2>
        <Card>
          <CardContent className="pt-6">
            <Timeline items={timelineItems} />
          </CardContent>
        </Card>
      </div>
      
      {/* 7. Notes (Support Actions) */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight">Notes & Support</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Need help with this match or have additional information? Our support team is available to mediate the return process.
            </p>
            <Link href="/contact" className={buttonVariants({ variant: "outline", className: "w-full md:w-auto" })}>
              Contact Support
            </Link>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

function MatchDetailSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <Skeleton className="h-10 w-24 mb-4" />
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="space-y-8">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

const ItemCard = ({ item, title }: { item?: ItemDTO, title: string }) => {
  if (!item) return <div className="h-full flex items-center justify-center border rounded-lg p-6 text-muted-foreground">Item data unavailable</div>;
  return (
    <Card className="h-full flex flex-col">
      <div className="h-48 bg-muted flex items-center justify-center border-b relative">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
        )}
        <Badge variant={item.type === 'lost' ? 'destructive' : 'default'} className="absolute top-3 left-3 uppercase">
          {item.type}
        </Badge>
      </div>
      <CardHeader className="flex-1">
        <p className="text-sm font-medium text-primary mb-1">{title}</p>
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <CardDescription className="line-clamp-3 mt-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{item.location}</span>
        </div>
        <div className="flex gap-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{item.dateReported}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 border-t mt-auto px-6 pb-4">
        <Link href={`/item/${item.id}`} className={buttonVariants({ variant: "outline", className: "w-full mt-4" })}>
          View Original Report
        </Link>
      </CardFooter>
    </Card>
  );
};
