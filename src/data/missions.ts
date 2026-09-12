import type { ContributionMission, VerificationTask } from '../types/travel';

export const DEMO_MISSIONS: ContributionMission[] = [
  {
    id: 'mis-1',
    title: 'Verify Alipiri Footpath Token Counter Queue & Timings',
    category: 'Place',
    location: 'Tirupati (Alipiri Gate)',
    rewardAmount: 35,
    description: 'Check current morning opening time and crowd queue length for free Sarva Darshan tokens at Alipiri entrance.',
    taskSteps: [
      'Take 1 photo of the token counter entrance banner',
      'Report exact opening time (e.g. 4:00 AM or 5:00 AM)',
      'Estimate current queue wait time'
    ],
    qualityGuidance: 'Clear photo showing official token banner and date stamp ensures maximum 100% reward payout.',
    status: 'Open'
  },
  {
    id: 'mis-2',
    title: 'Report Shared Auto Fare from Tirupati Railway Exit to RTC Stand',
    category: 'Transport',
    location: 'Tirupati Railway Station',
    rewardAmount: 25,
    description: 'Verify current per-seat fare for shared autos from Gate 2 to Central Bus Station.',
    taskSteps: [
      'Ask 2 shared auto drivers for current seat fare',
      'Confirm if luggage charges are extra',
      'Submit short 10-second audio note or text report'
    ],
    qualityGuidance: 'High quality contribution requires reporting exact boarding location.',
    status: 'Open'
  },
  {
    id: 'mis-3',
    title: 'Upload Room & Bathroom Video of Sapthagiri Residency',
    category: 'Stay',
    location: 'Tirupati (Gandhi Road)',
    rewardAmount: 75,
    description: 'Record a short 30-60 second room walk-through showing bed cleanliness, hot water geyser, and bathroom condition.',
    taskSteps: [
      'Show room number',
      'Record hot water tap test',
      'State date and room cleanliness observation'
    ],
    qualityGuidance: 'Video evidence unlocks maximum confidence score badge.',
    status: 'Open'
  },
  {
    id: 'mis-4',
    title: 'Confirm Meal Prices at Hotel Maurya Mess',
    category: 'Food',
    location: 'Tirupati Town',
    rewardAmount: 20,
    description: 'Take menu card photo or receipt confirming price of Ragi Mudda Thali.',
    taskSteps: [
      'Photograph current menu card price',
      'Note if vegetarian meals are served on separate floor'
    ],
    qualityGuidance: 'Clear price text in photo guarantees instant payout.',
    status: 'Open'
  }
];

export const DEMO_VERIFICATION_TASKS: VerificationTask[] = [
  {
    id: 'ver-1',
    claimId: 'clm-101',
    category: 'Stay',
    placeName: 'Sri Sapthagiri Heritage Residency',
    claimText: 'Open parking inside premises is free for up to 8 vehicles with zero extra parking charges.',
    submittedBy: 'Contributor @ramesh_k',
    submittedDaysAgo: 2,
    matchCount: 14,
    contradictCount: 1,
    confidenceLevel: 'High Confidence'
  },
  {
    id: 'ver-2',
    claimId: 'clm-102',
    category: 'Transport',
    placeName: 'Tirupati Central Bus Stand',
    claimText: 'Electric AC RTC buses to Tirumala charge ₹85 per ticket and run every 10 minutes.',
    submittedBy: 'Contributor @priya_s',
    submittedDaysAgo: 1,
    matchCount: 28,
    contradictCount: 0,
    confidenceLevel: 'High Confidence'
  },
  {
    id: 'ver-3',
    claimId: 'clm-103',
    category: 'Food',
    placeName: 'Borra Caves Tribal Stalls',
    claimText: 'Bamboo Chicken stick price has increased from ₹200 to ₹250 for full portion.',
    submittedBy: 'Contributor @anil_v',
    submittedDaysAgo: 4,
    matchCount: 9,
    contradictCount: 2,
    confidenceLevel: 'Moderate Confidence'
  }
];
