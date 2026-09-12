// ============================================================================
// External Place Providers Barrel & Factory
// ============================================================================

import type { ExternalPlaceProvider } from './types';
import { GooglePlacesProvider } from './googlePlacesProvider';
import { GoogleSearchProvider } from './googleSearchProvider';

export * from './types';
export * from './googlePlacesProvider';
export * from './googleSearchProvider';

// Singleton instance
let defaultPlaceProvider: ExternalPlaceProvider | null = null;
let defaultSearchProvider: GoogleSearchProvider | null = null;

export function getExternalPlaceProvider(): ExternalPlaceProvider {
  if (!defaultPlaceProvider) {
    defaultPlaceProvider = new GooglePlacesProvider();
  }
  return defaultPlaceProvider;
}

export function getExternalSearchProvider(): GoogleSearchProvider {
  if (!defaultSearchProvider) {
    defaultSearchProvider = new GoogleSearchProvider();
  }
  return defaultSearchProvider;
}
