
-- Create the coin-images storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('coin-images', 'coin-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the coin-images bucket
CREATE POLICY "Anyone can view coin images" ON storage.objects
FOR SELECT USING (bucket_id = 'coin-images');

CREATE POLICY "Authenticated users can upload coin images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'coin-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own coin images" ON storage.objects
FOR UPDATE USING (bucket_id = 'coin-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own coin images" ON storage.objects
FOR DELETE USING (bucket_id = 'coin-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add missing columns to coin_listings table if they don't exist
ALTER TABLE coin_listings 
ADD COLUMN IF NOT EXISTS metal TEXT,
ADD COLUMN IF NOT EXISTS condition TEXT,
ADD COLUMN IF NOT EXISTS dynasty TEXT,
ADD COLUMN IF NOT EXISTS category TEXT;
