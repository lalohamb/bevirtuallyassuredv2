import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

export type Package = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price_cents: number;
  billing_period: string | null;
  features: string[];
  popular: boolean;
  sort_order: number;
  active: boolean;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  client_name: string | null;
  category: string | null;
  summary: string | null;
  description: string | null;
  services: string[];
  image_url: string | null;
  result: string | null;
  sort_order: number;
  published: boolean;
};

export type ClientProfile = {
  id: string;
  user_id: string;
  business_name: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  business_type: string | null;
  monthly_hours: number | null;
  preferred_tools: string | null;
  notes: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  status: string;
  total_cents: number;
  stripe_session_id: string | null;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  package_slug: string;
  name: string;
  price_cents: number;
  quantity: number;
};

export type Lead = {
  id?: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service_interest?: string | null;
  message?: string | null;
  status?: string;
  created_at?: string;
};

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  summary: string | null;
  body: string | null;
  image_url: string | null;
  read_time: string | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export function isAdmin(user: { user_metadata?: Record<string, unknown> } | null): boolean {
  return user?.user_metadata?.app_role === 'admin';
}
