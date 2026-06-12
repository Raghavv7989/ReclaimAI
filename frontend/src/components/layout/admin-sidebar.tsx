'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radar, BarChart3, Users, Settings, SearchCode, ListTodo, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const navItems = [
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/claims', label: 'Claims Queue', icon: ListTodo },
  { href: '/admin/matches', label: 'Match Review', icon: SearchCode },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/audit', label: 'Audit Logs', icon: ShieldAlert },
  { href: '/admin/settings', label: 'System Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/30 md:block md:w-64 lg:w-72">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Radar className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="">ReclaimAI Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
            <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Administration
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                    isActive ? 'bg-muted text-primary hover:text-primary' : ''
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
