'use client';

import Link from 'next/link';
import { Radar } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Left pane - branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
            <Radar className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">ReclaimAI</span>
        </Link>
        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight">
            Find what you lost.
            <br />
            Return what you found.
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Join the world's most advanced AI-powered recovery network.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/50">
          &copy; {new Date().getFullYear()} ReclaimAI. All rights reserved.
        </p>
      </div>

      {/* Right pane - forms */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Radar className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">ReclaimAI</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
