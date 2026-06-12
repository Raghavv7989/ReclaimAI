'use client';

import { AdminTopbar } from '@/components/layout/admin-topbar';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, ListTodo, SearchCode, Users, ShieldAlert, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { href: '/admin/analytics', label: 'Stats', icon: BarChart3 },
  { href: '/admin/claims', label: 'Claims', icon: ListTodo },
  { href: '/admin/matches', label: 'Matches', icon: SearchCode },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t bg-background md:hidden">
      <nav className="flex w-full items-center justify-around px-2 pb-safe">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-2 py-1 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr] lg:grid-cols-[288px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-8 bg-muted/10">
          {children}
        </main>
        <AdminMobileNav />
      </div>
    </div>
  );
}
