// ============================================================================
// Google Places Provider Implementation
// ============================================================================

import type { 
  ExternalPlaceProvider, 
  ExternalPlaceResult, 
  ExternalPlaceDetails, 
  ExternalWebSearchResult 
} from './types';

// Curated reference database representing Google Places responses for key Andhra/Telangana/Karnataka corridors
const MOCK_GOOGLE_PLACES_REGISTRY: ExternalPlaceDetails[] = [
  {
    externalId: 'gplace-vizag-rkbeach',
    name: 'Ramakrishna Beach (RK Beach)',
    formattedAddress: 'Beach Road, Maharanipeta, Visakhapatnam, Andhra Pradesh 530002',
    city: 'Visakhapatnam',
    category: 'Tourist Attraction & Promenade',
    latitude: 17.7142,
    longitude: 83.3236,
    rating: 4.5,
    userRatingsTotal: 34200,
    photos: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'],
    sourceType: 'GOOGLE_MAPS',
    verificationStatus: 'PENDING',
    retrievedAt: new Date().toISOString(),
    attribution: 'Google Maps Platform (Places API)',
    disclaimer: 'External reference data from Google Maps. Not verified by LocalLens Verification Desk.',
    overviewSummary: 'Popular urban seaside beach along the Bay of Bengal with paved pedestrian promenade, submarine museum, and evening food kiosks.',
    openingHours: ['Open 24 hours daily']
  },
  {
    externalId: 'gplace-vizag-submarine',
    name: 'INS Kursura Submarine Museum',
    formattedAddress: 'RK Beach Rd, Kirlampudi Layout, Visakhapatnam, Andhra Pradesh 530017',
    city: 'Visakhapatnam',
    category: 'Maritime Museum',
    latitude: 17.7185,
    longitude: 83.3328,
    rating: 4.6,
    userRatingsTotal: 18900,
    photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'],
    sourceType: 'GOOGLE_MAPS',
    verificationStatus: 'PENDING',
    retrievedAt: new Date().toISOString(),
    attribution: 'Google Maps Platform (Places API)',
    disclaimer: 'External reference data from Google Maps. Not verified by LocalLens Verification Desk.',
    overviewSummary: 'Decommissioned Soviet-built submarine turned walk-in maritime naval museum on the sands of RK Beach.',
    openingHours: ['Tue–Sat: 2:00 PM – 8:30 PM', 'Sun: 10:00 AM – 8:30 PM', 'Mon: Closed']
  },
  {
    externalId: 'gplace-tirupati-tirumala',
    name: 'Sri Venkateswara Swamy Temple',
    formattedAddress: 'S Mada St, Tirumala, Tirupati, Andhra Pradesh 517504',
    city: 'Tirupati',
    category: 'Hindu Temple & Pilgrimage',
    latitude: 13.6833,
    longitude: 79.3472,
    rating: 4.9,
    userRatingsTotal: 98000,
    photos: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800'],
    sourceType: 'GOOGLE_MAPS',
    verificationStatus: 'PENDING',
    retrievedAt: new Date().toISOString(),
    attribution: 'Google Maps Platform (Places API)',
    disclaimer: 'External reference data from Google Maps. Not verified by LocalLens Verification Desk.',
    overviewSummary: 'Historic landmark Vaishnavite temple situated on the seventh peak of the Venkatadri hill range.',
    openingHours: ['Daily: 3:00 AM – 11:30 PM']
  },
  {
    externalId: 'gplace-araku-borra',
    name: 'Borra Caves',
    formattedAddress: 'Ananthagiri Hills, Visakhapatnam District, Andhra Pradesh 531149',
    city: 'Araku Valley',
    category: 'Natural Geological Formation',
    latitude: 18.2801,
    longitude: 83.0401,
    rating: 4.4,
    userRatingsTotal: 14200,
    photos: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'],
    sourceType: 'GOOGLE_MAPS',
    verificationStatus: 'PENDING',
    retrievedAt: new Date().toISOString(),
    attribution: 'Google Maps Platform (Places API)',
    disclaimer: 'External reference data from Google Maps. Not verified by LocalLens Verification Desk.',
    overviewSummary: 'Million-year-old limestone karstic caves located in the Ananthagiri hill range featuring illuminated speleothems.',
    openingHours: ['Daily: 10:00 AM – 5:00 PM']
  },
  {
    externalId: 'gplace-blr-cubbon',
    name: 'Cubbon Park',
    formattedAddress: 'Kasturba Rd, Behind High Court of Karnataka, Bengaluru, Karnataka 560001',
    city: 'Bengaluru',
    category: 'Public Botanical Park',
    latitude: 12.9763,
    longitude: 77.5929,
    rating: 4.6,
    userRatingsTotal: 52000,
    photos: ['https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800'],
    sourceType: 'GOOGLE_MAPS',
    verificationStatus: 'PENDING',
    retrievedAt: new Date().toISOString(),
    attribution: 'Google Maps Platform (Places API)',
    disclaimer: 'External reference data from Google Maps. Not verified by LocalLens Verification Desk.',
    overviewSummary: 'Historic 300-acre lush green park in central Bengaluru adjacent to Vidhana Soudha and metro corridor.',
    openingHours: ['Daily: 6:00 AM – 7:00 PM']
  }
];

