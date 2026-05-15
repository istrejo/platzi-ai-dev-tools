import { Metadata } from "next";
import { PlayerCard } from "@/components/team/player-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { mockPlayers, mockStaff } from "@/lib/data/mock-players";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Equipo - Platzi FC",
  description: "Plantilla completa del Platzi FC: jugadores y cuerpo técnico",
  path: "/equipo",
});

export default function EquipoPage() {
  const goalkeepers = mockPlayers.filter((p) => p.position === "goalkeeper");
  const defenders = mockPlayers.filter((p) => p.position === "defender");
  const midfielders = mockPlayers.filter((p) => p.position === "midfielder");
  const forwards = mockPlayers.filter((p) => p.position === "forward");

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
      {mockStaff.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cuerpo Técnico</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockStaff.map((staff) => (
              <Card key={staff.id}>
                <CardHeader>
                  <CardTitle>
                    {staff.first_name} {staff.last_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-platzi-green mb-2">{staff.role}</p>
                  <p className="text-sm text-gray-600">{staff.nationality}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
