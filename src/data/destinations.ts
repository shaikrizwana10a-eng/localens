import type { Destination } from '../types/travel';

export const DEMO_DESTINATIONS: Destination[] = [
  {
    id: 'bangalore',
    name: 'Bengaluru (Bangalore)',
    state: 'Karnataka',
    tagline: 'Garden City & Tech Capital — Majestic transit hubs, royal palaces & craft brews',
    heroImage: '/images/bangalore.png',
    description: 'India’s Silicon Valley blessed with year-round pleasant weather, Kempegowda Majestic transit hubs, royal Tudor-style palaces, expansive botanical gardens, and vibrant filter coffee culture.',
    history: 'Founded in 1537 AD by Kempe Gowda I, developed under Hyder Ali and Tipu Sultan before expanding into a major British military cantonment.',
    culture: 'Cosmopolitan, tech innovation, classic South Indian tiffin centers, classical music sabhas, and microbrewery culture.',
    bestVisitingTime: 'Year-round (October to February best climate)',
    avgDailyBudget: '₹2,500 – ₹6,000 per day',
    crowdStatus: 'Moderate Crowd',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    attractions: [
      {
        id: 'att-blr-1',
        name: 'Kempegowda Bus Station & Majestic Circle',
        category: 'Transit Landmark',
        description: 'Iconic semi-circular bus station complex at Majestic connecting all BMTC city buses, KSRTC intercity routes, and Namma Metro lines.',
        timeRequired: '1 hour',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning 8:00 AM',
        image: '/images/bangalore.png',
        coordinates: { lat: 12.9778, lng: 77.5713 }
      },
      {
        id: 'att-blr-2',
        name: 'Bangalore Palace',
        category: 'Royal Heritage',
        description: 'Tudor-style royal residence built in 1878 with fortified towers, wooden carvings, and lush grounds reminiscent of Windsor Castle.',
        timeRequired: '2 hours',
        entryFee: '₹240 per person',
        bestTimeOfDay: 'Morning 11:00 AM',
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 12.9988, lng: 77.5922 }
      },
      {
        id: 'att-blr-3',
        name: 'Lalbagh Botanical Garden',
        category: 'Nature & Flora',
        description: '240-acre botanical garden featuring 1,000+ species of rare flora, a 3,000 million-year-old rock, and famous glass house modeled after London Crystal Palace.',
        timeRequired: '2.5 hours',
        entryFee: '₹30 per person',
        bestTimeOfDay: 'Early Morning 6:30 AM',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 12.9507, lng: 77.5848 }
      },
      {
        id: 'att-blr-4',
        name: 'Cubbon Park & Vidhana Soudha',
        category: 'Landmark & Park',
        description: 'Lush 300-acre green lung in the heart of city housing the majestic neo-Dravidian state legislature building Vidhana Soudha.',
        timeRequired: '2 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning 8:00 AM',
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 12.9763, lng: 77.5929 }
      },
      {
        id: 'att-blr-5',
        name: 'Nandi Hills (Nandidurga)',
        category: 'Sunrise Hill Viewpoint',
        description: 'Ancient hill fortress 60 km from city at 1,478m altitude famous for sea-of-clouds sunrise views and Tipu’s Drop cliff.',
        timeRequired: '4 hours',
        entryFee: '₹20 per person',
        bestTimeOfDay: 'Early Morning 5:30 AM (Sunrise)',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 13.3702, lng: 77.6835 },
        isHiddenGem: true
      }
    ],
    foodSpecialties: ['Crispy Butter Benne Dosa (CTR / Vidyarthi Bhavan)', 'Filter Coffee', 'Mysuru Pak', 'Mangalore Buns', 'Bisi Bele Bath'],
    communityObservations: [
      'Namma Metro Purple & Green lines avoid city traffic jams; get a contactless Namma Metro Smart Card.',
      'Vayu Vajra BMTC AC Volvo buses connect BLR Airport directly to Majestic & MG Road for ₹240.',
      'For iconic Benne Dosa, reach CTR Malleshwaram before 8:00 AM to avoid 45-minute breakfast queues.'
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'City of Pearls — Illuminated Charminar, Nizami monuments & Biryani',
    heroImage: '/images/hyderabad.png',
    description: 'A historic metropolis blending 400-year-old Nizami palaces, illuminated Charminar minarets, bustling bazaars, cyber cities, and world-renowned culinary heritage.',
    history: 'Founded in 1591 AD by Muhammad Quli Qutb Shah, famous for its ruling Qutb Shahi and Asaf Jahi (Nizam) dynasties who built iconic forts, mosques, and stepwells.',
    culture: 'Rich Deccani culture, Urdu poetry, pearl trading, mouth-watering Biryani gastronomy, and warm royal hospitality.',
    bestVisitingTime: 'October to March',
    avgDailyBudget: '₹2,200 – ₹5,000 per day',
    crowdStatus: 'Moderate Crowd',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    attractions: [
      {
        id: 'att-hyd-1',
        name: 'Charminar & Laad Bazaar',
        category: 'Monument & Heritage',
        description: 'Iconic 16th-century mosque with four 56m minarets standing illuminated at night in the heart of Old City surrounded by lac lacquer bangle shops.',
        timeRequired: '2 hours',
        entryFee: '₹25 per person',
        bestTimeOfDay: 'Evening 6:00 PM (illuminated minarets at dusk)',
        image: '/images/hyderabad.png',
        coordinates: { lat: 17.3616, lng: 78.4747 }
      },
      {
        id: 'att-hyd-2',
        name: 'Golconda Fort',
        category: 'Historic Citadel',
        description: 'Massive 13th-century hilltop fortress famed for acoustics where a handclap at the entrance gate echoes at the hilltop pavilion 1km away.',
        timeRequired: '3 hours',
        entryFee: '₹25 per person',
        bestTimeOfDay: 'Late Afternoon 4:00 PM for sunset & Sound Show',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 17.3833, lng: 78.4011 }
      },
      {
        id: 'att-hyd-3',
        name: 'Chowmahalla Palace',
        category: 'Nizami Palace',
        description: 'Palace complex of the Nizam dynasty featuring opulent grand Durbar Hall (Khilwat), vintage cars, and crystal chandeliers.',
        timeRequired: '2 hours',
        entryFee: '₹100 per person',
        bestTimeOfDay: 'Morning 11:00 AM',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 17.3578, lng: 78.4717 },
        isHiddenGem: true
      },
      {
        id: 'att-hyd-4',
        name: 'Hussain Sagar Lake & Buddha Statue',
        category: 'Scenic Promenade',
        description: 'Monolithic 18m stone Buddha statue standing on an island in the middle of Hussain Sagar lake accessible by ferry boats.',
        timeRequired: '1.5 hours',
        entryFee: 'Ferry Ticket ₹80',
        bestTimeOfDay: 'Sunset 5:30 PM',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 17.4239, lng: 78.4738 }
      },
      {
        id: 'att-hyd-5',
        name: 'Salar Jung Museum',
        category: 'Art & Royal Artifacts',
        description: 'One of the world’s largest single-person art collections, famous for the veiled Rebecca marble statue and 19th-century musical clock.',
        timeRequired: '3 hours',
        entryFee: '₹50 per person',
        bestTimeOfDay: 'Morning 10:30 AM',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 17.3713, lng: 78.4803 }
      }
    ],
    foodSpecialties: ['Hyderabadi Mutton Dum Biryani', 'Irani Chai with Osmania Biscuits', 'Double Ka Meetha', 'Hyderabadi Haleem', 'Mirchi Ka Salan'],
    communityObservations: [
      'Hyderabad Metro Red Line connects Secunderabad Station directly to MGBS Bus Hub in 15 minutes.',
      'Pushpak Airport AC Buses (Route AJ) run every 20 minutes from RGIA Shamshabad Airport to HiTech City for ₹260.',
      'For authentic Irani Chai, visit Nimrah Cafe directly opposite Charminar at 6:30 AM.'
    ]
  },
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    tagline: 'Place of Victory — Prakasam Barrage & sacred Indrakeeladri hill',
    heroImage: '/images/vijayawada.png',
    description: 'A vibrant commercial hub on the banks of Krishna River, famous for Prakasam Barrage dam, the sacred Kanaka Durga hilltop shrine, and ancient rock-cut cave temples.',
    history: 'Legend says Arjuna obtained the Pasupata Astra here from Lord Shiva. Ruled by Vishnukundina, Chalukya, and Kakatiya kings who carved ancient caves into sandstone hills.',
    culture: 'Riverine culture, devotional Navratri celebrations, spicy Andhra cuisine, and wooden Kondapalli toy craft.',
    bestVisitingTime: 'October to March',
    avgDailyBudget: '₹1,500 – ₹3,200 per day',
    crowdStatus: 'Moderate Crowd',
    coordinates: { lat: 16.5062, lng: 80.6480 },
    attractions: [
      {
        id: 'att-vja-3',
        name: 'Prakasam Barrage & Krishna River View',
        category: 'Civil Architecture & River',
        description: '1.2km road bridge and dam across the Krishna river built in 1957 creating a majestic lake promenade at night with Indrakeeladri hill backdrop.',
        timeRequired: '1 hour',
        entryFee: 'Free',
        bestTimeOfDay: 'Night 7:30 PM (Illuminated barrage)',
        image: '/images/vijayawada.png',
        coordinates: { lat: 16.5050, lng: 80.6139 }
      },
      {
        id: 'att-vja-1',
        name: 'Kanaka Durga Temple (Indrakeeladri)',
        category: 'Spiritual Heritage',
        description: 'Venerated hilltop shrine dedicated to Goddess Kanaka Durga overlooking the Krishna River and Prakasam Barrage.',
        timeRequired: '3 hours',
        entryFee: 'Free / ₹100 Special Line',
        bestTimeOfDay: 'Early Morning 5:00 AM',
        image: 'https://images.unsplash.com/photo-1627894013066-9f65cb717eb6?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 16.5167, lng: 80.6083 }
      },
      {
        id: 'att-vja-2',
        name: 'Undavalli Caves',
        category: 'Rock-Cut Cave Temple',
        description: '4th-5th century AD rock-cut sandstone caves featuring a colossal 5m reclining Anantasayana Vishnu carved out of a single rock hill.',
        timeRequired: '2 hours',
        entryFee: '₹25 per person',
        bestTimeOfDay: 'Morning 9:30 AM',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 16.4967, lng: 80.5819 }
      },
      {
        id: 'att-vja-4',
        name: 'Bhavani Island Resort & Water Sports',
        category: 'River Tourism',
        description: 'A 133-acre river island in the middle of Krishna River featuring speedboats, rope courses, and bamboo cottages.',
        timeRequired: '3 hours',
        entryFee: 'Ferry Ticket ₹60',
        bestTimeOfDay: 'Afternoon 2:30 PM',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 16.5250, lng: 80.5890 }
      },
      {
        id: 'att-vja-5',
        name: 'Kondapalli Fort & Wooden Toy Village',
        category: 'Heritage & Craft Village',
        description: '14th-century hill fort and artisan village famous for hand-carved wooden Kondapalli Bommalu toys.',
        timeRequired: '3 hours',
        entryFee: '₹20 per person',
        bestTimeOfDay: 'Late Afternoon',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 16.6217, lng: 80.5408 },
        isHiddenGem: true
      }
    ],
    foodSpecialties: ['Hot Vijayawada Punugulu with Ginger Chutney', 'Spicy Guntur Mirchi Bajji', 'Gongura Mutton Curry', 'Ulavacharu Meals'],
    communityObservations: [
      'Ghat Road ghat buses run continuous shuttles up to Kanaka Durga Temple from foothills for ₹15.',
      'City buses connect Vijayawada Railway Station to Undavalli Caves via Prakasam Barrage for ₹20.',
      'Buy authentic hand-carved Kondapalli toys directly from artisan workshops in Kondapalli village for wholesale prices.'
    ]
  },
  {
    id: 'tirupati',
    name: 'Tirupati & Tirumala',
    state: 'Andhra Pradesh',
    tagline: 'Spiritual capital surrounded by Seven Sacred Hills',
    heroImage: '/images/tirupati.png',
    description: 'Tirupati is world-famous for the ancient Venkateswara Temple located atop Tirumala hills. Beyond spirituality, it offers scenic waterfall hikes, heritage step-wells, and ancient Dravidian architecture.',
    history: 'Dating back to 300 AD, Tirupati received patronage from major dynasties including Pallavas, Cholas, Hoysalas, and Vijayanagara emperors who lavished gold and lands upon the temple complex.',
    culture: 'Deeply devotional, vibrant Vedic traditions, classic South Indian carnatic heritage, and strict community rules around hill entry and cleanliness.',
    bestVisitingTime: 'September to February (pleasant climate for hill trekking and temple visits)',
    avgDailyBudget: '₹1,800 – ₹3,500 per day',
    crowdStatus: 'High Peak Crowd',
    coordinates: { lat: 13.6288, lng: 79.4192 },
    attractions: [
      {
        id: 'att-1',
        name: 'Tirumala Venkateswara Temple',
        category: 'Spiritual / Heritage',
        description: 'The famous hill-top temple situated on Saptagiri illuminated grandly at night. Features intricate gold-plated vimanam and ancient Dravidian stone gopurams.',
        timeRequired: '4 to 6 hours',
        entryFee: 'Free (SSD Token) / ₹300 Special Entry',
        bestTimeOfDay: 'Early Morning (3:00 AM) or Night',
        image: '/images/tirupati.png',
        coordinates: { lat: 13.6833, lng: 79.3472 }
      },
      {
        id: 'att-2',
        name: 'Silathoranam (Natural Rock Arch)',
        category: 'Geological Marvel',
        description: 'Rare geological formation of natural rock arch millions of years old located near Chakra Tirtham in Tirumala hills.',
        timeRequired: '1 hour',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning 8:00 AM',
        image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 13.6890, lng: 79.3510 },
        isHiddenGem: true
      },
      {
        id: 'att-3',
        name: 'Kapila Theertham Waterfalls',
        category: 'Nature & Temple',
        description: 'Cascading waterfall dropping into a sacred pond at the foot of Sheshachalam hills with an ancient Shiva cave shrine.',
        timeRequired: '1.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Post-Monsoon (Oct - Dec)',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 13.6472, lng: 79.4290 }
      },
      {
        id: 'att-4',
        name: 'Chandragiri Fort & Palace',
        category: 'History & Architecture',
        description: '11th-century fort built by Vijayanagara rulers with Raja Mahal palace displaying arms, coins, and stonework.',
        timeRequired: '2.5 hours',
        entryFee: '₹25 per person',
        bestTimeOfDay: 'Late Afternoon 4:00 PM for Sound & Light show',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 13.6067, lng: 79.3142 }
      }
    ],
    foodSpecialties: ['Tirupati Laddu (GI Tagged)', 'Rayalaseema Ragi Mudda with Natukodi Curry', 'Perugu Vada & Filter Coffee', 'Potharekulu'],
    communityObservations: [
      'Alipiri Footpath token counter opens at 4:00 AM. Reach early to get free Special Darshan pass.',
      'APS RTC electric buses up to Tirumala run every 5 minutes from Central Bus Stand for ₹70.',
      'Luggage counter at Alipiri transfers your bags directly to hill-top counter for free.'
    ]
  },
  {
    id: 'vizag',
    name: 'Visakhapatnam (Vizag)',
    state: 'Andhra Pradesh',
    tagline: 'The City of Destiny — Submarine museum, coastal hills & naval harbor',
    heroImage: '/images/vizag.png',
    description: 'A picturesque coastal port city nestled between the Eastern Ghats and the Bay of Bengal, featuring INS Kursura submarine museum right on RK Beach, hilltop cable cars, and ancient shrines.',
    history: 'A historic port mentioned in 5th century BC Buddhist texts, later ruled by Kalingas, Eastern Chalukyas, and developed into a major naval harbor under Indian Independence.',
    culture: 'Maritime legacy, seaside promenades, fresh seafood culinary tradition, and cosmopolitan coastal charm.',
    bestVisitingTime: 'October to March',
    avgDailyBudget: '₹2,000 – ₹4,500 per day',
    crowdStatus: 'Moderate Crowd',
    coordinates: { lat: 17.7128, lng: 83.3242 },
    attractions: [
      {
        id: 'att-8',
        name: 'INS Kursura Submarine Museum',
        category: 'Naval Heritage',
        description: 'Decommissioned Soviet-built submarine S20 preserved right on RK Beach sand promenade. Real interior naval torpedo room walkthrough.',
        timeRequired: '1 hour',
        entryFee: '₹70 per person',
        bestTimeOfDay: 'Late Afternoon 3:30 PM',
        image: '/images/vizag.png',
        coordinates: { lat: 17.7128, lng: 83.3242 }
      },
      {
        id: 'att-9',
        name: 'Kailasagiri Hilltop Park',
        category: 'Panoramic Viewpoint',
        description: 'Hilltop park accessible by ropeway cable car featuring a 40-ft white statue of Shiva-Parvathi offering 360-degree views of the coastline.',
        timeRequired: '2 hours',
        entryFee: 'Ropeway ₹100 round trip',
        bestTimeOfDay: 'Sunset 5:30 PM',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 17.7483, lng: 83.3444 }
      },
      {
        id: 'att-11',
        name: 'Rushikonda Beach & Water Sports',
        category: 'Blue Flag Beach',
        description: 'Clean Blue Flag certified beach with golden sands, surf school, speedboats, sea kayaking, and beachside shacks.',
        timeRequired: '3 hours',
        entryFee: 'Free (Speedboat ₹350)',
        bestTimeOfDay: 'Morning 7:00 AM or 4:00 PM',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 17.7820, lng: 83.3850 }
      },
      {
        id: 'att-12',
        name: 'Simhachalam Hill Temple',
        category: 'Spiritual / Kalinga Heritage',
        description: 'Ancient 11th-century hilltop temple dedicated to Lord Varaha Narasimha featuring detailed Kalinga stone carvings.',
        timeRequired: '3 hours',
        entryFee: 'Free / ₹100 Special Darshan',
        bestTimeOfDay: 'Early Morning 6:00 AM',
        image: '/images/simhachalam_temple.png',
        coordinates: { lat: 17.7663, lng: 83.2506 }
      },
      {
        id: 'att-13',
        name: 'Tenneti Park & Shipwreck Point',
        category: 'Cliffside Promenade',
        description: 'Cliffside coastal park overlooking Bay of Bengal waves with direct view of the grounded cargo vessel MV MAA.',
        timeRequired: '1.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Sunset 5:00 PM',
        image: '/images/teneti_park.png',
        coordinates: { lat: 17.7380, lng: 83.3410 },
        isHiddenGem: true
      },
      {
        id: 'att-14',
        name: 'Dolphin’s Nose Lighthouse',
        category: 'Naval Viewpoint',
        description: 'Promontory rock cliff rising 358m above sea level with a historic naval lighthouse offering harbor entry views.',
        timeRequired: '2 hours',
        entryFee: 'Lighthouse Ticket ₹20',
        bestTimeOfDay: 'Afternoon 3:00 PM to 5:00 PM',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 17.6740, lng: 83.2920 }
      },
      {
        id: 'att-10',
        name: 'Yarada Beach',
        category: 'Secluded Beach',
        description: 'Golden sand beach enclosed by green hills on three sides, far less crowded than main city beaches.',
        timeRequired: '3 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Morning 8:00 AM',
        image: '/images/yarada_beach.png',
        coordinates: { lat: 17.6533, lng: 83.2689 },
        isHiddenGem: true
      },
      {
        id: 'att-15',
        name: 'Bheemili Beach & Dutch Fort',
        category: 'Colonial Heritage Coast',
        description: 'Tranquil beach town with 17th-century Dutch cemetery, ancient fort remains, and calm coconut palm coast.',
        timeRequired: '3.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Late Afternoon',
        image: '/images/bheemili_beach.png',
        coordinates: { lat: 17.8890, lng: 83.4540 },
        isHiddenGem: true
      },
      {
        id: 'att-16',
        name: 'TU-142 Aircraft Museum',
        category: 'Aviation Heritage',
        description: 'Decommissioned Tupolev TU-142M naval maritime patrol aircraft converted into an interactive museum opposite RK Beach.',
        timeRequired: '1 hour',
        entryFee: '₹70 per person',
        bestTimeOfDay: 'Evening 4:00 PM',
        image: '/images/tu142_museum.png',
        coordinates: { lat: 17.7135, lng: 83.3248 }
      }
    ],
    foodSpecialties: ['Royyala Iguru (Prawn Fry)', 'Vizag Chepala Pulusu (Fish Curry)', 'Madugula Halwa', 'Street Punugulu at Beach Road', 'Bamboo Biryani at Rushikonda'],
    communityObservations: [
      'City buses (Route 28Z & 38) connect Airport directly to Beach Road for ₹35.',
      'Auto drivers near Railway Station quote ₹300; walk 100m to main road for shared autos at ₹20.',
      'Avoid swimming at RK Beach due to strong undercurrents; head to Rushikonda Beach for safe swimming & water sports.',
      'RTC Bus Route 222 connects Dwaraka Bus Stand to Rushikonda every 15 minutes for ₹25.'
    ]
  },
  {
    id: 'araku',
    name: 'Araku Valley',
    state: 'Andhra Pradesh',
    tagline: 'Coffee plantations, tribal heritage & foggy Eastern Ghats',
    heroImage: '/images/araku.png',
    description: 'Nestled in the Eastern Ghats at 900m altitude, Araku Valley is famous for organic coffee, limestone Borra Caves, waterfalls, and indigenous Dhimsa tribal dance.',
    history: 'Home to indigenous tribal communities including Dhimsa dancers for centuries; expanded during British era with hill coffee gardens.',
    culture: 'Eco-conscious, rich tribal crafts, wooden handicrafts, organic farming, and traditional tribal cuisine.',
    bestVisitingTime: 'October to March (chilly mornings, lush greenery, blooming orchids)',
    avgDailyBudget: '₹1,500 – ₹3,000 per day',
    crowdStatus: 'Moderate Crowd',
    coordinates: { lat: 18.3273, lng: 82.8775 },
    attractions: [
      {
        id: 'att-5',
        name: 'Araku Valley Scenic Viewpoint',
        category: 'Valley View',
        description: 'Panoramic wide angle view of lush green rolling hills of the Eastern Ghats valley surrounded by foggy clouds and green coffee plantation slopes.',
        timeRequired: '1.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Early Morning 7:00 AM',
        image: '/images/araku.png',
        coordinates: { lat: 18.3273, lng: 82.8775 }
      },
      {
        id: 'att-5b',
        name: 'Borra Caves',
        category: 'Geological Wonder',
        description: 'Deep natural limestone caves filled with stalactite and stalagmite formations illuminated by colorful lighting.',
        timeRequired: '2 hours',
        entryFee: '₹80 per person',
        bestTimeOfDay: 'Morning 10:00 AM',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 18.2811, lng: 83.0392 }
      },
      {
        id: 'att-6',
        name: 'Katiki Waterfalls',
        category: 'Hidden Nature Trek',
        description: 'Trek or take a shared jeep through thick greenery to reach a 50-ft splashing waterfall near Borra Caves.',
        timeRequired: '2.5 hours',
        entryFee: 'Jeep fare ₹250 (shared)',
        bestTimeOfDay: 'Midday',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 18.2650, lng: 83.0180 },
        isHiddenGem: true
      },
      {
        id: 'att-7',
        name: 'Ananthagiri Coffee Plantations',
        category: 'Agro Tourism',
        description: 'Expansive shade-grown organic coffee estates surrounded by pepper vines and valley views.',
        timeRequired: '1.5 hours',
        entryFee: 'Free',
        bestTimeOfDay: 'Early Morning 7:30 AM',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
        coordinates: { lat: 18.2500, lng: 83.0000 }
      }
    ],
    foodSpecialties: ['Bamboo Chicken (Bongu Kodi)', 'Araku Organic Arabica Coffee', 'Jackfruit Curry', 'Millet Dosas'],
    communityObservations: [
      'Vistadome Glass Train (Vizag to Araku) must be booked 60 days in advance on IRCTC.',
      'Jeep drivers to Katiki Waterfalls negotiate rates in groups; wait for 4-5 travellers to share ₹250 total.',
      'Mobile signal can drop near Borra Caves area; download offline transport notes.'
    ]
  }
];
