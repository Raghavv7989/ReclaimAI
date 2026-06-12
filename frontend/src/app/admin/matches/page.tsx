'use client';

import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SimilarityGauge } from '@/components/ui/similarity-gauge';
import { ScoreBreakdown } from '@/components/ui/score-breakdown';
import { Skeleton } from '@/components/ui/skeleton';
import { useMockMatches } from '@/lib/mocks/hooks';

export default function AdminMatchesPage() {
  const { data: matches, isLoading } = useMockMatches();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Match Review Queue</h1>
        <p className="text-muted-foreground">
          Review potential matches flagged by the AI before notifying users.
        </p>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="grid lg:grid-cols-[1fr_300px] h-[400px]">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-b lg:border-b-0 lg:border-r">
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex justify-between"><Skeleton className="h-5 w-24" /><Skeleton className="h-4 w-16" /></div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                  <div className="flex-1 p-6 space-y-4 bg-muted/20">
                    <div className="flex justify-between"><Skeleton className="h-5 w-24" /><Skeleton className="h-4 w-16" /></div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between bg-muted/10">
                  <div className="space-y-6">
                    <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  <div className="space-y-3 mt-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : matches.length > 0 ? (
          matches.map((match) => (
            <Card key={match.id} className="overflow-hidden">
              <div className="grid lg:grid-cols-[1fr_300px]">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-b lg:border-b-0 lg:border-r">
                  {/* Lost Item */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="destructive">LOST ITEM</Badge>
                      <span className="text-sm text-muted-foreground">ID: {match.lostItem?.id}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{match.lostItem?.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {match.lostItem?.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Date:</div>
                      <div className="font-medium text-right">{match.lostItem?.dateReported}</div>
                      <div className="text-muted-foreground">Location:</div>
                      <div className="font-medium text-right line-clamp-1">{match.lostItem?.location}</div>
                    </div>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center border border-dashed">
                      <span className="text-muted-foreground">No Image Provided</span>
                    </div>
                  </div>

                  {/* Found Item */}
                  <div className="flex-1 p-6 space-y-4 bg-muted/20">
                    <div className="flex items-center justify-between">
                      <Badge variant="default">FOUND ITEM</Badge>
                      <span className="text-sm text-muted-foreground">ID: {match.foundItem?.id}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{match.foundItem?.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {match.foundItem?.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Date:</div>
                      <div className="font-medium text-right">{match.foundItem?.dateReported}</div>
                      <div className="text-muted-foreground">Location:</div>
                      <div className="font-medium text-right line-clamp-1">{match.foundItem?.location}</div>
                    </div>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white/50 text-sm">
                        Image.jpg
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Score & Actions */}
                <div className="p-6 flex flex-col justify-between bg-muted/10">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="font-medium text-sm text-muted-foreground mb-4">AI Match Confidence</h4>
                      <SimilarityGauge score={match.scores.overall} size="lg" className="mx-auto" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-3">Score Breakdown</h4>
                      <ScoreBreakdown 
                        scores={{
                          image_score: match.scores.visual,
                          text_score: match.scores.semantic,
                          location_score: match.scores.location,
                          time_score: match.scores.time
                        }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <Link href={`/matches/${match.id}`} className={buttonVariants({ variant: "outline", className: "w-full focus-visible:ring-2 focus-visible:ring-primary" })}>
                      View Match Details
                    </Link>
                    <Button className="w-full bg-success hover:bg-success/90 text-success-foreground">
                      <Check className="mr-2 h-4 w-4" /> Approve Match
                    </Button>
                    <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10">
                      <X className="mr-2 h-4 w-4" /> Reject Match
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-muted-foreground p-12 border rounded-lg bg-muted/5">
            No matches pending review.
          </div>
        )}
      </div>
    </div>
  );
}
