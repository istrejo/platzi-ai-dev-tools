export interface Season {
  id: string;
  name: string;
  slug: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Competition {
  id: string;
  name: string;
  slug: string;
  competition_type: "league" | "cup" | "friendly";
  country: string | null;
  logo_media_ref_id: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  short_name: string | null;
  founded_year: number | null;
  country: string | null;
  city: string | null;
  stadium_id: string | null;
  logo_media_ref_id: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  team_id: string | null;
  first_name: string;
  last_name: string;
  slug: string | null;
  jersey_number: number | null;
  position: "goalkeeper" | "defender" | "midfielder" | "forward";
  date_of_birth: string | null;
  nationality: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  photo_media_ref_id: string | null;
  bio: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  team_id: string | null;
  first_name: string;
  last_name: string;
  slug: string | null;
  role: string;
  nationality: string | null;
  date_of_birth: string | null;
  photo_media_ref_id: string | null;
  bio: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  event_id: string | null;
  season_id: string | null;
  competition_id: string | null;
  home_team_id: string | null;
  away_team_id: string | null;
  match_date: string;
  venue_stadium_id: string | null;
  home_score: number | null;
  away_score: number | null;
  status: "scheduled" | "live" | "finished" | "postponed" | "cancelled";
  match_week: number | null;
  attendance: number | null;
  referee: string | null;
  weather: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Standing {
  id: string;
  season_id: string | null;
  competition_id: string | null;
  team_id: string | null;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  form: string | null;
  updated_at: string;
}

export interface PlayerMatchStats {
  id: string;
  match_id: string | null;
  player_id: string | null;
  team_id: string | null;
  minutes_played: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  shots: number;
  shots_on_target: number;
  passes: number;
  passes_completed: number;
  tackles: number;
  interceptions: number;
  fouls_committed: number;
  fouls_suffered: number;
  offsides: number;
  saves: number;
  created_at: string;
}

export interface PlayerSeasonStats {
  id: string;
  season_id: string | null;
  competition_id: string | null;
  player_id: string | null;
  team_id: string | null;
  matches_played: number;
  minutes_played: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  shots: number;
  shots_on_target: number;
  passes: number;
  passes_completed: number;
  tackles: number;
  interceptions: number;
  updated_at: string;
}
