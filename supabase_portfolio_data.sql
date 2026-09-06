-- SQL migration untuk tabel portfolio_data
-- Jalankan di SQL Editor Supabase project mloudfwmafiamvywvlrb

CREATE TABLE IF NOT EXISTS public.portfolio_data (
  key text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read portfolio_data"
  ON public.portfolio_data FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow public insert/update with check
CREATE POLICY "Allow public upsert portfolio_data"
  ON public.portfolio_data FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
