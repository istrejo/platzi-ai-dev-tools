import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Scoreboard } from "@/components/matches/scoreboard";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getMatchById } from "@/lib/supabase/queries";
import { generateSEO } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const match = await getMatchById(slug);

    return generateSEO({
      title: `${match.home_team_name} vs ${match.away_team_name} - Platzi FC`,
      description: `Información del partido ${match.home_team_name} vs ${match.away_team_name} - ${match.competition_name}`,
      path: `/partidos/${slug}`,
    });
  } catch {
    return generateSEO({
      title: "Partido no encontrado - Platzi FC",
      description: "El partido que buscas no existe",
      path: `/partidos/${slug}`,
    });
  }
}

export default async function PartidoDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let match;
  try {
    match = await getMatchById(slug);
  } catch {
    notFound();
  }

  const matchDate = new Date(match.match_date);

  // Schema.org SportsEvent
  const sportsEventSchema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${match.home_team_name} vs ${match.away_team_name}`,
    description: `Partido de ${match.competition_name}`,
    startDate: match.match_date,
    location: {
      "@type": "Place",
      name: "Estadio Platzi",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
    },
    homeTeam: {
      "@type": "SportsTeam",
      name: match.home_team_name,
    },
    awayTeam: {
      "@type": "SportsTeam",
      name: match.away_team_name,
    },
    ...(match.status === "finished" && {
      eventStatus: "https://schema.org/EventScheduled",
      homeTeam: {
        "@type": "SportsTeam",
        name: match.home_team_name,
        score: match.home_score,
      },
      awayTeam: {
        "@type": "SportsTeam",
        name: match.away_team_name,
        score: match.away_score,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Partidos", href: "/partidos" },
            { label: `${match.home_team_name} vs ${match.away_team_name}` },
          ]}
        />

        <div className="mt-8">
          <Scoreboard match={match} />
        </div>

        {/* Match Details */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información del Partido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Competición:</span>
                <span className="font-semibold">{match.competition_name}</span>
              </div>
              {match.match_week && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Jornada:</span>
                  <span className="font-semibold">{match.match_week}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-semibold">
                  {matchDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hora:</span>
                <span className="font-semibold">
                  {matchDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              {match.referee && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Árbitro:</span>
                  <span className="font-semibold">{match.referee}</span>
                </div>
              )}
              {match.attendance && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Asistencia:</span>
                  <span className="font-semibold">{match.attendance.toLocaleString("es-ES")}</span>
                </div>
              )}
              {match.weather && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Clima:</span>
                  <span className="font-semibold">{match.weather}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-semibold">Estadio Platzi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacidad:</span>
                  <span className="font-semibold">30,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ciudad:</span>
                  <span className="font-semibold">Madrid</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Sections */}
        <div className="mt-8">
          <Card>
            <CardContent className="py-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Próximamente</h3>
              <p className="text-gray-600">
                Estadísticas, alineaciones y minuto a minuto estarán disponibles pronto
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
