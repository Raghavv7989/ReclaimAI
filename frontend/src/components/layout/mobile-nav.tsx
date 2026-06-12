'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, PlusCircle, SearchCode, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/matches', label: 'Matches', icon: SearchCode },
  { href: '/report/lost', label: 'Report', icon: PlusCircle, primary: true },
  { href: '/items', label: 'Items', icon: Package },
  { href: '/notifications', label: 'Alerts', icon: Bell },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t bg-background md:hidden">
      <nav className="flex w-full items-center justify-around px-2 pb-safe">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          if (item.primary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center justify-center p-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-active:scale-95">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          }

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
