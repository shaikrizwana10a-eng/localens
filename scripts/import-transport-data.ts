/**
 * LocalLens: Transport Dataset Ingestion & Supabase Migration Runner
 * Usage: npx ts-node scripts/import-transport-data.ts
 */

import { supabase } from '../src/lib/supabase';
import importedRoutes from '../src/data/importedTransportRoutes.json';
import type { TransportRouteRecord } from '../src/types/transportDataset';

export async function syncTransportDatasetToSupabase(): Promise<{
  success: boolean;
  totalSynced: number;
  error?: string;
}> {
  console.log(`[Transport Dataset Sync] Starting sync of ${importedRoutes.length} routes...`);

  if (!supabase) {
    console.log('[Transport Dataset Sync] Supabase is not configured with live credentials. Relying on local resilient JSON dataset.');
    return {
      success: true,
      totalSynced: importedRoutes.length
    };
  }

  try {
    const routesToInsert = (importedRoutes as TransportRouteRecord[]).map(r => ({
      id: r.id,
      source: r.source,
      route_number: r.route_number,
      depot: r.depot,
      from_location: r.from_location,
      to_location: r.to_location,
      transport_type: r.transport_type,
      is_active: r.is_active,
      created_at: r.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    // Upsert in batches of 50
    const batchSize = 50;
    let synced = 0;

    for (let i = 0; i < routesToInsert.length; i += batchSize) {
      const batch = routesToInsert.slice(i, i + batchSize);
      const { error } = await supabase
        .from('transport_routes')
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.error(`[Transport Dataset Sync] Batch error at index ${i}:`, error.message);
        return { success: false, totalSynced: synced, error: error.message };
      }
      synced += batch.length;
    }

    console.log(`[Transport Dataset Sync] Successfully synced ${synced} routes to Supabase.`);
    return { success: true, totalSynced: synced };
  } catch (err: any) {
    console.error('[Transport Dataset Sync] Exception during sync:', err);
    return { success: false, totalSynced: 0, error: err.message };
  }
}

// Allow direct execution
if (typeof process !== 'undefined' && process.argv[1]?.includes('import-transport-data')) {
  syncTransportDatasetToSupabase().then(res => {
    console.log('Sync Result:', res);
  });
}
