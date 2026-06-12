import { 
  createUser, 
  createNotification, 
  createItem, 
  createMatch, 
  createDashboardStats,
  createAdminAnalytics,
  createConversation,
  createMessage
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
    imageUrl: '/mock-macbook.jpg',
  }),
  createItem({
    id: 'ITM-2',
    type: 'found',
    title: 'AirPods Pro 2nd Gen',
    dateReported: 'Oct 10, 2023',
    location: 'Subway Station',
    status: 'resolved',
    matchesCount: 1,
    imageUrl: '/mock-airpods.jpg',
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
      visual: 0.85,
      semantic: 0.92,
      location: 0.95,
      time: 0.98,
      overall: 0.94
    },
    lostItem: createItem({
      id: 'ITM-1',
      title: 'Blue Backpack with Pins',
      description: 'Jansport backpack, navy blue. Has several enamel pins on the front pocket (Star Wars, NASA). Left on the Subway.',
      type: 'lost',
      dateReported: 'Oct 12, 2023',
      location: 'Central Station',
      imageUrl: '/mock-backpack-1.jpg',
    }),
    foundItem: createItem({
      id: 'ITM-F1',
      title: 'Dark Blue School Bag',
      description: 'Found a dark blue bag on the Red Line train. Has some pins on it. Contains notebooks.',
      type: 'found',
      dateReported: 'Oct 13, 2023',
      location: 'Red Line Train',
      imageUrl: '/mock-backpack-2.jpg',
    }),
  }),
];

export const mockDashboardStats = createDashboardStats();
export const mockAdminAnalytics = createAdminAnalytics();

export const mockConversations = [
  createConversation({
    id: 'CONV-1',
    title: 'Support Team',
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    messages: [
      createMessage({
        conversationId: 'CONV-1',
        senderId: 'USR-1',
        senderName: 'You',
        content: 'Hi, I need help with my recent claim.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      }),
      createMessage({
        conversationId: 'CONV-1',
        senderId: 'SUP-1',
        senderName: 'Support Team',
        content: 'Hello! I can help you with your claim. Can you provide the match ID?',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      })
    ]
  }),
  createConversation({
    id: 'CONV-2',
    title: 'Recovery Officer',
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    messages: [
      createMessage({
        conversationId: 'CONV-2',
        senderId: 'OFF-1',
        senderName: 'Recovery Officer',
        content: 'We need additional verification to process your claim for the MacBook Pro.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      }),
      createMessage({
        conversationId: 'CONV-2',
        senderId: 'USR-1',
        senderName: 'You',
        content: 'Sure, I can send a copy of the receipt. Where should I upload it?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23.5).toISOString(),
      })
    ]
  }),
  createConversation({
    id: 'CONV-3',
    title: 'System Notifications',
    unreadCount: 3,
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    messages: [
      createMessage({
        conversationId: 'CONV-3',
        senderId: 'SYS',
        senderName: 'System',
        content: 'Match discovered for your reported item: Blue MacBook Pro 14".',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      }),
      createMessage({
        conversationId: 'CONV-3',
        senderId: 'SYS',
        senderName: 'System',
        content: 'Your claim has been submitted and is pending review.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      }),
      createMessage({
        conversationId: 'CONV-3',
        senderId: 'SYS',
        senderName: 'System',
        content: 'Your claim for item ITM-2 has been approved!',
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      })
    ]
  })
];

mockConversations.forEach(c => {
  if (c.messages && c.messages.length > 0) {
    c.lastMessage = c.messages[c.messages.length - 1];
  }
});
