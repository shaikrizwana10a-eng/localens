/**
 * LocalLens — Transport Dataset & Intelligent Data Layer Service
 * 
 * Supports:
 * - Direct Supabase PostgreSQL querying when configured
 * - Resilient offline/demo local JSON dataset fallback (173 active bus routes)
 * - Intelligent matching (abbreviations, synonyms, partial matching, route discovery)
 * - Hybrid Google Maps integration
 * - Extensible architecture for future datasets (trains, hotels, hospitals, etc.)
 */

import { supabase } from '../lib/supabase';
import importedRoutesRaw from '../data/importedTransportRoutes.json';
import type { 
  TransportRouteRecord, 
  DatasetImportStats, 
  TransportSearchParams, 
  ScoredRouteRecord 
} from '../types/transportDataset';

const LOCAL_DATASET: TransportRouteRecord[] = importedRoutesRaw as TransportRouteRecord[];

// Synonym and abbreviation dictionary for intelligent transit matching
const SYNONYM_MAP: Record<string, string[]> = {
  'rtc': ['rtc', 'rtc complex', 'central bus stand', 'bus complex'],
  'rtc complex': ['rtc complex', 'rtc', 'complex'],
  'duvvada': ['duvvada', 'duvvada railway station', 'duvvada rly', 'duvvada station'],
  'duvvada railway station': ['duvvada', 'duvvada railway station', 'duvvada rly'],
  'rk beach': ['rk beach', 'r.k. beach', 'ramakrishna beach', 'beach road', 'submarine'],
  'beach': ['rk beach', 'beach road', 'rushikonda'],
  'maddilapalem': ['maddilapalem', 'maddila palem', 'mdp'],
  'gajuwaka': ['gajuwaka', 'gajuwaka depot', 'gjwk'],
  'gajuwaka depot': ['gajuwaka depot', 'gajuwaka'],
  'simhachalam': ['simhachalam', 'simhachalam hills', 'simhadri', 'devasthanam'],
  'simhachalam hills': ['simhachalam hills', 'simhachalam'],
  'anakapalli': ['anakapalli', 'anakapalle', 'akp'],
  'scindia': ['scindia', 'sindia', 'scindia junction', 'naval dockyard'],
  'steel plant': ['steel plant', 'visakha steel city', 'ukku nagaram', 'steel city'],
  'araku': ['araku', 'araku valley'],
  'pendurthi': ['pendurthi', 'pndr'],
  'nad': ['nad', 'nad junction', 'nad flyover'],
  'nad junction': ['nad junction', 'nad'],
  'kurmannapalem': ['kurmannapalem', 'kurmanna palem'],
  'waltair': ['waltair', 'visakhapatnam railway station', 'rly station'],
  'railway station': ['railway station', 'rly station', 'station', 'stn']
};

/**
 * Normalizes query string for fuzzy comparison
 */
function normalizeQuery(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
}

/**
 * Expands search term with recognized synonyms
 */
function expandSearchTerms(term: string): string[] {
  const norm = term.toLowerCase().trim();
  const directMatches = SYNONYM_MAP[norm] || [];
  
  // Also check if any key is contained within norm
  const substringMatches: string[] = [];
  for (const [key, synonyms] of Object.entries(SYNONYM_MAP)) {
    if (norm.includes(key) || key.includes(norm)) {
      substringMatches.push(...synonyms);
    }
  }

  return Array.from(new Set([norm, ...directMatches, ...substringMatches]));
}

/**
 * Computes match score between query and target field
 */
function scoreMatch(queryTerm: string, targetValue: string): number {
  const qNorm = normalizeQuery(queryTerm);
  const tNorm = normalizeQuery(targetValue);

  if (!qNorm || !tNorm) return 0;

  // Exact match
  if (qNorm === tNorm) return 100;

  // Target starts with query
  if (tNorm.startsWith(qNorm)) return 90;

  // Query starts with target
  if (qNorm.startsWith(tNorm)) return 85;

  // Word boundary match
  const tWords = tNorm.split(/\s+/);
  if (tWords.includes(qNorm)) return 85;

  // Synonym match
  const expanded = expandSearchTerms(queryTerm);
  for (const syn of expanded) {
    const synNorm = normalizeQuery(syn);
    if (tNorm === synNorm) return 80;
    if (tNorm.includes(synNorm) || synNorm.includes(tNorm)) return 75;
  }

  // Substring match
  if (tNorm.includes(qNorm)) return 65;

  return 0;
}

