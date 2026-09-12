/**
 * LocalLens — Transport Dataset & Data Layer Types
 */

export interface TransportRouteRecord {
  id: string;
  source: string;
  route_number: string | null;
  depot: string;
  from_location: string;
  to_location: string;
  transport_type: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DatasetImportStats {
  totalRawRows: number;
  uniqueRoutesCount: number;
  duplicatesCount: number;
  invalidRecordsCount: number;
  depotsCount: Record<string, number>;
  importedAt: string;
  sourceFile: string;
}

export interface TransportSearchParams {
  from?: string;
  to?: string;
  depot?: string;
  routeNumber?: string;
  limit?: number;
}

export interface ScoredRouteRecord {
  route: TransportRouteRecord;
  matchScore: number;
  matchReason: string;
  isDirectCorridor: boolean;
  sourceType: 'LOCAL_LENS' | 'GOOGLE_MAPS';
  confidenceLabel: string;
}
