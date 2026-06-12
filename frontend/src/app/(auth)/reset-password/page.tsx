import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ResetPasswordForm from './reset-password-form';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
