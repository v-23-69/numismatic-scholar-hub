
-- Create the coin-images storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('coin-images', 'coin-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the coin-images bucket
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload coin images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'coin-images');

-- Allow authenticated users to update their own images
CREATE POLICY "Users can update their own coin images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to delete their own images
CREATE POLICY "Users can delete their own coin images" ON storage.objects
  FOR DELETE TO authenticated
  USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public access to view coin images
CREATE POLICY "Public can view coin images" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'coin-images');

-- Add missing columns to coin_listings table if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'coin_listings' AND column_name = 'metal') THEN
        ALTER TABLE coin_listings ADD COLUMN metal TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'coin_listings' AND column_name = 'condition') THEN
        ALTER TABLE coin_listings ADD COLUMN condition TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'coin_listings' AND column_name = 'dynasty') THEN
        ALTER TABLE coin_listings ADD COLUMN dynasty TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'coin_listings' AND column_name = 'category') THEN
        ALTER TABLE coin_listings ADD COLUMN category TEXT;
    END IF;
END
$$;
