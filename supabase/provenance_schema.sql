-- ============================================================================
-- LocalLens: Data Source, Provenance, & Verification Database Schema
-- ============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. Enums for Source and Verification Integrity
-- ----------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE public.data_source_type AS ENUM (
    'GOOGLE_MAPS',
    'GOOGLE_SEARCH',
    'COMMUNITY',
    'LOCAL_LENS',
    'ADMIN'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.verification_status_type AS ENUM (
    'PENDING',
    'UNDER_REVIEW',
    'VERIFIED',
    'REJECTED',
    'OUTDATED'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.contribution_category_type AS ENUM (
    'TRANSPORT',
    'FARE',
    'BOARDING_POINT',
    'ROUTE',
    'FOOD',
    'STAY',
    'LOCAL_TIP',
    'SAFETY',
    'PARKING',
    'ACCESSIBILITY',
    'OTHER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.evidence_kind_type AS ENUM (
    'TICKET',
    'RECEIPT',
    'PHOTO',
    'DOCUMENT',
    'SCREENSHOT',
    'OTHER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ----------------------------------------------------------------------------
-- 2. Places Table (Registry of destinations, POIs, external places)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Attraction',
  address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  external_place_id TEXT, -- e.g. Google Place ID 'ChIJRz1gD-...'
  source_type public.data_source_type NOT NULL DEFAULT 'LOCAL_LENS',
  verification_status public.verification_status_type NOT NULL DEFAULT 'VERIFIED',
  retrieved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_places_city ON public.places(city);
CREATE INDEX IF NOT EXISTS idx_places_external_id ON public.places(external_place_id);

-- ----------------------------------------------------------------------------
-- 3. Contributions Table (User-submitted local intelligence)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  place_id UUID REFERENCES public.places(id) ON DELETE CASCADE,
  place_name TEXT NOT NULL,
  contribution_type public.contribution_category_type NOT NULL DEFAULT 'LOCAL_TIP',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  location_detail TEXT,      -- e.g. "Platform 2, RTC Bus Stand"
  reported_fare TEXT,        -- e.g. "₹45"
  source_type public.data_source_type NOT NULL DEFAULT 'COMMUNITY',
  verification_status public.verification_status_type NOT NULL DEFAULT 'PENDING',
  submitted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rejection_reason TEXT,
  outdated_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_contributions_place ON public.contributions(place_id);
CREATE INDEX IF NOT EXISTS idx_contributions_user ON public.contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON public.contributions(verification_status);

-- ----------------------------------------------------------------------------
-- 4. Evidence Table (Supporting proof attached to contributions)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contribution_id UUID NOT NULL REFERENCES public.contributions(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  evidence_type public.evidence_kind_type NOT NULL DEFAULT 'PHOTO',
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evidence_contribution ON public.evidence(contribution_id);

-- ----------------------------------------------------------------------------
-- 5. Verification History Table (Append-only immutable audit trail)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.verification_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contribution_id UUID NOT NULL REFERENCES public.contributions(id) ON DELETE CASCADE,
  previous_status public.verification_status_type NOT NULL,
  new_status public.verification_status_type NOT NULL,
  changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  changed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  reason TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_verification_history_contrib ON public.verification_history(contribution_id);

-- ----------------------------------------------------------------------------
-- 6. Outdated Reports Table (Flagged items from the community)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.outdated_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id TEXT NOT NULL,
  target_title TEXT NOT NULL,
  reported_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reason_category TEXT NOT NULL,
  notes TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING_REVIEW',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outdated_reports ENABLE ROW LEVEL SECURITY;

-- 1. Places Policies
-- Anyone can view registered places
CREATE POLICY "Public can view places"
  ON public.places FOR SELECT
  USING (true);

-- 2. Contributions Policies
-- Anyone can view VERIFIED contributions; users can also view their own pending/rejected contributions
CREATE POLICY "View verified or own contributions"
  ON public.contributions FOR SELECT
  USING (
    verification_status = 'VERIFIED' OR 
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  );

-- Authenticated users can insert their own contributions with strictly PENDING status
CREATE POLICY "Users can submit contributions with PENDING status"
  ON public.contributions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND 
    verification_status = 'PENDING' AND
    source_type = 'COMMUNITY'
  );

-- Users can update only their own PENDING contributions (cannot modify verified status)
CREATE POLICY "Users can update own pending contributions"
  ON public.contributions FOR UPDATE
  USING (
    auth.uid() = user_id AND 
    verification_status = 'PENDING'
  )
  WITH CHECK (
    auth.uid() = user_id AND 
    verification_status = 'PENDING'
  );

-- 3. Evidence Policies
-- Evidence for verified contributions is viewable; users can view their own uploaded evidence
CREATE POLICY "View verified evidence or own uploads"
  ON public.evidence FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.contributions c 
      WHERE c.id = contribution_id AND (c.verification_status = 'VERIFIED' OR c.user_id = auth.uid())
    )
  );

-- Users can upload evidence for their own contributions
CREATE POLICY "Users can insert evidence for own contributions"
  ON public.evidence FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM public.contributions c 
      WHERE c.id = contribution_id AND c.user_id = auth.uid()
    )
  );

-- 4. Verification History Policies
-- Anyone can view audit history for transparency
CREATE POLICY "Public audit trail view"
  ON public.verification_history FOR SELECT
  USING (true);

-- 5. Outdated Reports Policies
-- Users can report outdated facts
CREATE POLICY "Users can submit outdated reports"
  ON public.outdated_reports FOR INSERT
  WITH CHECK (auth.uid() = reported_by OR reported_by IS NULL);

-- ============================================================================
-- Supabase Storage: Evidence Bucket Configuration
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('evidence', 'evidence', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: authenticated users upload evidence files into their user folder
CREATE POLICY "Users can upload evidence files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'evidence' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own evidence files or verified evidence"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'evidence' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      auth.role() = 'authenticated'
    )
  );
