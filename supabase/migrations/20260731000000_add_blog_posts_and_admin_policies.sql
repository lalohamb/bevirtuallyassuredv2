/*
# Blog Posts Table

Adds a `blog_posts` table for admin-managed blog content.

## Table
- id, slug (unique), title, category, summary, body, image_url, read_time, published, created_at, updated_at

## Security (RLS)
- Public SELECT on published posts (anon + authenticated)
- Admin-only INSERT / UPDATE / DELETE using a custom claim `app_role = 'admin'`
  set via Supabase Auth user_metadata on the admin account.

## Admin setup
After running this migration, set the admin role on your user in Supabase dashboard:
  Authentication → Users → select user → Edit → user_metadata → { "app_role": "admin" }
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  summary text,
  body text,
  image_url text,
  read_time text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
DROP POLICY IF EXISTS "public_select_blog_posts" ON blog_posts;
CREATE POLICY "public_select_blog_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (published = true);

-- Admin can read all posts (including drafts)
DROP POLICY IF EXISTS "admin_select_blog_posts" ON blog_posts;
CREATE POLICY "admin_select_blog_posts" ON blog_posts FOR SELECT
  TO authenticated USING (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

-- Admin can insert
DROP POLICY IF EXISTS "admin_insert_blog_posts" ON blog_posts;
CREATE POLICY "admin_insert_blog_posts" ON blog_posts FOR INSERT
  TO authenticated WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

-- Admin can update
DROP POLICY IF EXISTS "admin_update_blog_posts" ON blog_posts;
CREATE POLICY "admin_update_blog_posts" ON blog_posts FOR UPDATE
  TO authenticated USING (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

-- Admin can delete
DROP POLICY IF EXISTS "admin_delete_blog_posts" ON blog_posts;
CREATE POLICY "admin_delete_blog_posts" ON blog_posts FOR DELETE
  TO authenticated USING (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

-- Admin can also read leads
DROP POLICY IF EXISTS "admin_select_leads" ON leads;
CREATE POLICY "admin_select_leads" ON leads FOR SELECT
  TO authenticated USING (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

-- Admin can update lead status
DROP POLICY IF EXISTS "admin_update_leads" ON leads;
CREATE POLICY "admin_update_leads" ON leads FOR UPDATE
  TO authenticated USING (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

-- Admin can manage portfolio projects
DROP POLICY IF EXISTS "admin_all_portfolio" ON portfolio_projects;
CREATE POLICY "admin_all_portfolio" ON portfolio_projects FOR ALL
  TO authenticated USING (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  ) WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

-- Admin can manage packages
DROP POLICY IF EXISTS "admin_all_packages" ON packages;
CREATE POLICY "admin_all_packages" ON packages FOR ALL
  TO authenticated USING (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  ) WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'
  );

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
