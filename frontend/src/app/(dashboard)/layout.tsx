'use client';

import { MobileNav } from '@/components/layout/mobile-nav';
import { DashboardTopbar } from '@/components/layout/dashboard-topbar';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr] lg:grid-cols-[288px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-8 bg-muted/10">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