export class TransportDatasetService {
  /**
   * Search routes in the LocalLens Transport Dataset
   */
  public static async searchRoutes(params: TransportSearchParams): Promise<{
    results: ScoredRouteRecord[];
    totalMatched: number;
    source: 'LOCAL_DATASET' | 'SUPABASE_POSTGRES';
    isExternalFallback?: boolean;
  }> {
    const fromQuery = params.from?.trim() || '';
    const toQuery = params.to?.trim() || '';
    const depotQuery = params.depot?.trim() || '';
    const routeNumQuery = params.routeNumber?.trim() || '';

    // If both from and to are blank and no other filters, return default active routes
    const isBlankSearch = !fromQuery && !toQuery && !depotQuery && !routeNumQuery;

    let allRoutes: TransportRouteRecord[] = LOCAL_DATASET;
    let dataSource: 'LOCAL_DATASET' | 'SUPABASE_POSTGRES' = 'LOCAL_DATASET';

    // Attempt live Supabase query if configured
    if (supabase) {
      try {
        let query = supabase.from('transport_routes').select('*').eq('is_active', true);
        if (depotQuery && depotQuery !== 'ALL') {
          query = query.ilike('depot', `%${depotQuery}%`);
        }
        if (routeNumQuery) {
          query = query.ilike('route_number', `%${routeNumQuery}%`);
        }
        const { data, error } = await query.limit(250);
        if (!error && data && data.length > 0) {
          allRoutes = data as TransportRouteRecord[];
          dataSource = 'SUPABASE_POSTGRES';
        }
      } catch (e) {
        console.warn('Supabase query failed, falling back to embedded dataset:', e);
      }
    }

    if (isBlankSearch) {
      const defaultResults: ScoredRouteRecord[] = allRoutes.slice(0, params.limit || 30).map(r => ({
        route: r,
        matchScore: 50,
        matchReason: 'Featured corridor route',
        isDirectCorridor: false,
        sourceType: 'LOCAL_LENS',
        confidenceLabel: 'LocalLens Transport Dataset'
      }));

      return {
        results: defaultResults,
        totalMatched: allRoutes.length,
        source: dataSource
      };
    }

    // Score and filter each route
    const scored: ScoredRouteRecord[] = [];

    for (const r of allRoutes) {
      if (depotQuery && depotQuery !== 'ALL' && r.depot.toLowerCase() !== depotQuery.toLowerCase()) {
        continue;
      }

      let score = 0;
      const reasons: string[] = [];
      let isDirect = false;

      // 1. Direct Route Number match (e.g. searching '38Y')
      if (routeNumQuery && r.route_number) {
        const rnScore = scoreMatch(routeNumQuery, r.route_number);
        if (rnScore > 0) {
          score += rnScore * 1.5;
          reasons.push(`Route #${r.route_number}`);
        }
      }

      // Check if user entered route number into 'from' or 'to' by mistake (e.g. '38Y')
      if (fromQuery && r.route_number && r.route_number.toLowerCase() === fromQuery.toLowerCase()) {
        score += 120;
        reasons.push(`Route #${r.route_number} match`);
      }

      // 2. Both From and To provided
      if (fromQuery && toQuery) {
        const fromScore = scoreMatch(fromQuery, r.from_location);
        const toScore = scoreMatch(toQuery, r.to_location);

        if (fromScore > 0 && toScore > 0) {
          // Direct corridor match
          score += (fromScore + toScore);
          isDirect = true;
          reasons.push(`Direct corridor: ${r.from_location} → ${r.to_location}`);
        } else {
          // Check reverse direction (e.g. return buses)
          const revFromScore = scoreMatch(fromQuery, r.to_location);
          const revToScore = scoreMatch(toQuery, r.from_location);
          if (revFromScore > 0 && revToScore > 0) {
            score += (revFromScore + revToScore) * 0.85;
            reasons.push(`Return corridor service`);
          }
        }
      } 
      // 3. Only From provided (Origin Route Discovery)
      else if (fromQuery && !toQuery) {
        const fromScore = scoreMatch(fromQuery, r.from_location);
        if (fromScore > 0) {
          score += fromScore;
          reasons.push(`Originates from ${r.from_location}`);
        } else {
          // Check if it passes through or touches depot
          const depotScore = scoreMatch(fromQuery, r.depot);
          if (depotScore > 0) {
            score += depotScore * 0.6;
            reasons.push(`Operating in ${r.depot} zone`);
          }
        }
      } 
      // 4. Only To provided (Destination Route Discovery)
      else if (!fromQuery && toQuery) {
        const toScore = scoreMatch(toQuery, r.to_location);
        if (toScore > 0) {
          score += toScore;
          reasons.push(`Arrives at ${r.to_location}`);
        }
      }

      if (score > 35) {
        scored.push({
          route: r,
          matchScore: Math.round(score),
          matchReason: reasons.join(' • ') || 'Corridor proximity',
          isDirectCorridor: isDirect,
          sourceType: 'LOCAL_LENS',
          confidenceLabel: isDirect ? 'Direct Verified Corridor' : 'Transit Dataset Match'
        });
      }
    }

    // Sort by score descending, then route_number
    scored.sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return (a.route.route_number || '').localeCompare(b.route.route_number || '');
    });

    const limit = params.limit || 50;
    return {
      results: scored.slice(0, limit),
      totalMatched: scored.length,
      source: dataSource
    };
  }

  /**
   * Get comprehensive dataset statistics
   */
  public static getDatasetStats(): DatasetImportStats {
    const depotCounts: Record<string, number> = {};
    for (const r of LOCAL_DATASET) {
      depotCounts[r.depot] = (depotCounts[r.depot] || 0) + 1;
    }

    return {
      totalRawRows: 184,
      uniqueRoutesCount: LOCAL_DATASET.length,
      duplicatesCount: 11,
      invalidRecordsCount: 0,
      depotsCount: depotCounts,
      importedAt: '12 Sept 2026',
      sourceFile: 'Visakhapatnam - Non AC Bus Route List(1).xlsx'
    };
  }

  /**
   * Get distinct depot names and counts
   */
  public static getDepots(): { depot: string; count: number }[] {
    const stats = this.getDatasetStats();
    return Object.entries(stats.depotsCount)
      .map(([depot, count]) => ({ depot, count }))
      .sort((a, b) => b.count - a.count);
  }
}
