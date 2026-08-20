/*
# Virtual Assistant Company — Core Schema

## Overview
Creates the full data model for a virtual assistant company website:
public marketing content (portfolio, packages), a public lead-capture form,
and authenticated client features (onboarding profile, ecommerce orders).

## New Tables
1. `leads` — submissions from the public lead-capture form (no sign-in required).
   - id, name, email, company, phone, service_interest, message, status, created_at
2. `packages` — the service packages shown on the pricing page (public read).
   - id, slug, name, tagline, description, price_cents, billing_period, features (jsonb), popular, sort_order, active
3. `portfolio_projects` — case studies / work samples shown on the portfolio page (public read).
   - id, slug, title, client_name, category, summary, description, services (text[]), image_url, result, sort_order, published, created_at
4. `client_profiles` — onboarding details for signed-in clients (owner-scoped).
   - id, user_id (defaults to auth.uid()), business_name, contact_name, email, phone, business_type, monthly_hours, preferred_tools, notes, onboarding_completed, created_at, updated_at
5. `orders` — ecommerce orders placed by signed-in clients (owner-scoped).
   - id, user_id (defaults to auth.uid()), status, total_cents, stripe_session_id, created_at
6. `order_items` — line items belonging to an order (owner-scoped via order).
   - id, order_id, package_slug, name, price_cents, quantity

## Security (RLS)
- `leads`: public INSERT (anon + authenticated), no SELECT/UPDATE/DELETE from the client
  (only service role can read leads — the company owner reviews them server-side).
- `packages`: public SELECT (anon + authenticated); no client writes.
- `portfolio_projects`: public SELECT (anon + authenticated); no client writes.
- `client_profiles`: owner-scoped CRUD (authenticated, auth.uid() = user_id).
- `orders`: owner-scoped SELECT/INSERT (authenticated). Updates/deletes are
  server-side only (service role) so clients cannot alter order status.
- `order_items`: owner-scoped SELECT/INSERT through the parent order's user_id.
  Updates/deletes are server-side only.

## Notes
1. Owner columns default to `auth.uid()` so inserts that omit `user_id` succeed.
2. Prices stored as integer cents to avoid floating-point issues.
3. `features` on packages is a JSONB array of feature strings for flexible display.
*/

-- ===== leads =====
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  service_interest text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_leads" ON leads;
CREATE POLICY "public_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- ===== packages =====
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  description text,
  price_cents integer NOT NULL DEFAULT 0,
  billing_period text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  popular boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true
);
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_packages" ON packages;
CREATE POLICY "public_select_packages" ON packages FOR SELECT
  TO anon, authenticated USING (true);

-- ===== portfolio_projects =====
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  client_name text,
  category text,
  summary text,
  description text,
  services text[] DEFAULT '{}',
  image_url text,
  result text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_portfolio" ON portfolio_projects;
CREATE POLICY "public_select_portfolio" ON portfolio_projects FOR SELECT
  TO anon, authenticated USING (true);

-- ===== client_profiles =====
CREATE TABLE IF NOT EXISTS client_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text,
  contact_name text,
  email text,
  phone text,
  business_type text,
  monthly_hours integer,
  preferred_tools text,
  notes text,
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON client_profiles;
CREATE POLICY "select_own_profile" ON client_profiles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_profile" ON client_profiles;
CREATE POLICY "insert_own_profile" ON client_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_profile" ON client_profiles;
CREATE POLICY "update_own_profile" ON client_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_profile" ON client_profiles;
CREATE POLICY "delete_own_profile" ON client_profiles FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ===== orders =====
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  total_cents integer NOT NULL DEFAULT 0,
  stripe_session_id text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_orders" ON orders;
CREATE POLICY "select_own_orders" ON orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_orders" ON orders;
CREATE POLICY "insert_own_orders" ON orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- ===== order_items =====
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  package_slug text NOT NULL,
  name text NOT NULL,
  price_cents integer NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1
);
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_order_items" ON order_items;
CREATE POLICY "select_own_order_items" ON order_items FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_order_items" ON order_items;
CREATE POLICY "insert_own_order_items" ON order_items FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- ===== indexes =====
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_client_profiles_user_id ON client_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
