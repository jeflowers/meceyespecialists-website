/* Supabase client for MEC form submissions */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://qzycuboohyhtspwfjnzw.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eWN1Ym9vaHlodHNwd2Zqbnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MjY3OTMsImV4cCI6MjA5ODEwMjc5M30.-siYI3U6CIvtkef03It9mUeLNPK4QG8RsDzV9XTESCY';

  /* Submissions are insert-only: the browser has no read access to these
     tables, so we ask for a minimal response instead of the inserted row. */
  function supabaseInsert(table, data) {
    return fetch(SUPABASE_URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('Submission failed (' + res.status + ')');
      return true;
    });
  }

  window.MEC = window.MEC || {};
  window.MEC.supabaseUrl = SUPABASE_URL;
  window.MEC.supabaseAnonKey = SUPABASE_ANON_KEY;
  window.MEC.supabaseInsert = supabaseInsert;
})();
