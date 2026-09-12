// ============================================================================
// External Place Provider Abstraction Types
// ============================================================================

import type { DataSourceType, VerificationStatus } from '../../types/provenance';

export interface ExternalPlaceResult {
  externalId: string;
  name: string;
  formattedAddress: string;
  city: string;
  category: string;
  latitude: number;
  longitude: number;
  rating?: number;
  userRatingsTotal?: number;
  photos?: string[];
  sourceType: DataSourceType;
  verificationStatus: VerificationStatus; // Always 'PENDING' / External Reference
  retrievedAt: string;
  attribution: string;
  disclaimer: string;
}

export interface ExternalPlaceDetails extends ExternalPlaceResult {
  openingHours?: string[];
  phoneNumber?: string;
  website?: string;
  overviewSummary?: string;
  priceLevel?: number; // 1-4
}

export interface ExternalWebSearchResult {
  title: string;
  snippet: string;
  link: string;
  sourceType: DataSourceType; // 'GOOGLE_SEARCH'
  retrievedAt: string;
  attribution: string;
}

/**
 * Provider contract: Decouples LocalLens from Google or any specific external API.
 */
export interface ExternalPlaceProvider {
  readonly providerName: string;
  readonly isConfigured: boolean;

  searchPlaces(query: string, city?: string): Promise<ExternalPlaceResult[]>;
  getPlaceDetails(externalId: string): Promise<ExternalPlaceDetails | null>;
  searchWebInformation(query: string): Promise<ExternalWebSearchResult[]>;
}
