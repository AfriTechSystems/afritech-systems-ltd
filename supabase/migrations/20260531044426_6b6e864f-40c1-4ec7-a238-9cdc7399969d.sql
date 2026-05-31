
-- 1. SEO columns on articles
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS og_image text;

-- 2. Storage bucket for article images (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage RLS policies
DROP POLICY IF EXISTS "Article images are publicly readable" ON storage.objects;
CREATE POLICY "Article images are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

DROP POLICY IF EXISTS "Editors and admins can upload article images" ON storage.objects;
CREATE POLICY "Editors and admins can upload article images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'article-images'
    AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role))
  );

DROP POLICY IF EXISTS "Editors and admins can update article images" ON storage.objects;
CREATE POLICY "Editors and admins can update article images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'article-images'
    AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role))
  );

DROP POLICY IF EXISTS "Editors and admins can delete article images" ON storage.objects;
CREATE POLICY "Editors and admins can delete article images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'article-images'
    AND (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role))
  );
