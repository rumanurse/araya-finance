// ============================================================
// ARAYA FINANCE — Config
// ============================================================

const ARAYA_CONFIG = {
  // ── SUPABASE ──────────────────────────────────────────────
  // supabase.com > Your Project > Settings > API Keys
  SUPABASE_URL:  'https://cykgxdvsrhxplapuawbr.supabase.co',   // ← already filled in
  SUPABASE_ANON: 'sb_publishable_YVDuLoOtkANCIcVCqbokRA_-JY1ytWg', // ← paste yours here

  // ── RECEIPT STORAGE ───────────────────────────────────────
  STORAGE_BUCKET: 'receipts',

  // ── RECEIPT AI PROXY ──────────────────────────────────────
  // This points to your Netlify function — Anthropic key lives there safely
  // After deploying to Netlify this will be auto-set, leave as-is
  RECEIPT_PROXY_URL: '/.netlify/functions/read-receipt',

  // ── APP ───────────────────────────────────────────────────
  PASSWORD: 'Araya2026!',       // ← change to whatever you want
  SESSION_HOURS: 1,
};
