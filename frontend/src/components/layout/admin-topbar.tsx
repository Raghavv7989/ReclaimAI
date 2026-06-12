'use client';

import Link from 'next/link';
import { Radar } from 'lucide-react';
import { UserNav } from './user-nav';
import { AdminBreadcrumbs } from './admin-breadcrumbs';

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Link href="/admin" className="flex items-center gap-2 font-semibold md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Radar className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="sr-only">ReclaimAI Admin</span>
      </Link>
      
      <div className="flex flex-1 items-center justify-between md:justify-start">
        <AdminBreadcrumbs />
      </div>

      <div className="flex items-center gap-3">
        <UserNav />
      </div>
    </header>
  );
}
