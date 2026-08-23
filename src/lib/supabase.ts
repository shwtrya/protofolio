import { getOrCreateVisitorIdentifier } from './fingerprint';

// Talks to Supabase over plain REST. The whole @supabase/supabase-js client
// (130KB raw) was only used for two RPC calls, so fetch replaces it.
// ponytail: no auth, no realtime, no query builder. Re-add the SDK if the site
// ever needs sign-in or live subscriptions.
const baseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseConfigured = Boolean(baseUrl && apiKey);

if (!supabaseConfigured) {
  console.warn('Supabase credentials not found. Visitor tracking will be disabled.');
}

const rpc = async (fn: string, params: Record<string, unknown>): Promise<unknown> => {
  const res = await fetch(`${baseUrl}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  if (!res.ok) {
    throw new Error(`rpc ${fn} failed: ${res.status} ${await res.text()}`);
  }

  return res.status === 204 ? null : res.json();
};

export interface VisitorStats {
  total_visitors: number;
  total_page_views: number;
  today_visitors: number;
  today_page_views: number;
}

const EMPTY_STATS: VisitorStats = {
  total_visitors: 0,
  total_page_views: 0,
  today_visitors: 0,
  today_page_views: 0
};

const PAGE_VIEW_WINDOW_MS = 60000;
const LAST_PATH_KEY = 'last_tracked_path';
const LAST_TIME_KEY = 'last_tracked_time';
const sessionFallback = new Map<string, string>();

const getSessionStorageItem = (key: string) => {
  if (typeof sessionStorage === 'undefined') {
    return sessionFallback.get(key) ?? null;
  }

  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read sessionStorage key "${key}":`, error);
    return sessionFallback.get(key) ?? null;
  }
};

const setSessionStorageItem = (key: string, value: string) => {
  if (typeof sessionStorage === 'undefined') {
    sessionFallback.set(key, value);
    return;
  }

  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Unable to write sessionStorage key "${key}":`, error);
    sessionFallback.set(key, value);
  }
};

export const trackVisitor = async () => {
  if (!supabaseConfigured) return;

  try {
    const now = Date.now();
    const currentPath = window.location.pathname;
    const lastPath = getSessionStorageItem(LAST_PATH_KEY);
    const lastTime = Number(getSessionStorageItem(LAST_TIME_KEY) || '0');

    // Same path within the dedupe window is not a new view.
    if (currentPath === lastPath && now - lastTime <= PAGE_VIEW_WINDOW_MS) return;

    const identifier = await getOrCreateVisitorIdentifier();

    // Upsert + page-view insert happen server-side in one SECURITY DEFINER
    // function, so anon needs no direct table access.
    await rpc('track_visit', {
      p_session_id: identifier.sessionId,
      p_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      p_fingerprint: identifier.fingerprint,
      p_page_url: currentPath
    });

    setSessionStorageItem(LAST_PATH_KEY, currentPath);
    setSessionStorageItem(LAST_TIME_KEY, now.toString());
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

export const getVisitorStats = async (): Promise<VisitorStats> => {
  if (!supabaseConfigured) return EMPTY_STATS;

  try {
    const rows = await rpc('get_visitor_stats', {});
    const row = Array.isArray(rows) ? rows[0] : null;
    if (!row) return EMPTY_STATS;

    return {
      total_visitors: Number(row.total_visitors) || 0,
      total_page_views: Number(row.total_page_views) || 0,
      today_visitors: Number(row.today_visitors) || 0,
      today_page_views: Number(row.today_page_views) || 0
    };
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return EMPTY_STATS;
  }
};
