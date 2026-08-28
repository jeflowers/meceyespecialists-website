/*
  # Stop clients from choosing their own profile role on insert

  The signup trigger creates the profile row, but `authenticated` also holds
  INSERT on every column of `profiles`. If a row is ever missing, a client
  could insert its own with role = 'admin'. Narrow the insertable columns so
  `role` always falls back to its 'patient' default.
*/

REVOKE INSERT ON public.profiles FROM authenticated;
GRANT INSERT (id, email, full_name) ON public.profiles TO authenticated;
