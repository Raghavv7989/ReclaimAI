import { 
  createUser, 
  createNotification, 
  createItem, 
  createMatch, 
  createDashboardStats,
  createAdminAnalytics
} from '../factories';

export const mockUser = createUser({
  id: 'USR-CURRENT',
  name: 'John Doe',
  email: 'john.doe@example.com',
});

export const mockNotifications = [
  createNotification({
    id: 'NOTIF-1',
    title: 'Potential Match Found!',
    body: 'We found a 92% visual match for your lost Macbook Pro.',
    type: 'match_found',
    createdAt: '2 mins ago',
    isRead: false,
    actionUrl: '/matches/123',
  }),
  createNotification({
    id: 'NOTIF-2',
    title: 'New Message',
    body: 'Sarah sent you a message regarding your found AirPods.',
    type: 'message_received',
    createdAt: '1 hour ago',
    isRead: false,
    actionUrl: '/messages',
  }),
  createNotification({
    id: 'NOTIF-3',
    title: 'Status Update',
    body: 'Your claim for the blue backpack has been verified.',
    type: 'system',
    createdAt: 'Yesterday',
    isRead: true,
    actionUrl: '/dashboard',
  }),
  createNotification({
    id: 'NOTIF-4',
    title: 'Item Registered',
    body: 'You successfully registered a found Leather Wallet.',
    type: 'item_update',
    createdAt: '2 days ago',
    isRead: true,
    actionUrl: '/items/3',
  }),
];

export const mockItems = [
  createItem({
    id: 'ITM-1',
    type: 'lost',
    title: 'Blue MacBook Pro 14"',
    dateReported: 'Oct 12, 2023',
    location: 'Central Park Cafe',
    status: 'pending',
    matchesCount: 3,
  }),
  createItem({
    id: 'ITM-2',
    type: 'found',
    title: 'AirPods Pro 2nd Gen',
    dateReported: 'Oct 10, 2023',
    location: 'Subway Station',
    status: 'resolved',
    matchesCount: 1,
  }),
  createItem({
    id: 'ITM-3',
    type: 'lost',
    title: 'Leather Wallet',
    dateReported: 'Oct 05, 2023',
    location: 'Downtown Library',
    status: 'in_progress',
    matchesCount: 5,
  }),
];

export const mockMatches = [
  createMatch({
    id: 'MCH-1',
    lostItemId: 'ITM-1',
    foundItemId: 'ITM-F1',
    status: 'pending',
    scores: {
      visual: 85,
      semantic: 92,
      location: 95,
      time: 98,
      overall: 94
    },
    lostItem: createItem({
      id: 'ITM-1',
      title: 'Blue Backpack with Pins',
      description: 'Jansport backpack, navy blue. Has several enamel pins on the front pocket (Star Wars, NASA). Left on the Subway.',
      type: 'lost',
      dateReported: 'Oct 12, 2023',
      location: 'Central Station',
    }),
    foundItem: createItem({
      id: 'ITM-F1',
      title: 'Dark Blue School Bag',
      description: 'Found a dark blue bag on the Red Line train. Has some pins on it. Contains notebooks.',
      type: 'found',
      dateReported: 'Oct 13, 2023',
      location: 'Red Line Train',
    }),
  }),
];

export const mockDashboardStats = createDashboardStats();
export const mockAdminAnalytics = createAdminAnalytics();
