export const APP_NAME = 'ReclaimAI';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const ITEM_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Documents',
  'Keys',
  'Bags',
  'Wallets',
  'Jewelry',
  'Pets',
  'Other',
] as const;

export const MAX_UPLOAD_SIZE_MB = 10;
export const MAX_IMAGES_PER_ITEM = 5;

export const QUERY_STALE_TIMES = {
  items: 30 * 1000,
  matches: 15 * 1000,
  messages: 5 * 1000,
  notifications: 10 * 1000,
  user: 60 * 1000,
} as const;
