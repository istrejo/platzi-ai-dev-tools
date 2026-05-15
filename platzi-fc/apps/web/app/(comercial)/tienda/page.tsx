import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, Button } from "@/components/ui";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Tienda Oficial - Platzi FC",
  description: "Productos oficiales del Platzi FC: camisetas, merchandising y más",
  path: "/tienda",
});

export default function TiendaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Tienda" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tienda Oficial</h1>
        <p className="text-lg text-gray-600">
          Productos oficiales del Platzi FC
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tienda Online</h3>
              <p className="text-gray-600 mb-6">
                Nuestra tienda online estará disponible próximamente. Podrás adquirir camisetas,
                merchandising y productos oficiales del club.
              </p>
              <Button disabled>Próximamente</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
