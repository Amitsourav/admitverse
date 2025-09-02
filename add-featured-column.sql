-- Add featured column to colleges table
-- Run this in Supabase SQL Editor

ALTER TABLE colleges ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Update existing records to have featured = false by default
UPDATE colleges SET featured = false WHERE featured IS NULL;