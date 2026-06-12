export type ItemType = 'lost' | 'found';
export type ItemStatus = 'active' | 'matched' | 'resolved' | 'closed';

export interface ItemLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface ItemImage {
  id: string;
  url: string;
  position: number;
  is_primary: boolean;
}

export interface Item {
  id: string;
  user_id: string;
  type: ItemType;
  title: string;
  description: string;
  category: string;
  location: ItemLocation;
  address: string;
  date_occurred: string;
  time_occurred: string | null;
  reward: number | null;
  tags: string[];
  status: ItemStatus;
  images: ItemImage[];
  created_at: string;
  updated_at: string;
}

export interface ItemCreatePayload {
  type: ItemType;
  title: string;
  description: string;
  category: string;
  location: ItemLocation;
  date_occurred: string;
  time_occurred?: string;
  reward?: number;
  tags?: string[];
}

export interface ItemUpdatePayload {
  title?: string;
  description?: string;
  category?: string;
  location?: ItemLocation;
  date_occurred?: string;
  time_occurred?: string;
  reward?: number;
  tags?: string[];
}
