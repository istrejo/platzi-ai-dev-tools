import { Metadata } from "next";
import { PlayerCard } from "@/components/team/player-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getPlayers, getStaff } from "@/lib/supabase/queries";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Equipo - Platzi FC",
  description: "Plantilla completa del Platzi FC: jugadores y cuerpo técnico",
  path: "/equipo",
});

export default async function EquipoPage() {
  const [allPlayers, staff] = await Promise.all([getPlayers({ isActive: true }), getStaff()]);

  const goalkeepers: typeof allPlayers = [];
  const defenders: typeof allPlayers = [];
  const midfielders: typeof allPlayers = [];
  const forwards: typeof allPlayers = [];

  for (const p of allPlayers) {
    if (p.position === "goalkeeper") goalkeepers.push(p);
    else if (p.position === "defender") defenders.push(p);
    else if (p.position === "midfielder") midfielders.push(p);
    else if (p.position === "forward") forwards.push(p);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Equipo" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Plantilla</h1>
        <p className="text-lg text-gray-600">Temporada 2024/2025</p>
      </div>

      {/* Goalkeepers */}
      {goalkeepers.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Porteros</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goalkeepers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Defenders */}
      {defenders.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Defensas</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {defenders.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Midfielders */}
      {midfielders.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Centrocampistas</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {midfielders.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Forwards */}
      {forwards.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delanteros</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {forwards.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Staff */}
      {staff.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cuerpo Técnico</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {staff.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <CardTitle>
                    {member.first_name} {member.last_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-platzi-green mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.nationality}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
