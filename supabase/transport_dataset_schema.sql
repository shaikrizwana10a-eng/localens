-- ============================================================================
-- LocalLens: Transport Dataset Schema (PostgreSQL / Supabase)
-- Table: transport_routes
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create transport_routes table
CREATE TABLE IF NOT EXISTS public.transport_routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL DEFAULT 'Visakhapatnam Non-AC Bus Dataset',
  route_number TEXT,
  depot TEXT NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  transport_type TEXT NOT NULL DEFAULT 'bus',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Performance Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_transport_routes_route_no ON public.transport_routes(route_number);
CREATE INDEX IF NOT EXISTS idx_transport_routes_depot ON public.transport_routes(depot);
CREATE INDEX IF NOT EXISTS idx_transport_routes_from ON public.transport_routes(from_location);
CREATE INDEX IF NOT EXISTS idx_transport_routes_to ON public.transport_routes(to_location);
CREATE INDEX IF NOT EXISTS idx_transport_routes_type ON public.transport_routes(transport_type);
CREATE INDEX IF NOT EXISTS idx_transport_routes_active ON public.transport_routes(is_active);
CREATE INDEX IF NOT EXISTS idx_transport_routes_corridor ON public.transport_routes(from_location, to_location);

-- 3. Row Level Security (RLS)
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all active transport routes
CREATE POLICY "Public can view active transport routes"
  ON public.transport_routes
  FOR SELECT
  USING (true);

-- Authenticated users with admin/service role can manage dataset
CREATE POLICY "Admins can insert transport routes"
  ON public.transport_routes
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admins can update transport routes"
  ON public.transport_routes
  FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admins can delete transport routes"
  ON public.transport_routes
  FOR DELETE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 4. Helpful View for Corridor Discovery
CREATE OR REPLACE VIEW public.vw_active_bus_routes AS
SELECT 
  id,
  route_number,
  depot,
  from_location,
  to_location,
  transport_type,
  source,
  created_at
FROM public.transport_routes
WHERE is_active = true
ORDER BY depot, route_number;
