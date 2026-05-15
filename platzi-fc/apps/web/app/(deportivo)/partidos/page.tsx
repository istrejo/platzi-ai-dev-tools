import { Metadata } from "next";
import { MatchCard } from "@/components/matches/match-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { mockMatches } from "@/lib/data/mock-matches";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Partidos - Platzi FC",
  description: "Calendario de partidos, resultados y próximos encuentros del Platzi FC",
  path: "/partidos",
});

export default function PartidosPage() {
  const upcomingMatches = mockMatches.filter((m) => m.status === "scheduled");
  const pastMatches = mockMatches.filter((m) => m.status === "finished");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Partidos" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Partidos</h1>
        <p className="text-lg text-gray-600">
          Calendario completo de la temporada, resultados y próximos encuentros
        </p>
      </div>

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Partidos</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Past Matches */}
      {pastMatches.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resultados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pastMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
