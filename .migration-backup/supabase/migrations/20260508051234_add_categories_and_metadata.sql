/*
  # Add Category System and Share Metadata

  ## Overview
  Extends POWERLVL schema to support category-based ecosystems and viral share functionality.

  ## New Columns

  ### scans table additions
  - `category` (text) - fitness, setups, rides, drip, pets, wildcard
  - `category_attributes` (jsonb) - category-specific attribute scores
  - `share_url` (text) - shareable card URL
  - `share_count` (int) - viral tracking
  - `view_count` (int) - engagement tracking

  ## Modified Tables
  - scans: Add category system
  - profiles: Add category specializations

  ## Indexes
  - scans(category, score DESC)
  - scans(category, created_at DESC)
  - scans(category, user_id)
*/

-- Add category columns to scans if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'scans' AND column_name = 'category'
  ) THEN
    ALTER TABLE scans ADD COLUMN category text DEFAULT 'wildcard';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'scans' AND column_name = 'category_attributes'
  ) THEN
    ALTER TABLE scans ADD COLUMN category_attributes jsonb DEFAULT '{}';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'scans' AND column_name = 'share_url'
  ) THEN
    ALTER TABLE scans ADD COLUMN share_url text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'scans' AND column_name = 'share_count'
  ) THEN
    ALTER TABLE scans ADD COLUMN share_count int DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'scans' AND column_name = 'view_count'
  ) THEN
    ALTER TABLE scans ADD COLUMN view_count int DEFAULT 0;
  END IF;
END $$;

-- Add category specialization to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'category_scores'
  ) THEN
    ALTER TABLE profiles ADD COLUMN category_scores jsonb DEFAULT '{}';
  END IF;
END $$;

-- Create category leaderboard index
CREATE INDEX IF NOT EXISTS scans_category_score_idx ON scans (category, score DESC);
CREATE INDEX IF NOT EXISTS scans_category_created_idx ON scans (category, created_at DESC);
CREATE INDEX IF NOT EXISTS scans_category_user_idx ON scans (category, user_id);
