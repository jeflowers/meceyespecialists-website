/*
  # Harden profile roles, the signup trigger and the admin check

  1. Signup trigger no longer trusts client-supplied metadata for `role`;
     every new profile is created as 'patient'. search_path is pinned and
     the function is no longer executable by API roles.
  2. Table-wide UPDATE on `profiles` is revoked; `authenticated` may only
     update `full_name`, so nobody can promote themselves.
  3. The self-referential admin policies are replaced with a
     SECURITY DEFINER helper in a private schema, removing the infinite
     recursion while keeping the intended admin visibility.
  4. `anon` loses every privilege on `profiles`.
*/

-- 1. Signup trigger: role is server-decided, search_path pinned
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'patient'
  );
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;

-- 2. Column-level write restriction on profiles
REVOKE UPDATE ON public.profiles FROM anon;
REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (full_name) ON public.profiles TO authenticated;

-- 4. anon has no business with profiles at all
REVOKE ALL ON public.profiles FROM anon;

-- 3. Non-recursive admin check
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION private.is_admin() TO authenticated;

DROP POLICY IF EXISTS "admins_read_all_profiles" ON public.profiles;
CREATE POLICY "admins_read_all_profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (private.is_admin());

DROP POLICY IF EXISTS "admins_delete_profiles" ON public.profiles;
CREATE POLICY "admins_delete_profiles" ON public.profiles
  FOR DELETE TO authenticated
  USING (private.is_admin());
