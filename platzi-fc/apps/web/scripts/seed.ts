import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required in .env.local");
}

if (!supabaseKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is required in .env.local"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🌱 Starting seed...");

  // 1. Seed Season
  console.log("📅 Seeding seasons...");
  const { data: season, error: seasonError } = await supabase
    .from("seasons")
    .insert([
      {
        name: "2024/2025",
        slug: "2024-25",
        start_date: "2024-08-01",
        end_date: "2025-05-31",
        is_current: true,
        is_active: true,
      },
    ])
    .select()
    .single();

  if (seasonError) {
    console.error("Error seeding seasons:", seasonError);
    return;
  }
  console.log("✅ Season created:", season.id);

  // 2. Seed Competitions
  console.log("🏆 Seeding competitions...");
  const { data: competitions, error: compError } = await supabase
    .from("competitions")
    .insert([
      {
        name: "Liga Nacional",
        slug: "liga-nacional",
        competition_type: "league",
        country: "España",
        description: "Primera división del fútbol español",
        is_active: true,
      },
      {
        name: "Copa del Rey",
        slug: "copa-del-rey",
        competition_type: "cup",
        country: "España",
        description: "Torneo de copa nacional",
        is_active: true,
      },
    ])
    .select();

  if (compError) {
    console.error("Error seeding competitions:", compError);
    return;
  }
  console.log("✅ Competitions created:", competitions.length);

  // 3. Seed Teams
  console.log("⚽ Seeding teams...");
  const { data: teams, error: teamsError } = await supabase
    .from("teams")
    .insert([
      {
        name: "Platzi FC",
        slug: "platzi-fc",
        short_name: "PFC",
        founded_year: 2010,
        country: "España",
        city: "Madrid",
        primary_color: "#98ca3f",
        secondary_color: "#121f3d",
        is_active: true,
      },
      {
        name: "Real Tech",
        slug: "real-tech",
        short_name: "RTC",
        founded_year: 1920,
        country: "España",
        city: "Madrid",
        is_active: true,
      },
      {
        name: "Atlético Code",
        slug: "atletico-code",
        short_name: "ATC",
        founded_year: 1903,
        country: "España",
        city: "Madrid",
        is_active: true,
      },
      {
        name: "United Dev",
        slug: "united-dev",
        short_name: "UDV",
        founded_year: 1878,
        country: "Inglaterra",
        city: "Manchester",
        is_active: true,
      },
      {
        name: "Deportivo Web",
        slug: "deportivo-web",
        short_name: "DWB",
        founded_year: 1906,
        country: "España",
        city: "La Coruña",
        is_active: true,
      },
    ])
    .select();

  if (teamsError) {
    console.error("Error seeding teams:", teamsError);
    return;
  }
  console.log("✅ Teams created:", teams.length);

  const platziFC = teams.find((t) => t.slug === "platzi-fc")!;

  // 4. Seed Players
  console.log("👥 Seeding players...");
  const { data: players, error: playersError } = await supabase
    .from("players")
    .insert([
      {
        team_id: platziFC.id,
        first_name: "Carlos",
        last_name: "Rodríguez",
        slug: "carlos-rodriguez",
        jersey_number: 1,
        position: "goalkeeper",
        date_of_birth: "1995-03-15",
        nationality: "España",
        height_cm: 188,
        weight_kg: 82,
        bio: "Portero titular con gran experiencia en la liga",
        is_active: true,
      },
      {
        team_id: platziFC.id,
        first_name: "Miguel",
        last_name: "Santos",
        slug: "miguel-santos",
        jersey_number: 4,
        position: "defender",
        date_of_birth: "1993-07-22",
        nationality: "España",
        height_cm: 185,
        weight_kg: 78,
        bio: "Defensa central con gran capacidad de liderazgo",
        is_active: true,
      },
      {
        team_id: platziFC.id,
        first_name: "Pablo",
        last_name: "García",
        slug: "pablo-garcia",
        jersey_number: 5,
        position: "defender",
        date_of_birth: "1994-02-28",
        nationality: "España",
        height_cm: 183,
        weight_kg: 80,
        bio: "Lateral derecho con gran proyección ofensiva",
        is_active: true,
      },
      {
        team_id: platziFC.id,
        first_name: "Andrea",
        last_name: "López",
        slug: "andrea-lopez",
        jersey_number: 7,
        position: "forward",
        date_of_birth: "1997-09-12",
        nationality: "España",
        height_cm: 175,
        weight_kg: 68,
        bio: "Extremo rápido con gran capacidad de regate",
        is_active: true,
      },
      {
        team_id: platziFC.id,
        first_name: "David",
        last_name: "Martínez",
        slug: "david-martinez",
        jersey_number: 8,
        position: "midfielder",
        date_of_birth: "1996-11-08",
        nationality: "Argentina",
        height_cm: 178,
        weight_kg: 73,
        bio: "Centrocampista creativo con gran visión de juego",
        is_active: true,
      },
      {
        team_id: platziFC.id,
        first_name: "Lucas",
        last_name: "Silva",
        slug: "lucas-silva",
        jersey_number: 10,
        position: "forward",
        date_of_birth: "1998-05-20",
        nationality: "Brasil",
        height_cm: 180,
        weight_kg: 75,
        bio: "Delantero goleador con gran velocidad",
        is_active: true,
      },
    ])
    .select();

  if (playersError) {
    console.error("Error seeding players:", playersError);
    return;
  }
  console.log("✅ Players created:", players.length);

  // 5. Seed Staff
  console.log("👔 Seeding staff...");
  const { data: staff, error: staffError } = await supabase
    .from("staff")
    .insert([
      {
        team_id: platziFC.id,
        first_name: "Juan",
        last_name: "Pérez",
        slug: "juan-perez",
        role: "Entrenador Principal",
        nationality: "España",
        date_of_birth: "1975-04-10",
        bio: "Entrenador con más de 15 años de experiencia",
        is_active: true,
      },
      {
        team_id: platziFC.id,
        first_name: "Ana",
        last_name: "Fernández",
        slug: "ana-fernandez",
        role: "Entrenadora Asistente",
        nationality: "España",
        date_of_birth: "1982-08-15",
        bio: "Especialista en preparación física",
        is_active: true,
      },
    ])
    .select();

  if (staffError) {
    console.error("Error seeding staff:", staffError);
    return;
  }
  console.log("✅ Staff created:", staff.length);

  // 6. Seed Matches
  console.log("⚽ Seeding matches...");
  const liga = competitions.find((c) => c.slug === "liga-nacional")!;
  const copa = competitions.find((c) => c.slug === "copa-del-rey")!;

  const { data: matches, error: matchesError } = await supabase
    .from("matches")
    .insert([
      {
        season_id: season.id,
        competition_id: liga.id,
        home_team_id: platziFC.id,
        away_team_id: teams.find((t) => t.slug === "real-tech")!.id,
        match_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "scheduled",
        match_week: 15,
      },
      {
        season_id: season.id,
        competition_id: liga.id,
        home_team_id: platziFC.id,
        away_team_id: teams.find((t) => t.slug === "atletico-code")!.id,
        match_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        home_score: 2,
        away_score: 1,
        status: "finished",
        match_week: 14,
        attendance: 25000,
        referee: "Carlos Martínez",
        weather: "Soleado",
      },
      {
        season_id: season.id,
        competition_id: copa.id,
        home_team_id: teams.find((t) => t.slug === "deportivo-web")!.id,
        away_team_id: platziFC.id,
        match_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        home_score: 0,
        away_score: 3,
        status: "finished",
        attendance: 18000,
        referee: "Ana López",
        weather: "Lluvioso",
      },
      {
        season_id: season.id,
        competition_id: liga.id,
        home_team_id: teams.find((t) => t.slug === "united-dev")!.id,
        away_team_id: platziFC.id,
        match_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: "scheduled",
        match_week: 16,
      },
    ])
    .select();

  if (matchesError) {
    console.error("Error seeding matches:", matchesError);
    return;
  }
  console.log("✅ Matches created:", matches.length);

  // 7. Seed Standings
  console.log("📊 Seeding standings...");
  const { data: standings, error: standingsError } = await supabase
    .from("standings")
    .insert([
      {
        season_id: season.id,
        competition_id: liga.id,
        team_id: teams.find((t) => t.slug === "real-tech")!.id,
        position: 1,
        played: 14,
        won: 11,
        drawn: 2,
        lost: 1,
        goals_for: 35,
        goals_against: 10,
        goal_difference: 25,
        points: 35,
        form: "WWWWW",
      },
      {
        season_id: season.id,
        competition_id: liga.id,
        team_id: teams.find((t) => t.slug === "atletico-code")!.id,
        position: 2,
        played: 14,
        won: 10,
        drawn: 3,
        lost: 1,
        goals_for: 30,
        goals_against: 11,
        goal_difference: 19,
        points: 33,
        form: "DWWWW",
      },
      {
        season_id: season.id,
        competition_id: liga.id,
        team_id: platziFC.id,
        position: 3,
        played: 14,
        won: 9,
        drawn: 3,
        lost: 2,
        goals_for: 28,
        goals_against: 12,
        goal_difference: 16,
        points: 30,
        form: "WWDWL",
      },
      {
        season_id: season.id,
        competition_id: liga.id,
        team_id: teams.find((t) => t.slug === "united-dev")!.id,
        position: 4,
        played: 14,
        won: 8,
        drawn: 4,
        lost: 2,
        goals_for: 25,
        goals_against: 15,
        goal_difference: 10,
        points: 28,
        form: "WDWDW",
      },
      {
        season_id: season.id,
        competition_id: liga.id,
        team_id: teams.find((t) => t.slug === "deportivo-web")!.id,
        position: 5,
        played: 14,
        won: 7,
        drawn: 3,
        lost: 4,
        goals_for: 22,
        goals_against: 18,
        goal_difference: 4,
        points: 24,
        form: "LWWDL",
      },
    ])
    .select();

  if (standingsError) {
    console.error("Error seeding standings:", standingsError);
    return;
  }
  console.log("✅ Standings created:", standings.length);

  console.log("🎉 Seed completed successfully!");
}

seed().catch(console.error);
