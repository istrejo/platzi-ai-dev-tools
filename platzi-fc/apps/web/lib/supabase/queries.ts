import { createClient } from "./server";
import type { Match, Player, Standing, Season, Competition, Team, Staff } from "@/types";

// Seasons
export async function getSeasons() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data as Season[];
}

export async function getCurrentSeason() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .eq("is_current", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Season;
}

// Matches
export async function getMatches(filters?: {
  status?: string;
  seasonId?: string;
  competitionId?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("matches")
    .select(
      `
      *,
      home_team:teams!matches_home_team_id_fkey(id, name, slug),
      away_team:teams!matches_away_team_id_fkey(id, name, slug),
      competition:competitions(id, name, slug)
    `
    )
    .order("match_date", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.seasonId) {
    query = query.eq("season_id", filters.seasonId);
  }
  if (filters?.competitionId) {
    query = query.eq("competition_id", filters.competitionId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((match) => ({
    ...match,
    home_team_name: match.home_team?.name || "",
    away_team_name: match.away_team?.name || "",
    competition_name: match.competition?.name || "",
  }));
}

export async function getMatchById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("matches")
    .select(
      `
      *,
      home_team:teams!matches_home_team_id_fkey(id, name, slug),
      away_team:teams!matches_away_team_id_fkey(id, name, slug),
      competition:competitions(id, name, slug)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return {
    ...data,
    home_team_name: data.home_team?.name || "",
    away_team_name: data.away_team?.name || "",
    competition_name: data.competition?.name || "",
  };
}

// Players
export async function getPlayers(filters?: { position?: string; isActive?: boolean }) {
  const supabase = await createClient();
  let query = supabase.from("players").select("*").order("jersey_number", { ascending: true });

  if (filters?.position) {
    query = query.eq("position", filters.position);
  }
  if (filters?.isActive !== undefined) {
    query = query.eq("is_active", filters.isActive);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Player[];
}

export async function getPlayerBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("players").select("*").eq("slug", slug).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Player;
}

// Staff
export async function getStaff() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as Staff[];
}

// Standings
export async function getStandings(seasonId?: string, competitionId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("standings")
    .select(
      `
      *,
      team:teams(id, name, slug)
    `
    )
    .order("position", { ascending: true });

  if (seasonId) {
    query = query.eq("season_id", seasonId);
  }
  if (competitionId) {
    query = query.eq("competition_id", competitionId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((standing) => ({
    ...standing,
    team_name: standing.team?.name || "",
    team_slug: standing.team?.slug || "",
  }));
}

// Competitions
export async function getCompetitions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("competitions")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) throw error;
  return data as Competition[];
}

// Teams
export async function getTeams() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) throw error;
  return data as Team[];
}

// News
export async function getNews(filters?: { status?: string; limit?: number }) {
  const supabase = await createClient();
  let query = supabase.from("news").select("*").order("published_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getNewsBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("news").select("*").eq("slug", slug).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data;
}
