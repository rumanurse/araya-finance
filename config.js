// ============================================================
// ARAYA FINANCE — Config
// Replace the values below with YOUR Supabase project details
// Find them at: supabase.com > Your Project > Settings > API
// ============================================================

const ARAYA_CONFIG = {
  // ── SUPABASE ──────────────────────────────────────────────
  // Go to: supabase.com > Project Settings > API
  SUPABASE_URL:  'https://YOUR_PROJECT_ID.supabase.co',   // ← paste here
  SUPABASE_ANON: 'YOUR_ANON_PUBLIC_KEY',                  // ← paste here

  // ── RECEIPT STORAGE ───────────────────────────────────────
  STORAGE_BUCKET: 'receipts',   // bucket name you created

  // ── APP ───────────────────────────────────────────────────
  PASSWORD: 'Araya2026!',       // change this to whatever you want
  SESSION_HOURS: 1,             // auto-logout after X hours of inactivity
};
