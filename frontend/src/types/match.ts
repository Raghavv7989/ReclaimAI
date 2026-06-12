import type { Item } from './item';

export type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export interface MatchScoreBreakdown {
  composite_score: number;
  image_score: number;
  text_score: number;
  location_score: number;
  time_score: number;
}

export interface Match {
  id: string;
  lost_item_id: string;
  found_item_id: string;
  lost_item: Item;
  found_item: Item;
  status: MatchStatus;
  scores: MatchScoreBreakdown;
  conversation_id: string | null;
  created_at: string;
  updated_at: string;
}
