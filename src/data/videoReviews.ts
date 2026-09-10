import type { VideoReview } from '../types/travel';

export const DEMO_VIDEO_REVIEWS: VideoReview[] = [
  {
    id: 'vid-1',
    placeName: 'Sri Sapthagiri Heritage Residency',
    placeType: 'Accommodation',
    contributorName: 'Ramesh Kumar (Level 5 Scout)',
    contributorTrustScore: 96,
    videoThumbnail: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
    videoDuration: '1:45',
    transcript: 'Hey guys! Checking out room 204 at Sapthagiri Residency. As you can see, the bathroom is sparkling clean with brand new geyser installation. Double bed linen is fresh without any stains. Ac cooling is instant. Station noise is minimal because they installed double-pane glass windows.',
    keyObservations: [
      { type: 'positive', text: 'Clean bathroom with instant hot water' },
      { type: 'positive', text: 'Double-pane soundproof windows block station noise' },
      { type: 'neutral', text: 'Elevator speed is slightly slow during morning checkout hours' }
    ],
    dateOfExperience: 'Verified 3 days ago',
    confidenceLevel: 'High Confidence',
    verifiedCount: 19
  },
  {
    id: 'vid-2',
    placeName: 'Tirupati Station to Alipiri Shared Auto Route',
    placeType: 'Transport',
    contributorName: 'Priya Sharma (Local Contributor)',
    contributorTrustScore: 92,
    videoThumbnail: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=600',
    videoDuration: '2:10',
    transcript: 'Showing how to get a shared auto at Tirupati station. Walk straight out of Gate 1 past the private drivers. Right at the main circle, drivers take passengers for ₹40 per head up to Alipiri Footpath token counter. Saves you ₹140 over private auto quotes!',
    keyObservations: [
      { type: 'positive', text: 'Exact fare confirmed: ₹40 per head' },
      { type: 'positive', text: 'Frequency is under 3 minutes' },
      { type: 'negative', text: 'Drivers wait until auto fills 5 passengers' }
    ],
    dateOfExperience: 'Verified 1 day ago',
    confidenceLevel: 'High Confidence',
    verifiedCount: 34
  },
  {
    id: 'vid-3',
    placeName: 'Sea Inn Raju Gaari Daba Vizag',
    placeType: 'Food',
    contributorName: 'Anil V. (Food Explorer)',
    contributorTrustScore: 89,
    videoThumbnail: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=600',
    videoDuration: '1:20',
    transcript: 'Testing the crab roast and prawn fry at Sea Inn near Rushikonda. Extremely fresh seafood caught daily by local fishermen. Total bill for 2 people with full thali came to ₹540.',
    keyObservations: [
      { type: 'positive', text: 'Fresh seafood quality' },
      { type: 'positive', text: 'Fair pricing ₹540 for 2 people' },
      { type: 'neutral', text: 'High weekend rush between 1:30 PM and 3:00 PM' }
    ],
    dateOfExperience: 'Verified 4 days ago',
    confidenceLevel: 'High Confidence',
    verifiedCount: 22
  }
];
