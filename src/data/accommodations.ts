import type { Accommodation } from '../types/travel';

export const DEMO_ACCOMMODATIONS: Accommodation[] = [
  // 1. Hotel Example (Visakhapatnam) - Google Maps External Reference
  {
    id: 'stay-google-1',
    name: 'Hotel Sea Pearl Visakhapatnam',
    type: 'Budget Hotel',
    destinationId: 'vizag',
    address: '14-2-12 Beach Road, Pandurangapuram, Visakhapatnam, Andhra Pradesh 530002',
    pricePerNight: 1200,
    priceRange: '₹1,200 – ₹1,800 / night',
    rating: 4.2,
    confidenceLevel: 'Moderate Confidence',
    cleanlinessScore: 'Community Rating: 4.2',
    safetyTag: 'Main road access with well-lit surroundings',
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600'
    ],
    facilities: ['Free Wi-Fi', 'AC Rooms', 'Elevator', 'Parking Available', 'Restaurant On-site'],
    bathroomInfo: 'Attached Western toilet with solar hot water geyser.',
    wifiSpeed: '25 Mbps standard hotel Wi-Fi',
    parkingRules: 'Free open street parking in front of property.',
    checkInOut: '12:00 PM Check-in / 11:00 AM Check-out',
    recentObservations: [
      'Ask for rooms facing the main road if you want easier transport access.',
      'Auto stand located 50 meters from front entrance.'
    ],
    coordinates: { lat: 17.7125, lng: 83.3220 },
    verifiedCount: 14,
    contactNumber: '+91 891 254 3910',
    roomTypes: ['Standard AC', 'Deluxe Sea View', 'Executive Suite'],
    provenance: {
      source_type: 'GOOGLE_MAPS',
      external_reference: 'ChIJ59R1c7a8-DsRxv0_7P3gE_M',
      source_url: 'https://maps.google.com/?q=Visakhapatnam+Hotel',
      verification_status: 'PENDING',
      retrieved_at: '2026-09-10',
      last_updated_at: '2026-09-10',
      evidence_available: false,
      disclaimer: 'External reference retrieved from Google Maps Platform. Basic location and amenities are reference data.'
    }
  },
  {
    id: 'stay-1',
    name: 'Sri Sapthagiri Heritage Residency',
    type: 'Budget Hotel',
    destinationId: 'tirupati',
    address: 'Near Railway Station Exit 2, Gandhi Road, Tirupati',
    pricePerNight: 1450,
    priceRange: '₹1,450 – ₹2,100 / night',
    rating: 4.4,
    confidenceLevel: 'High Confidence',
    cleanlinessScore: '94% Verified Clean',
    safetyTag: 'Community-reported safety information: 24/7 CCTV & Well-lit entry',
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600'
    ],
    facilities: ['Free High-Speed Wi-Fi', '24x7 Hot Water (Solar + Geyser)', 'AC & Non-AC Rooms', 'Elevator', 'Luggage Storage'],
    bathroomInfo: 'Western style toilet, solar heated water available 24/7, sanitized daily by staff.',
    wifiSpeed: '45 Mbps tested in rooms',
    parkingRules: 'Free open parking for 8 cars (First-come first-served, ₹0 extra charge verified).',
    checkInOut: '12:00 PM Check-in / 11:00 AM Check-out (2-hr grace allowed on request)',
    recentObservations: [
      'Clean linen and quiet environment despite proximity to station.',
      'Front desk provides early morning alarm calls for Alipiri Darshan walkers.',
      'No hidden service charges on checkout bill.'
    ],
    coordinates: { lat: 13.6290, lng: 79.4200 },
    verifiedCount: 38,
    isPartner: true,
    contactNumber: '+91 877 222 4589',
    roomTypes: ['Standard Double', 'Deluxe AC Triple', 'Family Suite (4 Beds)'],
    provenance: {
      source_type: 'LOCAL_LENS',
      verification_status: 'VERIFIED',
      verified_by: 'Local Scout @kiran_tpt (Desk Audited)',
      verified_at: '2026-09-08',
      last_updated_at: '2026-09-08',
      evidence_available: true,
      disclaimer: 'Physically inspected by Local Scout. Cleanliness, bathroom hygiene, and ₹0 parking charge verified.'
    }
  },
  {
    id: 'stay-2',
    name: 'Tirumala TTD Pilgrim Rest House (CRO Complex)',
    type: 'Dharamshala',
    destinationId: 'tirupati',
    address: 'Ring Road, Tirumala Hill Top',
    pricePerNight: 500,
    rating: 4.2,
    confidenceLevel: 'High Confidence',
    cleanlinessScore: '89% Verified Clean',
    safetyTag: 'Verified by recent travellers: High security area managed by TTD Vigilance',
    photos: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600'
    ],
    facilities: ['Purified RO Drinking Water', 'Filtered Hot Water', '24x7 Security', 'Locker Room'],
    bathroomInfo: 'Basic attached Indian/Western toilet, high hot water pressure in mornings.',
    wifiSpeed: '10 Mbps public Wi-Fi near lobby',
    parkingRules: 'Designated TTD multi-level parking bay nearby (₹50 per day).',
    checkInOut: '24-hour counter allocation',
    recentObservations: [
      'Book online 30 days prior via official TTD portal for guaranteed allocation.',
      'Very clean water supply; bring your own bath towels and soap.'
    ],
    coordinates: { lat: 13.6840, lng: 79.3490 },
    verifiedCount: 64,
    provenance: {
      source_type: 'LOCAL_LENS',
      verification_status: 'VERIFIED',
      verified_by: 'LocalLens Verification Desk',
      verified_at: '2026-09-09',
      last_updated_at: '2026-09-09',
      evidence_available: true,
      disclaimer: 'TTD official rest house tariff and online booking procedure verified with pilgrim welfare officer.'
    }
  },
  {
    id: 'stay-3',
    name: 'Araku Valley Green Retreat',
    type: 'Homestay',
    destinationId: 'araku',
    address: 'Main Road near Coffee Museum, Araku',
    pricePerNight: 1850,
    priceRange: '₹1,600 – ₹2,200 / night',
    rating: 4.6,
    confidenceLevel: 'High Confidence',
    cleanlinessScore: '96% Verified Clean',
    safetyTag: 'Verified by 18 recent travellers: Gated property with resident host family',
    photos: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600'
    ],
    facilities: ['Organic Garden', 'Home-cooked Tribal Meal Service', 'Campfire on request', 'Balcony Mountain Views'],
    bathroomInfo: 'Modern Western bathroom with instant electric geyser.',
    wifiSpeed: '15 Mbps (Blinking signal during heavy rains)',
    parkingRules: 'Spacious compound parking for up to 6 vehicles.',
    checkInOut: '11:00 AM Check-in / 10:00 AM Check-out',
    recentObservations: [
      'Host family serves authentic fresh Bamboo Chicken on pre-order.',
      'Quiet nights surrounded by coffee bushes.'
    ],
    coordinates: { lat: 18.3280, lng: 82.8790 },
    verifiedCount: 22,
    isPartner: true,
    contactNumber: '+91 8936 249 102',
    roomTypes: ['Cottage Room', 'Family Attic Suite'],
    provenance: {
      source_type: 'COMMUNITY',
      verification_status: 'PENDING',
      submitted_by: 'Traveler @sunil_hyd',
      submitted_at: '2026-09-07',
      last_updated_at: '2026-09-07',
      evidence_available: true,
      disclaimer: 'Community submitted homestay listing with room receipt proof. Pending annual desk visit.'
    }
  },
  {
    id: 'stay-4',
    name: 'Beachside Palms Residency Vizag',
    type: 'Boutique Stay',
    destinationId: 'vizag',
    address: 'RK Beach Road near Pandurangapuram, Visakhapatnam',
    pricePerNight: 2400,
    priceRange: '₹2,400 – ₹3,500 / night',
    rating: 4.5,
    confidenceLevel: 'High Confidence',
    cleanlinessScore: '92% Verified Clean',
    safetyTag: 'Community-reported safety info: Night security guard & keycard access',
    photos: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600'
    ],
    facilities: ['Sea View Balconies', 'Air Conditioning', 'Elevator', 'Complimentary Breakfast'],
    bathroomInfo: 'Glass partitioned shower area with premium toiletries.',
    wifiSpeed: '60 Mbps Fiber connection',
    parkingRules: 'Covered basement parking (₹0 extra).',
    checkInOut: '12:00 PM Check-in / 11:00 AM Check-out',
    recentObservations: [
      'Unobstructed views of Bay of Bengal sunrise from top floor rooms.',
      'Direct walking path to submarine museum.'
    ],
    coordinates: { lat: 17.7140, lng: 83.3250 },
    verifiedCount: 45,
    contactNumber: '+91 891 278 9900',
    roomTypes: ['Sea View Executive', 'Ocean Deluxe'],
    provenance: {
      source_type: 'LOCAL_LENS',
      verification_status: 'VERIFIED',
      verified_by: 'Local Scout @priya_m',
      verified_at: '2026-09-05',
      last_updated_at: '2026-09-05',
      evidence_available: true,
      disclaimer: 'Verified by Local Scout. Basement parking and fiber Wi-Fi confirmed on site.'
    }
  }
];
