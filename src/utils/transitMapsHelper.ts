/**
 * LocalLens: Transit & Google Maps Navigation Helper
 * Provides hybrid navigation URLs and external transit fallbacks
 */

export interface GoogleMapsTransitLinkOptions {
  origin: string;
  destination: string;
  city?: string;
}

/**
 * Generate a direct Google Maps Transit directions URL
 */
export function buildGoogleMapsTransitUrl({
  origin,
  destination,
  city = 'Visakhapatnam'
}: GoogleMapsTransitLinkOptions): string {
  const originQuery = encodeURIComponent(`${origin.trim()}, ${city}`);
  const destQuery = encodeURIComponent(`${destination.trim()}, ${city}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${originQuery}&destination=${destQuery}&travelmode=transit`;
}

/**
 * Generate a Google Maps Place search URL
 */
export function buildGoogleMapsPlaceUrl(placeName: string, city: string = 'Visakhapatnam'): string {
  const query = encodeURIComponent(`${placeName.trim()}, ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
