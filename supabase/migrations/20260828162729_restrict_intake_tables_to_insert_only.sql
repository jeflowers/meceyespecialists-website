/*
  Lock down the six public intake tables.

  These tables are written by unauthenticated visitors filling in the public
  forms and are never read back by the site. Previously every command was
  granted to anon with an unconditional predicate, so anyone holding the
  publishable key could read, alter or delete all submitted records.

  1. Drop the permissive SELECT / UPDATE / DELETE policies.
  2. Revoke SELECT / UPDATE / DELETE from anon and authenticated.
  3. Keep exactly one INSERT policy per table so the public forms keep working.
*/

-- registrations
DROP POLICY IF EXISTS "allow_anon_select_registrations" ON registrations;
DROP POLICY IF EXISTS "allow_anon_update_registrations" ON registrations;
DROP POLICY IF EXISTS "allow_anon_delete_registrations" ON registrations;
REVOKE SELECT, UPDATE, DELETE ON registrations FROM anon, authenticated;

-- medical_history
DROP POLICY IF EXISTS "allow_anon_select_medical_history" ON medical_history;
DROP POLICY IF EXISTS "allow_anon_update_medical_history" ON medical_history;
DROP POLICY IF EXISTS "allow_anon_delete_medical_history" ON medical_history;
REVOKE SELECT, UPDATE, DELETE ON medical_history FROM anon, authenticated;

-- insurance_submissions
DROP POLICY IF EXISTS "allow_anon_select_insurance" ON insurance_submissions;
DROP POLICY IF EXISTS "allow_anon_update_insurance" ON insurance_submissions;
DROP POLICY IF EXISTS "allow_anon_delete_insurance" ON insurance_submissions;
REVOKE SELECT, UPDATE, DELETE ON insurance_submissions FROM anon, authenticated;

-- consent_submissions
DROP POLICY IF EXISTS "allow_anon_select_consent" ON consent_submissions;
DROP POLICY IF EXISTS "allow_anon_update_consent" ON consent_submissions;
DROP POLICY IF EXISTS "allow_anon_delete_consent" ON consent_submissions;
REVOKE SELECT, UPDATE, DELETE ON consent_submissions FROM anon, authenticated;

-- contact_messages
DROP POLICY IF EXISTS "allow_anon_select_contact" ON contact_messages;
DROP POLICY IF EXISTS "allow_anon_update_contact" ON contact_messages;
DROP POLICY IF EXISTS "allow_anon_delete_contact" ON contact_messages;
REVOKE SELECT, UPDATE, DELETE ON contact_messages FROM anon, authenticated;

-- referral_submissions
DROP POLICY IF EXISTS "allow_anon_select_referrals" ON referral_submissions;
DROP POLICY IF EXISTS "allow_anon_update_referrals" ON referral_submissions;
DROP POLICY IF EXISTS "allow_anon_delete_referrals" ON referral_submissions;
REVOKE SELECT, UPDATE, DELETE ON referral_submissions FROM anon, authenticated;
