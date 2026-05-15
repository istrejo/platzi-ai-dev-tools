import { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, Badge } from "@/components/ui";
import { getStandings, getCurrentSeason } from "@/lib/supabase/queries";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Clasificación - Platzi FC",
  description: "Tabla de clasificación de la Liga Nacional - Temporada 2024/2025",
  path: "/competicion",
});

const getFormBadge = (result: string) => {
  const variants = {
    W: "success" as const,
    D: "warning" as const,
    L: "error" as const,
  };
  return variants[result as keyof typeof variants] || "default";
};

const getFormLabel = (result: string) => {
  const labels = {
    W: "V",
    D: "E",
    L: "D",
  };
  return labels[result as keyof typeof labels] || result;
};

export default function CompeticionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Clasificación" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Clasificación</h1>
        <p className="text-lg text-gray-600">Liga Nacional - Temporada 2024/2025</p>
      </div>

      <Suspense fallback={<StandingsSkeleton />}>
        <StandingsTable />
      </Suspense>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-platzi-green/20 rounded"></div>
          <span>Platzi FC</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-platzi-green">1-4</span>
          <span>Champions League</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-red-600">18-20</span>
          <span>Descenso</span>
        </div>
      </div>
    </div>
  );
}

function StandingsSkeleton() {
  return (
    <Card className="mt-8">
      <CardContent className="p-8">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

async function StandingsTable() {
  const season = await getCurrentSeason();

  if (!season) {
    return (
      <Card className="mt-8">
        <CardContent className="p-8 text-center text-gray-500">
          No hay temporada activa configurada.
        </CardContent>
      </Card>
    );
  }

  const standings = await getStandings(season.id);
  const sortedStandings = [...standings].sort((a, b) => a.position - b.position);

  return (
    <Card className="mt-8">
      <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pos
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Equipo
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    PJ
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    G
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    E
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    P
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    GF
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    GC
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    DG
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pts
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Forma
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedStandings.map((team) => (
                  <tr
                    key={team.id}
                    className={
                      team.team_slug === "platzi-fc" ? "bg-platzi-green/5" : "hover:bg-gray-50"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`font-bold ${
                            team.position <= 4
                              ? "text-platzi-green"
                              : team.position >= 18
                                ? "text-red-600"
                                : "text-gray-900"
                          }`}
                        >
                          {team.position}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{team.team_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {team.played}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {team.won}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {team.drawn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {team.lost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {team.goals_for}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {team.goals_against}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <span
                        className={`font-semibold ${
                          team.goal_difference > 0
                            ? "text-green-600"
                            : team.goal_difference < 0
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {team.goal_difference > 0 ? "+" : ""}
                        {team.goal_difference}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-bold text-gray-900">{team.points}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1 justify-center">
                        {team.form?.split("").map((result, idx) => (
                          <Badge
                            key={idx}
                            variant={getFormBadge(result)}
                            className="w-6 h-6 p-0 flex items-center justify-center text-xs"
                          >
                            {getFormLabel(result)}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {sortedStandings.map((team) => (
              <div
                key={team.id}
                className={`p-4 ${team.team_slug === "platzi-fc" ? "bg-platzi-green/5" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xl font-bold ${
                        team.position <= 4
                          ? "text-platzi-green"
                          : team.position >= 18
                            ? "text-red-600"
                            : "text-gray-900"
                      }`}
                    >
                      {team.position}
                    </span>
                    <span className="font-semibold text-gray-900">{team.team_name}</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{team.points}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm text-center">
                  <div>
                    <div className="text-gray-500 text-xs">PJ</div>
                    <div className="font-semibold">{team.played}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">G-E-P</div>
                    <div className="font-semibold">
                      {team.won}-{team.drawn}-{team.lost}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">GF-GC</div>
                    <div className="font-semibold">
                      {team.goals_for}-{team.goals_against}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">DG</div>
                    <div
                      className={`font-semibold ${
                        team.goal_difference > 0
                          ? "text-green-600"
                          : team.goal_difference < 0
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {team.goal_difference > 0 ? "+" : ""}
                      {team.goal_difference}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-1">
                  {team.form?.split("").map((result, idx) => (
                    <Badge key={idx} variant={getFormBadge(result)} className="flex-1 text-center">
                      {getFormLabel(result)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </CardContent>
    </Card>
  );
}
