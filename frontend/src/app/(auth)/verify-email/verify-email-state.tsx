'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import { Loader2, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export default function VerifyEmailState() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const verifyToken = async (verifyToken: string) => {
    setIsVerifying(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (verifyToken === 'invalid') {
        throw new Error('This verification link is invalid or has expired.');
      }
      
      setIsVerified(true);
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to verify email');
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    // If there's a token, automatically attempt to verify
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const handleResend = async () => {
    setIsResending(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Verification email resent', {
        description: 'Please check your inbox and spam folder.',
      });
    } catch (err) {
      toast.error('Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Verifying Email</h1>
          <p className="text-sm text-muted-foreground">
            Please wait while we verify your email address...
          </p>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-6 w-6 text-success" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Email Verified</h1>
          <p className="text-sm text-muted-foreground">
            Your email address has been successfully verified. You can now access
            all features of ReclaimAI.
          </p>
        </div>
        <div className="pt-4">
          <Link href="/dashboard" className={buttonVariants({ className: "w-full" })}>
            Continue to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (error || token === 'invalid') {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Verification Failed</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <div className="space-y-3 pt-4">
          <Button onClick={handleResend} disabled={isResending} className="w-full">
            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Resend verification email
          </Button>
          <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full" })}>
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Mail className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a verification link to{' '}
          <span className="font-medium text-foreground">
            {email || 'your email'}
          </span>
          . Please check your inbox and click the link to verify your account.
        </p>
      </div>
      <div className="space-y-4 pt-4">
        <Button onClick={handleResend} disabled={isResending} className="w-full">
          {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Resend verification email
        </Button>
        <p className="text-sm text-muted-foreground">
          Wrong email?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Try registering again
          </Link>
        </p>
      </div>
    </div>
  );
}
