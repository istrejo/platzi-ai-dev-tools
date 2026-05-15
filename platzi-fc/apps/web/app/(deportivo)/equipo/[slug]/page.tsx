import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, Badge } from "@/components/ui";
import { getPlayerBySlug } from "@/lib/supabase/queries";
import { generateSEO } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const positionLabels = {
  goalkeeper: "Portero",
  defender: "Defensa",
  midfielder: "Centrocampista",
  forward: "Delantero",
};

const positionColors = {
  goalkeeper: "warning",
  defender: "info",
  midfielder: "success",
  forward: "error",
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = await getPlayerBySlug(slug);

  if (!player) {
    return generateSEO({
      title: "Jugador no encontrado - Platzi FC",
      description: "El jugador que buscas no existe",
      path: `/equipo/${slug}`,
    });
  }

  return generateSEO({
    title: `${player.first_name} ${player.last_name} - Platzi FC`,
    description: `Perfil de ${player.first_name} ${player.last_name}, ${positionLabels[player.position]} del Platzi FC`,
    path: `/equipo/${slug}`,
  });
}

export default async function PlayerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const player = await getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  const age = player.date_of_birth
    ? new Date().getFullYear() - new Date(player.date_of_birth).getFullYear()
    : null;

  // Schema.org Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${player.first_name} ${player.last_name}`,
    jobTitle: positionLabels[player.position],
    nationality: player.nationality,
    ...(player.date_of_birth && { birthDate: player.date_of_birth }),
    ...(player.height_cm && { height: `${player.height_cm} cm` }),
    ...(player.weight_kg && { weight: `${player.weight_kg} kg` }),
    memberOf: {
      "@type": "SportsTeam",
      name: "Platzi FC",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Equipo", href: "/equipo" },
            { label: `${player.first_name} ${player.last_name}` },
          ]}
        />

        {/* Player Header */}
        <div className="mt-8 bg-gradient-to-br from-platzi-blue to-platzi-dark text-white rounded-lg p-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
              {player.jersey_number}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {player.first_name} {player.last_name}
              </h1>
              <div className="flex items-center gap-4">
                <Badge variant={positionColors[player.position]} className="text-white">
                  {positionLabels[player.position]}
                </Badge>
                <span className="text-platzi-green">#{player.jersey_number}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Info */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Información Personal</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nacionalidad:</span>
                  <span className="font-semibold">{player.nationality}</span>
                </div>
                {age && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Edad:</span>
                    <span className="font-semibold">{age} años</span>
                  </div>
                )}
                {player.date_of_birth && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha de nacimiento:</span>
                    <span className="font-semibold">
                      {new Date(player.date_of_birth).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {player.height_cm && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Altura:</span>
                    <span className="font-semibold">{player.height_cm} cm</span>
                  </div>
                )}
                {player.weight_kg && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peso:</span>
                    <span className="font-semibold">{player.weight_kg} kg</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Estadísticas 2024/25</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Partidos jugados:</span>
                  <span className="font-semibold">14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goles:</span>
                  <span className="font-semibold">
                    {player.position === "forward"
                      ? "8"
                      : player.position === "midfielder"
                        ? "3"
                        : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Asistencias:</span>
                  <span className="font-semibold">
                    {player.position === "midfielder"
                      ? "5"
                      : player.position === "forward"
                        ? "4"
                        : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minutos jugados:</span>
                  <span className="font-semibold">1,260</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bio */}
        {player.bio && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Biografía</h2>
              <p className="text-gray-700">{player.bio}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
