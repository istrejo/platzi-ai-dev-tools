import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, Button } from "@/components/ui";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Entradas - Platzi FC",
  description: "Compra tus entradas para los partidos del Platzi FC",
  path: "/entradas",
});

export default function EntradasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Entradas" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Entradas</h1>
        <p className="text-lg text-gray-600">
          Compra tus entradas y vive la emoción del fútbol en el Estadio Platzi
        </p>
      </div>

      <div className="mt-12">
        <Card>
          <CardContent className="py-24 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Venta de Entradas</h3>
              <p className="text-gray-600 mb-6">
                El sistema de venta de entradas estará disponible próximamente. Podrás comprar tus
                entradas de forma fácil y segura.
              </p>
              <Button disabled>Próximamente</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
