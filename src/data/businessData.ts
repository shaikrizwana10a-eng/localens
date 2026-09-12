import type { BusinessAnalytics } from '../types/travel';

export const DEMO_BUSINESS_ANALYTICS: BusinessAnalytics[] = [
  {
    id: 'biz-1',
    businessName: 'Sri Sapthagiri Heritage Residency',
    category: 'Hotel',
    subscriptionTier: 'Local Provider',
    monthlySubscriptionPrice: 499,
    organicRating: 4.4,
    totalVerifiedReviews: 48,
    satisfactionTrend: [
      { month: 'May', satisfactionScore: 88 },
      { month: 'Jun', satisfactionScore: 90 },
      { month: 'Jul', satisfactionScore: 92 },
      { month: 'Aug', satisfactionScore: 94 }
    ],
    customerLikes: [
      'Proximity to Railway Station Exit (98% positive)',
      'Bathroom Hygiene & Hot Water Pressure (94% positive)',
      'Friendly front desk assistance for temple Darshan tokens (91% positive)'
    ],
    frequentlyMentionedIssues: [
      'Slow elevator response during peak morning 7:00 AM checkout hour (mentioned in 6 reviews)',
      'Limited vehicle maneuverability in narrow front lane (mentioned in 4 reviews)'
    ],
    recentObservations: [
      'Installed double-pane window glass to reduce station traffic noise on 12th Aug.',
      'Verified clean water tank maintenance certificate posted on wall.'
    ],
    promotedVisibilityActive: true,
    nonPaidRatingProtectionVerified: true
  },
  {
    id: 'biz-2',
    businessName: 'Hotel Maurya Mess & Restaurant',
    category: 'Restaurant',
    subscriptionTier: 'Tourism Business',
    monthlySubscriptionPrice: 1499,
    organicRating: 4.6,
    totalVerifiedReviews: 82,
    satisfactionTrend: [
      { month: 'May', satisfactionScore: 91 },
      { month: 'Jun', satisfactionScore: 93 },
      { month: 'Jul', satisfactionScore: 95 },
      { month: 'Aug', satisfactionScore: 96 }
    ],
    customerLikes: [
      'Authentic Rayalaseema Ragi Mudda flavor (96% positive)',
      'Quick table turnaround time under 8 minutes (94% positive)',
      'Hygienic pure ghee usage verified by community (92% positive)'
    ],
    frequentlyMentionedIssues: [
      'Long weekend lunch queues between 1:30 PM and 2:30 PM (mentioned in 12 reviews)',
      'Limited two-wheeler parking in front of restaurant (mentioned in 8 reviews)'
    ],
    recentObservations: [
      'Added token display screen for queue management.',
      'Price for Ragi Mudda Thali verified at ₹140 by 18 recent travellers.'
    ],
    promotedVisibilityActive: true,
    nonPaidRatingProtectionVerified: true
  }
];
