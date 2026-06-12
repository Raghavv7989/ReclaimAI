'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Send, User, Clock, CheckCircle2, ChevronLeft, Inbox, ShieldAlert } from 'lucide-react';
import { useMockConversations } from '@/lib/mocks/hooks';
import { MessageDTO } from '@/lib/mocks/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';

export default function MessagesPage() {
  const { data: conversations, isLoading } = useMockConversations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preserve selected conversation on refresh by storing in sessionStorage
    const stored = sessionStorage.getItem('selectedConversationId');
    if (stored && !selectedId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(stored);
    }
  }, [selectedId]);

  useEffect(() => {
    if (selectedId) {
      sessionStorage.setItem('selectedConversationId', selectedId);
      // Auto-scroll to latest message when conversation is selected
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      sessionStorage.removeItem('selectedConversationId');
    }
  }, [selectedId]);

  // Also auto-scroll if messages change (though we only have mock static ones here)
  useEffect(() => {
    if (selectedId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedId, conversations]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHours = Math.round(diffMins / 60);
      const diffDays = Math.round(diffHours / 24);

      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
    } catch {
      return dateStr;
    }
  };

  const filteredConversations = conversations?.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations?.find(c => c.id === selectedId);

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] flex flex-col -mx-4 md:mx-0 md:border md:rounded-xl overflow-hidden bg-background">
      
      {/* Mobile Header (When viewing a conversation) */}
      <div className={`md:hidden p-4 border-b flex items-center gap-3 ${!selectedId ? 'hidden' : ''}`}>
        <Button variant="ghost" size="icon" onClick={() => setSelectedId(null)} className="-ml-2 shrink-0">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold truncate">{selectedConversation?.title}</h2>
          <p className="text-xs text-muted-foreground truncate">
            {selectedConversation?.id === 'CONV-1' ? 'Typically replies in 2 hours' : 
             selectedConversation?.id === 'CONV-2' ? 'Official Recovery Agent' : 'Automated messages'}
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar (List) */}
        <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col bg-muted/10 ${selectedId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold tracking-tight mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredConversations?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>No conversations found.</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredConversations?.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`w-full p-4 flex gap-3 text-left hover:bg-muted/50 transition-colors ${selectedId === conv.id ? 'bg-primary/5' : ''}`}
                  >
                    <div className="relative shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground ${conv.id === 'CONV-3' ? 'bg-zinc-500' : 'bg-primary'}`}>
                        {conv.id === 'CONV-1' ? <ShieldAlert className="h-5 w-5" /> : 
                         conv.id === 'CONV-3' ? <Inbox className="h-5 w-5" /> : 
                         <User className="h-5 w-5" />}
                      </div>
                      {conv.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive flex items-center justify-center text-[10px] font-bold text-destructive-foreground border-2 border-background">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className={`font-semibold truncate pr-2 ${conv.unreadCount > 0 ? 'text-foreground' : 'text-foreground/80'}`}>
                          {conv.title}
                        </h3>
                        {conv.lastMessage && (
                          <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                            {formatDate(conv.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {conv.lastMessage?.content || 'No messages yet'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className={`flex-1 flex flex-col ${!selectedId ? 'hidden md:flex' : 'flex'}`}>
          {!selectedId ? (
            <div className="hidden md:flex flex-1 items-center justify-center p-8 bg-muted/5">
              <EmptyState 
                icon={Inbox}
                title="Your Messages"
                description="Select a conversation from the sidebar to view your messages and updates."
              />
            </div>
          ) : !selectedConversation ? (
            <div className="flex-1 items-center justify-center p-8">
              <p className="text-center text-muted-foreground">Conversation not found.</p>
            </div>
          ) : (
            <>
              {/* Desktop Header */}
              <div className="hidden md:flex p-4 border-b items-center gap-3 bg-background">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground ${selectedConversation.id === 'CONV-3' ? 'bg-zinc-500' : 'bg-primary'}`}>
                  {selectedConversation.id === 'CONV-1' ? <ShieldAlert className="h-5 w-5" /> : 
                   selectedConversation.id === 'CONV-3' ? <Inbox className="h-5 w-5" /> : 
                   <User className="h-5 w-5" />}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedConversation.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.id === 'CONV-1' ? 'Typically replies in 2 hours' : 
                     selectedConversation.id === 'CONV-2' ? 'Official Recovery Agent' : 'Automated messages'}
                  </p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/5">
                {selectedConversation.messages?.map((msg: MessageDTO, i: number) => {
                  const isMe = msg.senderId === 'USR-1';
                  
                  // Add date separator if date changed
                  let showDateSeparator = false;
                  if (i === 0) {
                    showDateSeparator = true;
                  } else {
                    const prevDate = new Date(selectedConversation.messages![i - 1].createdAt).toDateString();
                    const currDate = new Date(msg.createdAt).toDateString();
                    if (prevDate !== currDate) showDateSeparator = true;
                  }

                  return (
                    <div key={msg.id}>
                      {showDateSeparator && (
                        <div className="flex justify-center mb-6 mt-2">
                          <Badge variant="outline" className="bg-background text-muted-foreground font-normal text-xs px-2 py-0.5">
                            {new Date(msg.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                          </Badge>
                        </div>
                      )}
                      <div className={`flex gap-3 ${isMe ? 'justify-end' : ''}`}>
                        {!isMe && (
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground shrink-0 mt-auto mb-1 ${selectedConversation.id === 'CONV-3' ? 'bg-zinc-500' : 'bg-primary'}`}>
                            {selectedConversation.id === 'CONV-1' ? <ShieldAlert className="h-4 w-4" /> : 
                             selectedConversation.id === 'CONV-3' ? <Inbox className="h-4 w-4" /> : 
                             <User className="h-4 w-4" />}
                          </div>
                        )}
                        <div className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                          {!isMe && <span className="text-xs text-muted-foreground mb-1 ml-1">{msg.senderName}</span>}
                          <div className={`px-4 py-2.5 rounded-2xl ${isMe ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted border rounded-bl-sm'}`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground px-1">
                            {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            {isMe && <CheckCircle2 className="h-3 w-3 text-muted-foreground" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Composer */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    disabled 
                    className="flex-1 bg-muted/30"
                  />
                  <Button disabled size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  Direct messaging will become available once active claims are initiated.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
