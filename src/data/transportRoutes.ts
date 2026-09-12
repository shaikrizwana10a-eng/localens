import type { TransportRoute } from '../types/travel';

export const DEMO_TRANSPORT_ROUTES: TransportRoute[] = [
  // Flagship Example from Specification: APSRTC Bus 99 (Gajuwaka -> RK Beach)
  {
    id: 't-route-bus99',
    origin: 'Gajuwaka',
    destination: 'RK Beach',
    distanceKm: 21,
    provenance: {
      source_type: 'LOCAL_LENS',
      verification_status: 'VERIFIED',
      verified_by: 'LocalLens Verification Desk (APSRTC Ground Audit)',
      verified_at: '2026-09-10',
      last_updated_at: '2026-09-10',
      evidence_available: true,
      disclaimer: 'Verified by LocalLens on-ground conductor audits against official APSRTC fare schedules.'
    },
    options: [
      {
        id: 'opt-bus-99',
        transportType: 'Local Bus',
        serviceNumber: 'APSRTC Bus 99',
        routeStops: ['Gajuwaka Bus Stand', 'NAD Junction', 'Maddilapalem', 'Siripuram Junction', 'RK Beach'],
        approxFare: '₹45',
        approxDuration: '45 mins',
        boardingPoint: 'Gajuwaka Bus Stand — Platform 2',
        dropPoint: 'RK Beach Promenade (Submarine Museum Shelter)',
        walkingDistance: 'Direct drop at beach road',
        transfers: 0,
        timing: {
          firstBus: '06:00 AM',
          lastBus: '09:30 PM',
          frequency: 'Every 12-15 minutes'
        },
        fareHistory: {
          current: '₹45',
          previous: '₹40',
          updatedAt: '8 Sept 2026'
        },
        steps: [
          { stepNumber: 1, instruction: 'Arrive at Gajuwaka Central Bus Stand and locate Platform 2 bay.', distanceOrTime: 'Boarding point', iconType: 'walk' },
          { stepNumber: 2, instruction: 'Board APSRTC Route 99 Bus. Exact fare ₹45 or UPI accepted by conductor.', distanceOrTime: 'Every 12 mins', iconType: 'bus' },
          { stepNumber: 3, instruction: 'Transit via NAD Junction flyover and Maddilapalem highway corridor.', distanceOrTime: '30 mins ride', iconType: 'bus' },
          { stepNumber: 4, instruction: 'Alight directly at RK Beach Submarine Museum stop.', distanceOrTime: 'Arrival', iconType: 'walk' }
        ],
        practicalNotes: [
          'During peak hours (8:30 AM–10:00 AM & 5:30 PM–7:00 PM), board from Platform 2 to ensure a seat.',
          'Conductors carry electronic ticketing machines supporting PhonePe / Google Pay QR scanning.',
          'Buses run until 09:30 PM; after 9:30 PM shared autos operate from Old Gajuwaka Circle.'
        ],
        freshnessDaysAgo: 2,
        verifiedCount: 56,
        confidenceLevel: 'High Confidence',
        provenance: {
          source_type: 'LOCAL_LENS',
          verification_status: 'VERIFIED',
          verified_by: 'LocalLens Verification Desk',
          verified_at: '2026-09-10',
          last_updated_at: '2026-09-10',
          evidence_available: true,
          disclaimer: 'Fare and stops verified by LocalLens transit inspector.'
        }
      },
      {
        id: 'opt-bus99-shared-auto',
        transportType: 'Shared Auto',
        serviceNumber: 'Shared 7-Seater Auto',
        routeStops: ['Gajuwaka Circle', 'Scindia Junction', 'Convent Junction', 'RK Beach'],
        approxFare: '₹70 per seat',
        approxDuration: '35 mins',
        boardingPoint: 'Old Gajuwaka Circle Auto Bay',
        dropPoint: 'RK Beach Kali Temple',
        walkingDistance: 'Direct drop',
        transfers: 0,
        timing: {
          firstBus: '05:00 AM',
          lastBus: '11:30 PM',
          frequency: 'Continuous on fill'
        },
        steps: [
          { stepNumber: 1, instruction: 'Board shared auto at Old Gajuwaka Circle heading towards Town / Beach.', distanceOrTime: 'Walk 50m', iconType: 'auto' },
          { stepNumber: 2, instruction: 'Direct express via Port Road & Convent Junction.', distanceOrTime: '35 mins', iconType: 'auto' }
        ],
        practicalNotes: [
          'Shared auto costs ₹70 versus special private hire ₹350–₹450.',
          'Inform driver in advance if getting down near Submarine Museum.'
        ],
        freshnessDaysAgo: 3,
        verifiedCount: 34,
        confidenceLevel: 'High Confidence',
        provenance: {
          source_type: 'COMMUNITY',
          verification_status: 'PENDING',
          submitted_by: 'Local Scout @vizag_auto_union',
          submitted_at: '2026-09-08',
          last_updated_at: '2026-09-08',
          evidence_available: true,
          disclaimer: 'Community submitted union rate. Awaiting next platform desk re-audit.'
        }
      }
    ]
  },
  {
    id: 't-route-1',
    origin: 'Tirupati Railway Station / Bus Stand',
    destination: 'Tirumala Hill Top (Temple Area)',
    distanceKm: 22,
    provenance: {
      source_type: 'LOCAL_LENS',
      verification_status: 'VERIFIED',
      verified_by: 'LocalLens Verification Desk',
      verified_at: '2026-09-09',
      last_updated_at: '2026-09-09',
      evidence_available: true
    },
    options: [
      {
        id: 'opt-bus',
        transportType: 'Local Bus',
        serviceNumber: 'APSRTC Saptagiri Express',
        routeStops: ['Tirupati Central Bus Station', 'Alipiri Toll Gate', 'Ghat Road 2', 'Tirumala CRO Stand'],
        approxFare: '₹70 per seat',
        approxDuration: '45–50 mins',
        boardingPoint: 'Tirupati Central Bus Station (Platform 1–4)',
        dropPoint: 'Tirumala Main Bus Stand (CRO Office)',
        walkingDistance: '200m to Temple Queue Complex',
        transfers: 0,
        timing: {
          firstBus: '00:00 AM (24x7)',
          lastBus: '11:59 PM (24x7)',
          frequency: 'Every 3-5 mins'
        },
        fareHistory: {
          current: '₹70',
          previous: '₹65',
          updatedAt: '1 Aug 2026'
        },
        steps: [
          { stepNumber: 1, instruction: 'Walk 100m from Railway Exit Gate 1 to Central Bus Station Platform 2.', distanceOrTime: '3 mins walk', iconType: 'walk' },
          { stepNumber: 2, instruction: 'Board APS RTC Saptagiri Express / Electric Bus (Runs every 3-5 mins, 24x7).', distanceOrTime: 'Boarding', iconType: 'bus' },
          { stepNumber: 3, instruction: 'Security Inspection stop at Alipiri Toll Gate (luggage scan). Stay in bus.', distanceOrTime: '10 mins check', iconType: 'bus' },
          { stepNumber: 4, instruction: 'Scenic hill climb up Ghat Road 2 arriving at Tirumala CRO Bus Bay.', distanceOrTime: '35 mins drive', iconType: 'bus' }
        ],
        practicalNotes: [
          'Buses operate 24x7 non-stop with high frequency.',
          'Free luggage booking available at Alipiri if you want luggage delivered directly to hill top.',
          'Electric AC buses charge ₹85 and offer extra legroom.'
        ],
        freshnessDaysAgo: 2,
        verifiedCount: 42,
        confidenceLevel: 'High Confidence',
        provenance: {
          source_type: 'LOCAL_LENS',
          verification_status: 'VERIFIED',
          verified_by: 'LocalLens Verification Desk',
          verified_at: '2026-09-09',
          last_updated_at: '2026-09-09',
          evidence_available: true
        }
      },
      {
        id: 'opt-shared-auto',
        transportType: 'Shared Auto',
        approxFare: '₹40 (to Alipiri Footpath Gate)',
        approxDuration: '15 mins to Alipiri + Bus/Trek',
        boardingPoint: 'Station Main Circle Auto Bay',
        dropPoint: 'Alipiri Padala Mandapam (Footpath Start)',
        walkingDistance: 'Direct drop at trek start',
        transfers: 1,
        steps: [
          { stepNumber: 1, instruction: 'Board Shared Auto at Station Circle heading towards Alipiri.', distanceOrTime: '2 mins wait', iconType: 'auto' },
          { stepNumber: 2, instruction: 'Get down at Alipiri Padala Mandapam gate.', distanceOrTime: '15 mins drive', iconType: 'auto' },
          { stepNumber: 3, instruction: 'Obtain free SSD Darshan token at footpath counter or take uphill shuttle bus.', distanceOrTime: '5 mins', iconType: 'walk' }
        ],
        practicalNotes: [
          'Shared autos cost ₹40 per seat versus private auto ₹180.',
          'Ideal if you plan to walk up the Srivari Mettu or Alipiri footpath.'
        ],
        freshnessDaysAgo: 4,
        verifiedCount: 28,
        confidenceLevel: 'High Confidence'
      }
    ]
  },
  {
    id: 't-route-hyd-1',
    origin: 'Secunderabad Railway Station',
    destination: 'Charminar & Laad Bazaar (Old City)',
    distanceKm: 12,
    options: [
      {
        id: 'opt-hyd-bus',
        transportType: 'Local Bus',
        approxFare: '₹25 per ticket',
        approxDuration: '35 mins',
        boardingPoint: 'Secunderabad Station Bus Stop (Rathifile)',
        dropPoint: 'Charminar Bus Stop',
        walkingDistance: '50m to Charminar entrance',
        transfers: 0,
        steps: [
          { stepNumber: 1, instruction: 'Exit Station Gate 1 and walk 100m right to Rathifile Bus Station.', distanceOrTime: '2 mins', iconType: 'walk' },
          { stepNumber: 2, instruction: 'Board TSRTC Bus Route 8A, 8C or 8M.', distanceOrTime: 'Every 5 mins', iconType: 'bus' },
          { stepNumber: 3, instruction: 'Alight directly at Charminar bus bay in Old City.', distanceOrTime: '30 mins', iconType: 'bus' }
        ],
        practicalNotes: [
          'TSRTC Ordinary bus ticket costs ₹25; Metro Green Line + Auto transfer is a faster alternate.',
          'Avoid heavy evening rush between 5:30 PM and 7:30 PM.'
        ],
        freshnessDaysAgo: 1,
        verifiedCount: 58,
        confidenceLevel: 'High Confidence'
      }
    ]
  },
  {
    id: 't-route-blr-1',
    origin: 'KSR Bengaluru Station / Majestic',
    destination: 'Cubbon Park & Vidhana Soudha',
    distanceKm: 4.2,
    options: [
      {
        id: 'opt-blr-metro',
        transportType: 'Local Bus',
        approxFare: '₹20 per token (Namma Metro)',
        approxDuration: '10 mins',
        boardingPoint: 'Majestic Metro Station (Purple Line)',
        dropPoint: 'Cubbon Park Metro Station Exit B',
        walkingDistance: 'Direct exit inside Cubbon Park',
        transfers: 0,
        steps: [
          { stepNumber: 1, instruction: 'Walk through skywalk from Railway Station to Nadaprabhu Kempegowda Metro Station.', distanceOrTime: '4 mins', iconType: 'walk' },
          { stepNumber: 2, instruction: 'Board Purple Line towards Whitefield.', distanceOrTime: '6 mins (2 stops)', iconType: 'bus' },
          { stepNumber: 3, instruction: 'Take Exit B directly into Cubbon Park greenery.', distanceOrTime: '1 min', iconType: 'walk' }
        ],
        practicalNotes: [
          'Namma Metro bypasses all traffic congestion on KG Road.',
          'Namma Metro QR tickets can be booked via WhatsApp or Namma Metro App.'
        ],
        freshnessDaysAgo: 1,
        verifiedCount: 74,
        confidenceLevel: 'High Confidence'
      }
    ]
  },
  {
    id: 't-route-vja-1',
    origin: 'Vijayawada Junction Railway Station',
    destination: 'Kanaka Durga Temple (Indrakeeladri)',
    distanceKm: 3.5,
    options: [
      {
        id: 'opt-vja-bus',
        transportType: 'Local Bus',
        approxFare: '₹15 per ticket',
        approxDuration: '15 mins',
        boardingPoint: 'Station Gate 1 City Bus Bay',
        dropPoint: 'Kanaka Durga Temple Ghat Road Foothills',
        walkingDistance: 'Transfer to Devasthanam uphill bus',
        transfers: 0,
        steps: [
          { stepNumber: 1, instruction: 'Board APS RTC City Bus Route 1 or 1A.', distanceOrTime: '10 mins', iconType: 'bus' },
          { stepNumber: 2, instruction: 'Alight at Indrakeeladri Temple Pavancha foothills.', distanceOrTime: 'Alight', iconType: 'bus' },
          { stepNumber: 3, instruction: 'Take free Devasthanam uphill shuttle bus to temple top.', distanceOrTime: '5 mins', iconType: 'bus' }
        ],
        practicalNotes: [
          'Free shuttle buses run continuously up the Ghat Road to temple queue complex.'
        ],
        freshnessDaysAgo: 2,
        verifiedCount: 46,
        confidenceLevel: 'High Confidence'
      }
    ]
  },
  {
    id: 't-route-2',
    origin: 'Visakhapatnam Railway Station',
    destination: 'RK Beach Promenade / Submarine Museum',
    distanceKm: 4.5,
    options: [
      {
        id: 'opt-vizag-bus',
        transportType: 'Local Bus',
        approxFare: '₹15 per ticket',
        approxDuration: '18 mins',
        boardingPoint: 'City Bus Stop (200m right of Station Main Gate)',
        dropPoint: 'Submarine Museum Bus Stop',
        walkingDistance: '50m to beach',
        transfers: 0,
        steps: [
          { stepNumber: 1, instruction: 'Walk out of Platform 1 exit, turn right 150m to City Bus Shelter.', distanceOrTime: '2 mins', iconType: 'walk' },
          { stepNumber: 2, instruction: 'Board RTC Bus Route 28Z or 38.', distanceOrTime: 'Every 8 mins', iconType: 'bus' },
          { stepNumber: 3, instruction: 'Alight at Submarine Museum stop on RK Beach Road.', distanceOrTime: '15 mins', iconType: 'bus' }
        ],
        practicalNotes: [
          'Cheapest and most comfortable route during non-peak hours.',
          'Exact change of ₹15 or UPI accepted by bus conductors.'
        ],
        freshnessDaysAgo: 3,
        verifiedCount: 31,
        confidenceLevel: 'High Confidence'
      }
    ]
  }
];
