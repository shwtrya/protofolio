-- Phase 1: additive only. No policy is dropped here, so the currently deployed
-- client keeps working while the new RPC path is put in place.
create or replace function track_visit(
  p_session_id text,
  p_user_agent text,
  p_fingerprint text,
  p_page_url text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into visitors (session_id, user_agent, ip_address, page_views)
  values (p_session_id, left(p_user_agent, 400), p_fingerprint, 1)
  on conflict (session_id) do update
    set page_views = visitors.page_views
          + case when now() - visitors.last_visit > interval '1 minute' then 1 else 0 end,
        last_visit = now();

  insert into page_views (session_id, page_url)
  values (p_session_id, left(p_page_url, 200));
end
$$;

revoke all on function track_visit(text, text, text, text) from public;
grant execute on function track_visit(text, text, text, text) to anon;

-- Pin search_path on the existing definer function too (it was unset).
alter function get_visitor_stats() set search_path = public;
