'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, MoreHorizontal, FileDown, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useMockItems } from '@/lib/mocks/hooks';

export default function AdminClaimsPage() {
  const router = useRouter();
  const { data: claims, isLoading } = useMockItems();
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClaims = claims.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAll = () => {
    if (selectedClaims.length === filteredClaims.length) {
      setSelectedClaims([]);
    } else {
      setSelectedClaims(filteredClaims.map(c => c.id));
    }
  };

  const toggleClaim = (id: string) => {
    if (selectedClaims.includes(id)) {
      setSelectedClaims(selectedClaims.filter(c => c !== id));
    } else {
      setSelectedClaims([...selectedClaims, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Claims Queue</h1>
          <p className="text-muted-foreground">
            Manage and review all reported lost and found items.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search claims by ID, item, or user..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {selectedClaims.length > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <span className="text-sm font-medium">{selectedClaims.length} selected</span>
            <Button size="sm" variant="outline" className="text-success border-success/20 hover:bg-success/10">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10">
              <Trash2 className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={selectedClaims.length === filteredClaims.length && filteredClaims.length > 0} 
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Claim ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Filed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center"><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredClaims.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No claims found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClaims.map((claim) => (
                  <TableRow 
                    key={claim.id} 
                    className="group cursor-pointer hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:bg-muted/50"
                    tabIndex={0}
                    onClick={() => router.push(`/item/${claim.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        router.push(`/item/${claim.id}`);
                      }
                    }}
                  >
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedClaims.includes(claim.id)} 
                        onCheckedChange={() => toggleClaim(claim.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>{claim.title}</TableCell>
                    <TableCell>
                      <Badge variant={claim.type === 'lost' ? 'destructive' : 'default'} className="text-[10px] uppercase">
                        {claim.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{claim.dateReported}</TableCell>
                    <TableCell>
                      <StatusBadge status={claim.status} />
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 focus:opacity-100" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/item/${claim.id}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Contact User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
