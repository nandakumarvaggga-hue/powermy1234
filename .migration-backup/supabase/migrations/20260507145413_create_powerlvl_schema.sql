/*
  # POWERLVL App Schema

  ## Overview
  Creates the full database schema for the POWERLVL app - a social anime power-scaling scanner.

  ## New Tables

  ### profiles
  - `id` (uuid, FK to auth.users) - user identity
  - `username` (text, unique) - display name
  - `avatar_url` (text) - profile picture
  - `total_scans` (int) - lifetime scan count
  - `highest_score` (int) - personal best POWERLVL
  - `created_at` (timestamp)

  ### scans
  - `id` (uuid, PK) - scan identity
  - `user_id` (uuid, FK to profiles, nullable) - owner (null = anonymous)
  - `image_url` (text) - uploaded image URL
  - `score` (int) - POWERLVL 0-100000
  - `tier` (text) - power tier label
  - `commentary` (text) - AI-generated commentary
  - `attributes` (jsonb) - attribute scores {aura, drip, discipline, chaos_energy, presence, intimidation, rarity}
  - `is_public` (bool) - feed visibility
  - `likes` (int) - like count
  - `created_at` (timestamp)

  ### scan_likes
  - `scan_id` (uuid, FK to scans)
  - `user_id` (uuid, FK to profiles)
  - Unique constraint prevents double-liking

  ## Security
  - RLS enabled on all tables
  - Profiles: users can read all, update only own
  - Scans: public scans readable by all, insert/update own
  - Scan likes: authenticated users can insert/delete own likes
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  avatar_url text DEFAULT '',
  total_scans int DEFAULT 0,
  highest_score int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly readable"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Scans table
CREATE TABLE IF NOT EXISTS scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  score int NOT NULL CHECK (score >= 0 AND score <= 100000),
  tier text NOT NULL,
  commentary text NOT NULL DEFAULT '',
  attributes jsonb NOT NULL DEFAULT '{}',
  is_public bool DEFAULT true,
  likes int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public scans are readable by all"
  ON scans FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

CREATE POLICY "Users can read own private scans"
  ON scans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans"
  ON scans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anon users can insert scans without user_id"
  ON scans FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can update own scans"
  ON scans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Scan likes table
CREATE TABLE IF NOT EXISTS scan_likes (
  scan_id uuid NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (scan_id, user_id)
);

ALTER TABLE scan_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Scan likes are publicly readable"
  ON scan_likes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can like scans"
  ON scan_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own likes"
  ON scan_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS scans_created_at_idx ON scans (created_at DESC);
CREATE INDEX IF NOT EXISTS scans_score_idx ON scans (score DESC);
CREATE INDEX IF NOT EXISTS scans_user_id_idx ON scans (user_id);
CREATE INDEX IF NOT EXISTS profiles_highest_score_idx ON profiles (highest_score DESC);

-- Function to increment scan likes
CREATE OR REPLACE FUNCTION increment_scan_likes(scan_id_param uuid)
RETURNS void AS $$
BEGIN
  UPDATE scans SET likes = likes + 1 WHERE id = scan_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement scan likes
CREATE OR REPLACE FUNCTION decrement_scan_likes(scan_id_param uuid)
RETURNS void AS $$
BEGIN
  UPDATE scans SET likes = GREATEST(0, likes - 1) WHERE id = scan_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update profile stats after new scan
CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    UPDATE profiles
    SET
      total_scans = total_scans + 1,
      highest_score = GREATEST(highest_score, NEW.score)
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_scan_insert
  AFTER INSERT ON scans
  FOR EACH ROW EXECUTE FUNCTION update_profile_stats();
