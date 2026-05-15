import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Media - Platzi FC",
  description: "Galería de fotos y videos del Platzi FC",
  path: "/media",
});

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Media" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Media</h1>
        <p className="text-lg text-gray-600">
          Galería de fotos y videos del club
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Próximamente</h3>
              <p className="text-gray-600">
                La galería de fotos y videos estará disponible pronto. Podrás disfrutar de los
                mejores momentos del club.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
