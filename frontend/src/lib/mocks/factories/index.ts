import { 
  UserDTO, 
  NotificationDTO, 
  ItemDTO, 
  MatchDTO, 
  DashboardStatsDTO, 
  AdminAnalyticsDTO,
  NotificationType,
  ItemType,
  ItemStatus,
  MatchStatus,
  MessageDTO,
  ConversationDTO
} from '../types';

let idCounter = 1;
const generateId = (prefix: string) => `${prefix}-${Date.now()}-${idCounter++}`;

export const createUser = (overrides?: Partial<UserDTO>): UserDTO => ({
  id: generateId('USR'),
  name: 'John Doe',
  email: 'john.doe@example.com',
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createNotification = (overrides?: Partial<NotificationDTO>): NotificationDTO => ({
  id: generateId('NOTIF'),
  userId: 'USR-1',
  type: 'system' as NotificationType,
  title: 'System Notification',
  body: 'This is a system notification.',
  isRead: false,
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createItem = (overrides?: Partial<ItemDTO>): ItemDTO => ({
  id: generateId('ITM'),
  userId: 'USR-1',
  type: 'lost' as ItemType,
  title: 'Generic Item',
  description: 'A generic item description.',
  category: 'Electronics',
  status: 'pending' as ItemStatus,
  location: 'Unknown Location',
  dateReported: new Date().toISOString(),
  matchesCount: 0,
  ...overrides,
});

export const createMatch = (overrides?: Partial<MatchDTO>): MatchDTO => ({
  id: generateId('MCH'),
  lostItemId: 'ITM-1',
  foundItemId: 'ITM-2',
  status: 'pending' as MatchStatus,
  scores: {
    visual: 0.80,
    semantic: 0.85,
    location: 0.90,
    time: 0.95,
    overall: 0.88,
  },
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createDashboardStats = (overrides?: Partial<DashboardStatsDTO>): DashboardStatsDTO => ({
  activeClaims: 3,
  activeClaimsTrend: 2,
  pendingMatches: 12,
  pendingMatchesTrend: 5,
  itemsRecovered: 1,
  successRate: 33,
  successRateTrend: 12,
  ...overrides,
});

export const createAdminAnalytics = (overrides?: Partial<AdminAnalyticsDTO>): AdminAnalyticsDTO => ({
  totalUsers: 12345,
  totalUsersTrend: 12,
  activeItems: 8234,
  activeItemsTrend: 4,
  aiMatches: 45231,
  aiMatchesTrend: 24,
  globalRecoveryRate: 42,
  globalRecoveryRateTrend: 2,
  matchTrendData: [
    { name: 'Mon', matches: 400, claims: 240 },
    { name: 'Tue', matches: 300, claims: 139 },
    { name: 'Wed', matches: 200, claims: 980 },
    { name: 'Thu', matches: 278, claims: 390 },
    { name: 'Fri', matches: 189, claims: 480 },
    { name: 'Sat', matches: 239, claims: 380 },
    { name: 'Sun', matches: 349, claims: 430 },
  ],
  resolutionTrendData: [
    { month: 'Jan', resolved: 65 },
    { month: 'Feb', resolved: 78 },
    { month: 'Mar', resolved: 90 },
    { month: 'Apr', resolved: 81 },
    { month: 'May', resolved: 112 },
    { month: 'Jun', resolved: 145 },
  ],
  ...overrides,
});

export const createMessage = (overrides?: Partial<MessageDTO>): MessageDTO => ({
  id: generateId('MSG'),
  conversationId: 'CONV-1',
  senderId: 'SYS',
  senderName: 'System',
  content: 'This is a mock message.',
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createConversation = (overrides?: Partial<ConversationDTO>): ConversationDTO => ({
  id: generateId('CONV'),
  participantIds: ['USR-1', 'SYS'],
  title: 'Mock Conversation',
  unreadCount: 0,
  updatedAt: new Date().toISOString(),
  ...overrides,
});
