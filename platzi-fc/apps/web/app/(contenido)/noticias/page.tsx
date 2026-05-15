import { Metadata } from "next";
import { NewsCard } from "@/components/news/news-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { mockNews } from "@/lib/data/mock-news";
import { generateSEO } from "@/lib/utils/seo";

export const metadata: Metadata = generateSEO({
  title: "Noticias - Platzi FC",
  description: "Últimas noticias, crónicas y novedades del Platzi FC",
  path: "/noticias",
});

export default function NoticiasPage() {
  const publishedNews = mockNews.filter((n) => n.status === "published");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: "Noticias" }]} />

      <div className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Noticias</h1>
        <p className="text-lg text-gray-600">
          Mantente al día con las últimas novedades del club
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publishedNews.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
