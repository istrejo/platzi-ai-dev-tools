import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components/ui";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Hazte Socio - Platzi FC",
  description: "Únete a la familia del Platzi FC y disfruta de beneficios exclusivos",
  path: "/fans",
});

export default function FansPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Hazte Socio" }]} />

      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Hazte Socio</h1>
        <p className="text-lg text-gray-600">
          Únete a la familia del Platzi FC y disfruta de beneficios exclusivos
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Socio Junior</CardTitle>
            <div className="text-center text-3xl font-bold text-platzi-green mt-4">
              €50<span className="text-lg text-gray-600">/año</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Descuentos en entradas</li>
              <li>• Newsletter exclusivo</li>
              <li>• Acceso a eventos</li>
            </ul>
            <Button className="w-full mt-6" disabled>
              Próximamente
            </Button>
          </CardContent>
        </Card>

        <Card className="border-platzi-green border-2">
          <CardHeader>
            <CardTitle className="text-center">Socio Premium</CardTitle>
            <div className="text-center text-3xl font-bold text-platzi-green mt-4">
              €150<span className="text-lg text-gray-600">/año</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Todo lo de Junior</li>
              <li>• Descuento 20% en tienda</li>
              <li>• Prioridad en entradas</li>
              <li>• Meet & Greet jugadores</li>
            </ul>
            <Button className="w-full mt-6" disabled>
              Próximamente
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Socio VIP</CardTitle>
            <div className="text-center text-3xl font-bold text-platzi-green mt-4">
              €500<span className="text-lg text-gray-600">/año</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>• Todo lo de Premium</li>
              <li>• Acceso a palcos</li>
              <li>• Parking exclusivo</li>
              <li>• Experiencias VIP</li>
            </ul>
            <Button className="w-full mt-6" disabled>
              Próximamente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
