import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import VerifyEmailState from './verify-email-state';

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="mx-auto h-9 w-48" />
            <Skeleton className="mx-auto h-5 w-72" />
          </div>
          <div className="space-y-4 pt-4">
            <Skeleton className="mx-auto h-10 w-full" />
            <Skeleton className="mx-auto h-5 w-40" />
          </div>
        </div>
      }
    >
      <VerifyEmailState />
    </Suspense>
  );
}
