-- Registrations
CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  sex text,
  preferred_language text,
  marital_status text,
  street_address text,
  city text,
  state text,
  zip text,
  phone text,
  email text,
  contact_method text,
  emergency_name text,
  emergency_relationship text,
  emergency_phone text,
  pharmacy_name text,
  pharmacy_location text,
  heard_about_us text
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_registrations" ON registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow_anon_select_registrations" ON registrations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "allow_anon_update_registrations" ON registrations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_anon_delete_registrations" ON registrations FOR DELETE TO anon, authenticated USING (true);

-- Medical History
CREATE TABLE medical_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  visit_reason text NOT NULL,
  symptoms jsonb,
  wears_correction text,
  last_eye_exam text,
  eye_diagnoses jsonb,
  eye_surgeries text,
  family_history jsonb,
  health_conditions jsonb,
  medications text,
  drug_allergies text,
  smoker text
);

ALTER TABLE medical_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_medical_history" ON medical_history FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow_anon_select_medical_history" ON medical_history FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "allow_anon_update_medical_history" ON medical_history FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_anon_delete_medical_history" ON medical_history FOR DELETE TO anon, authenticated USING (true);

-- Insurance
CREATE TABLE insurance_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  insurance_company text NOT NULL,
  member_id text NOT NULL,
  group_number text,
  is_policyholder boolean DEFAULT true,
  policyholder_name text,
  policyholder_relationship text,
  has_medicare boolean DEFAULT false,
  has_medicaid boolean DEFAULT false,
  medicare_medicaid_id text,
  secondary_company text,
  secondary_member_id text,
  card_front_uploaded boolean DEFAULT false,
  card_back_uploaded boolean DEFAULT false
);

ALTER TABLE insurance_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_insurance" ON insurance_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow_anon_select_insurance" ON insurance_submissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "allow_anon_update_insurance" ON insurance_submissions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_anon_delete_insurance" ON insurance_submissions FOR DELETE TO anon, authenticated USING (true);

-- Consent
CREATE TABLE consent_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  hipaa_acknowledged boolean NOT NULL DEFAULT false,
  treatment_consented boolean NOT NULL DEFAULT false,
  financial_accepted boolean NOT NULL DEFAULT false,
  legal_name text NOT NULL,
  signature_date date NOT NULL,
  signature_data text NOT NULL
);

ALTER TABLE consent_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_consent" ON consent_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow_anon_select_consent" ON consent_submissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "allow_anon_update_consent" ON consent_submissions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_anon_delete_consent" ON consent_submissions FOR DELETE TO anon, authenticated USING (true);

-- Contact messages
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  topic text,
  message text NOT NULL
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_contact" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow_anon_select_contact" ON contact_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "allow_anon_update_contact" ON contact_messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_anon_delete_contact" ON contact_messages FOR DELETE TO anon, authenticated USING (true);

-- Referrals
CREATE TABLE referral_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  provider_name text NOT NULL,
  practice text,
  provider_phone text NOT NULL,
  provider_email text NOT NULL,
  patient_name text NOT NULL,
  patient_phone text,
  reason text NOT NULL,
  urgency text DEFAULT 'routine'
);

ALTER TABLE referral_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert_referrals" ON referral_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow_anon_select_referrals" ON referral_submissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "allow_anon_update_referrals" ON referral_submissions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_anon_delete_referrals" ON referral_submissions FOR DELETE TO anon, authenticated USING (true);
