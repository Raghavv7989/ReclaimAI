export type UserDTO = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
};

export type NotificationType = 'match_found' | 'message_received' | 'item_update' | 'system';

export type NotificationDTO = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
};

export type ItemType = 'lost' | 'found';
export type ItemStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export type ItemDTO = {
  id: string;
  userId: string;
  type: ItemType;
  title: string;
  description: string;
  category: string;
  status: ItemStatus;
  location: string;
  dateReported: string;
  matchesCount: number;
  imageUrl?: string;
};

export type MatchScoreDTO = {
  visual: number;
  semantic: number;
  location: number;
  time: number;
  overall: number;
};

export type MatchStatus = 'pending' | 'approved' | 'rejected';

export type MatchDTO = {
  id: string;
  lostItemId: string;
  foundItemId: string;
  scores: MatchScoreDTO;
  status: MatchStatus;
  createdAt: string;
  // Included for UI convenience, would typically be expanded by backend
  lostItem?: ItemDTO;
  foundItem?: ItemDTO;
};

export type DashboardStatsDTO = {
  activeClaims: number;
  activeClaimsTrend: number;
  pendingMatches: number;
  pendingMatchesTrend: number;
  itemsRecovered: number;
  itemsRecoveredTrend?: number;
  successRate: number;
  successRateTrend: number;
};

export type AdminAnalyticsDTO = {
  totalUsers: number;
  totalUsersTrend: number;
  activeItems: number;
  activeItemsTrend: number;
  aiMatches: number;
  aiMatchesTrend: number;
  globalRecoveryRate: number;
  globalRecoveryRateTrend: number;
  matchTrendData: Array<{ name: string; matches: number; claims: number }>;
  resolutionTrendData: Array<{ month: string; resolved: number }>;
};
