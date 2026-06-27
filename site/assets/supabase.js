/* Supabase client for MEC form submissions */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://0ec90b57d6e95fcbda19832f.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

  function supabaseInsert(table, data) {
    return fetch(SUPABASE_URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) return res.json().then(function (err) { throw err; });
      return res.json();
    });
  }

  window.MEC = window.MEC || {};
  window.MEC.supabaseInsert = supabaseInsert;
})();