export class GooglePlacesProvider implements ExternalPlaceProvider {
  readonly providerName = 'Google Maps Platform';
  readonly isConfigured: boolean;
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 
                  import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '';
    this.isConfigured = Boolean(
      this.apiKey && 
      !this.apiKey.includes('placeholder') &&
      this.apiKey.length > 10
    );
  }

  async searchPlaces(query: string, city?: string): Promise<ExternalPlaceResult[]> {
    const q = query.toLowerCase().trim();
    const c = city?.toLowerCase().trim();

    // If live API key is configured, use official Google Places Text Search endpoint
    if (this.isConfigured) {
      try {
        const endpoint = `https://places.googleapis.com/v1/places:searchText`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': this.apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.primaryTypeDisplayName,places.rating,places.userRatingCount'
          },
          body: JSON.stringify({
            textQuery: `${query} ${city || ''}`.trim()
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.places)) {
            // Map official Places response to standard ExternalPlaceResult
            return data.places.map((p: any) => ({
              externalId: p.id,
              name: p.displayName?.text || 'Unknown Place',
              formattedAddress: p.formattedAddress || '',
              city: city || 'Unknown',
              category: p.primaryTypeDisplayName?.text || 'Point of Interest',
              latitude: p.location?.latitude || 0,
              longitude: p.location?.longitude || 0,
              rating: p.rating,
              userRatingsTotal: p.userRatingCount,
              sourceType: 'GOOGLE_MAPS',
              verificationStatus: 'PENDING',
              retrievedAt: new Date().toISOString(),
              attribution: 'Google Maps Platform (Places API New)',
              disclaimer: 'External reference data from Google Places. Not verified by LocalLens Verification Desk.'
            }));
          }
        }
      } catch (err) {
        console.warn('Google Places live fetch failed, using reference fallback:', err);
      }
    }

    // Reference fallback mode (safe simulated Google results, zero scraping)
    return MOCK_GOOGLE_PLACES_REGISTRY.filter((place) => {
      const matchName = place.name.toLowerCase().includes(q);
      const matchCategory = place.category.toLowerCase().includes(q);
      const matchAddress = place.formattedAddress.toLowerCase().includes(q);
      const matchCity = c ? place.city.toLowerCase().includes(c) : true;

      return (matchName || matchCategory || matchAddress) && matchCity;
    });
  }

  async getPlaceDetails(externalId: string): Promise<ExternalPlaceDetails | null> {
    const found = MOCK_GOOGLE_PLACES_REGISTRY.find(p => p.externalId === externalId);
    if (found) {
      return {
        ...found,
        retrievedAt: new Date().toISOString()
      };
    }
    return null;
  }

  async searchWebInformation(query: string): Promise<ExternalWebSearchResult[]> {
    return [
      {
        title: `${query} - Overview & Basic Travel Facts`,
        snippet: `Public web index reference for ${query}. For local transport schedules, boarding platforms, and fair fares, consult LocalLens verified community intelligence.`,
        link: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        sourceType: 'GOOGLE_SEARCH',
        retrievedAt: new Date().toISOString(),
        attribution: 'Google Web Search Reference'
      }
    ];
  }
}
