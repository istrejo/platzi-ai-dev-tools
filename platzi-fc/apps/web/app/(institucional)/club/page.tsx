import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "El Club - Platzi FC",
  description: "Conoce la historia, valores y estructura del Platzi FC",
  path: "/club",
});

export default function ClubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "El Club" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">El Club</h1>
        <p className="text-lg text-gray-600">
          Conoce nuestra historia, valores y estructura institucional
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Historia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Fundado en 2010, el Platzi FC ha crecido hasta convertirse en uno de los clubes más
              importantes de la región.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-gray-600 space-y-2">
              <li>• Pasión por el fútbol</li>
              <li>• Compromiso con la excelencia</li>
              <li>• Respeto y fair play</li>
              <li>• Trabajo en equipo</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Estadio Platzi, con capacidad para 30,000 espectadores. Ubicado en el corazón de
              Madrid.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
