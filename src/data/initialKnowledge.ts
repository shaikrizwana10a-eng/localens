import type { LocalKnowledgeItem } from '../types/localKnowledge';

export const INITIAL_KNOWLEDGE_ITEMS: LocalKnowledgeItem[] = [
  // 1. Single Verified User Report: Gajuwaka -> VIIT (Multimodal Bus + Auto)
  {
    id: 'lk-vizag-viit-1',
    from: 'Gajuwaka',
    to: 'VIIT',
    category: 'Bus',
    busNumber: '55Y / 38Y / 311',
    fare: '₹25',
    autoFare: '₹10',
    boardingPoint: 'Old Gajuwaka Bus Stop',
    dropPoint: 'VIIT Campus Gate',
    intermediateStop: 'Duvvada',
    lastMileMode: 'Auto',
    explicitNoDirectBus: true,
    additionalInfo: 'Buses do not go directly to VIIT. Get down at Duvvada and take an auto for the final part of the journey.',
    status: 'VERIFIED',
    reportedBy: 'Local Contributor @vizag_student',
    submittedAt: '2026-09-09',
    verifiedAt: '2026-09-10',
    verifiedBy: 'LOCAL Verification Desk',
    communityRating: 4.9,
    ratingCount: 1,
    outdatedReportsCount: 0
  },

  // 1b. Single Verified User Report: Gajuwaka -> Vignan College (Multimodal Bus + Auto)
  {
    id: 'lk-vizag-vignan-1',
    from: 'Gajuwaka',
    to: 'Vignan College',
    category: 'Bus',
    busNumber: '38K',
    fare: '₹20',
    autoFare: '₹40',
    boardingPoint: 'Gajuwaka Main Bus Stop (Platform 2)',
    dropPoint: 'Vignan College Main Gate',
    intermediateStop: 'Duvvada Bus Stop',
    lastMileMode: 'Auto',
    explicitNoDirectBus: true,
    additionalInfo: 'Take Bus 38K from Gajuwaka to Duvvada Bus Stop, then use an auto for the final stretch to Vignan College.',
    status: 'VERIFIED',
    reportedBy: 'Local Contributor @vizag_student',
    submittedAt: '2026-09-09',
    verifiedAt: '2026-09-10',
    verifiedBy: 'LOCAL Verification Desk',
    communityRating: 4.9,
    ratingCount: 1,
    outdatedReportsCount: 0
  },

  // 2. Sample PENDING Submission for Gajuwaka -> Vignan College (Direct Bus Pending Audit)
  {
    id: 'lk-vizag-vignan-pending',
    from: 'Gajuwaka',
    to: 'Vignan College',
    category: 'Bus',
    busNumber: '99V Express',
    fare: '₹35',
    boardingPoint: 'Gajuwaka Depot',
    dropPoint: 'Vignan College Campus Gate',
    additionalInfo: 'New direct morning shuttle reported by commuter.',
    status: 'PENDING',
    reportedBy: 'Local Contributor @new_commuter',
    submittedAt: '2026-09-11',
    communityRating: 0,
    ratingCount: 0,
    outdatedReportsCount: 0
  },

  // 3. Verified Direct Bus: Gajuwaka -> RK Beach (Bus 99)
  {
    id: 'lk-vizag-1',
    from: 'Gajuwaka',
    to: 'RK Beach',
    category: 'Bus',
    busNumber: '99',
    fare: '₹45',
    autoFare: '₹70 (Shared per seat)',
    boardingPoint: 'Gajuwaka Main Bus Stop (Platform 2)',
    dropPoint: 'RK Beach Submarine Museum Shelter',
    additionalInfo: 'Bus 99 runs every 12 mins via Scindia & Convent Junction. Direct connection to beach promenade.',
    status: 'VERIFIED',
    reportedBy: 'Local User @vizag_commuter',
    submittedAt: '2026-09-05',
    verifiedAt: '2026-09-08',
    verifiedBy: 'LOCAL Verification Desk (AP RTC Verified)',
    communityRating: 4.8,
    ratingCount: 42,
    outdatedReportsCount: 0
  },

  // 4. Verified Multimodal: Tirupati -> Kapila Theertham
  {
    id: 'lk-tpt-kt-1',
    from: 'Tirupati Railway Station',
    to: 'Kapila Theertham',
    category: 'Bus',
    busNumber: '11H',
    fare: '₹15',
    autoFare: '₹25',
    boardingPoint: 'Station Main Gate Bus Shelter',
    dropPoint: 'Kapila Theertham Foothills',
    intermediateStop: 'Nandi Circle',
    lastMileMode: 'Auto',
    additionalInfo: 'Take city bus 11H to Nandi Circle, then take a 5-min shared auto up to the temple waterfalls.',
    status: 'VERIFIED',
    reportedBy: 'Local Contributor @tpt_scout',
    submittedAt: '2026-09-04',
    verifiedAt: '2026-09-07',
    verifiedBy: 'LOCAL Verification Desk',
    communityRating: 4.7,
    ratingCount: 18,
    outdatedReportsCount: 0
  },

  // 5. Verified Direct Bus: Tirupati -> Tirumala Hill Top
  {
    id: 'lk-tpt-1',
    from: 'Tirupati Railway Station',
    to: 'Tirumala Hill Top',
    category: 'Bus',
    busNumber: 'Saptagiri Electric Bus',
    fare: '₹70',
    autoFare: '₹40 to Alipiri Footpath Gate',
    boardingPoint: 'Tirupati Central Bus Station (Platform 1–4)',
    dropPoint: 'Tirumala CRO Bus Bay',
    additionalInfo: 'Buses run 24x7 every 3 minutes. Free luggage counter available at Alipiri toll gate.',
    status: 'VERIFIED',
    reportedBy: 'Local User @srivari_scout',
    submittedAt: '2026-09-01',
    verifiedAt: '2026-09-09',
    verifiedBy: 'LOCAL Verification Team',
    communityRating: 4.9,
    ratingCount: 128,
    outdatedReportsCount: 0
  },

  // 6. Verified Bus + Walk: Secunderabad -> Salar Jung Museum
  {
    id: 'lk-hyd-1',
    from: 'Secunderabad Station',
    to: 'Salar Jung Museum',
    category: 'Bus',
    busNumber: '8A',
    fare: '₹25',
    boardingPoint: 'Rathifile Bus Station Gate 2',
    dropPoint: 'Afzal Gunj Bus Stop',
    intermediateStop: 'Afzal Gunj Bus Stop',
    lastMileMode: 'Walk',
    additionalInfo: 'Board Bus 8A to Afzal Gunj stop. From Afzal Gunj, walk 400 meters across the Musi bridge directly to Salar Jung Museum.',
    status: 'VERIFIED',
    reportedBy: 'Local User @hyderabad_guide',
    submittedAt: '2026-09-02',
    verifiedAt: '2026-09-07',
    verifiedBy: 'LOCAL Verification Team',
    communityRating: 4.7,
    ratingCount: 64,
    outdatedReportsCount: 0
  },

  // 7. Verified Direct Metro: Majestic -> Cubbon Park
  {
    id: 'lk-blr-1',
    from: 'Majestic Bus Stand',
    to: 'Cubbon Park',
    category: 'Tip',
    fare: '₹20 (Namma Metro Purple Line)',
    boardingPoint: 'Nadaprabhu Kempegowda Station Metro Gate 3',
    dropPoint: 'Cubbon Park Metro Exit B',
    additionalInfo: 'Do not take taxi/auto in Majestic traffic. Metro takes 6 minutes and drops you inside park.',
    status: 'VERIFIED',
    reportedBy: 'Local User @bengaluru_commuter',
    submittedAt: '2026-09-03',
    verifiedAt: '2026-09-10',
    verifiedBy: 'LOCAL Verification Team',
    communityRating: 4.95,
    ratingCount: 88,
    outdatedReportsCount: 0
  }
];
