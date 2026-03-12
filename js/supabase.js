// =============================================
//  Teacher-Hub  —  supabase.js
//  Supabase client — paste your keys below
// =============================================

 const SUPABASE_URL = 'https://efcunlfhjngrmgxhtdji.supabase.co';
// example: 'https://abcdefghijklmn.supabase.co'


const SUPABASE_KEY = 'sb_publishable_Lk7xDf9_w9OZDa8E2wjIfg_AurhCVEi';
 //example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...'

// ── Create the client ──
// window.supabase comes from the CDN script tag loaded before this file
const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Keep session in sync across pages ──
// When a user logs in or out in Supabase auth,
// we mirror that into TH.state so the navbar updates correctly
db.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || !session) {
    // Clear our local session if Supabase says logged out
    sessionStorage.removeItem('th_user');
    if (typeof TH !== 'undefined') {
      TH.state.user = null;
      TH.updateNav();
    }
  }
});
