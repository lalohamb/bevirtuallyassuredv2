/*
# Tighten leads INSERT RLS policy

## Overview
The previous `public_insert_leads` policy used `WITH CHECK (true)`, which allowed
unrestricted inserts from anon/authenticated roles and effectively bypassed RLS.
This migration replaces it with a policy that validates the submitted lead data
before allowing the insert.

## Changes
- Drops the old `public_insert_leads` policy.
- Creates a new `public_insert_leads` policy scoped to `anon, authenticated`
  (the lead form is public, so anon must be able to insert).
- The `WITH CHECK` clause enforces that only well-formed lead rows are accepted:
  1. `name` is a non-empty string (not null, not empty).
  2. `email` is a non-empty string (not null, not empty).
  3. `status` is either omitted (defaults to 'new') or set to 'new' — callers
     cannot inject an arbitrary status like 'contacted' or 'converted'.
  4. `service_interest`, if provided, must be non-empty.
This still lets the public lead-capture form work while preventing junk or
status-manipulation inserts.

## Security
- INSERT is still public (anon + authenticated) — required for the lead form.
- SELECT / UPDATE / DELETE remain locked down (no policies = no client access).
- The WITH CHECK clause now enforces data validity instead of `true`.
*/

DROP POLICY IF EXISTS "public_insert_leads" ON leads;

CREATE POLICY "public_insert_leads" ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL
    AND btrim(name) <> ''
    AND email IS NOT NULL
    AND btrim(email) <> ''
    AND (status IS NULL OR status = 'new')
    AND (service_interest IS NULL OR btrim(service_interest) <> '')
  );
