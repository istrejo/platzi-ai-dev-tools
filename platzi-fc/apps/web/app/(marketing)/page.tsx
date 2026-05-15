import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import Link from "next/link";
import { getMatches } from "@/lib/supabase/queries";

export default async function HomePage() {
  const allMatches = await getMatches();
  const nextMatch = allMatches.find((m) => m.status === "scheduled");
  const lastMatch = allMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime())[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-platzi-blue to-platzi-dark py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
              Bienvenido a <span className="text-platzi-green">Platzi FC</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              El sitio oficial del club. Toda la información sobre partidos, plantilla, noticias y
              mucho más.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/entradas">
                <Button size="lg">Comprar Entradas</Button>
              </Link>
              <Link href="/fans">
                <Button size="lg" variant="outline">
                  Hazte Socio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Match */}
      {nextMatch && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Próximo Partido</h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-500">{nextMatch.competition_name}</div>
                  <Badge variant="info">Próximo</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {nextMatch.home_team_name}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">
                      {new Date(nextMatch.match_date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>
                    <div className="text-2xl font-bold text-platzi-green">
                      {new Date(nextMatch.match_date).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {nextMatch.away_team_name}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link href={`/partidos/${nextMatch.id}`}>
                    <Button>Ver Detalles</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Last Result */}
      {lastMatch && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Último Resultado</h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-500">{lastMatch.competition_name}</div>
                  <Badge>Finalizado</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center mb-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {lastMatch.home_team_name}
                    </div>
                    <div className="text-4xl font-bold text-platzi-blue">
                      {lastMatch.home_score}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400">-</div>
                  </div>

                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {lastMatch.away_team_name}
                    </div>
                    <div className="text-4xl font-bold text-platzi-blue">
                      {lastMatch.away_score}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link href={`/partidos/${lastMatch.id}`}>
                    <Button variant="outline">Ver Resumen</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/partidos">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Partidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Calendario, resultados y clasificación</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/equipo">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Equipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Plantilla y cuerpo técnico</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/noticias">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Noticias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Últimas novedades del club</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tienda">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Tienda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Productos oficiales del club</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Próximamente</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos trabajando en traerte la mejor experiencia digital. Pronto podrás disfrutar de
            partidos en vivo, estadísticas detalladas, contenido exclusivo y mucho más.
          </p>
        </div>
      </section>
    </>
  );
}
