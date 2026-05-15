import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getNewsBySlug } from "@/lib/supabase/queries";
import { generateSEO } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return generateSEO({
      title: "Noticia no encontrada - Platzi FC",
      description: "La noticia que buscas no existe",
      path: `/noticias/${slug}`,
    });
  }

  return generateSEO({
    title: `${article.title} - Platzi FC`,
    description: article.excerpt || "",
    path: `/noticias/${slug}`,
  });
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const publishedDate = article.published_at ? new Date(article.published_at) : null;

  // Schema.org Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Organization",
      name: "Platzi FC",
    },
    publisher: {
      "@type": "Organization",
      name: "Platzi FC",
      logo: {
        "@type": "ImageObject",
        url: "https://platzifc.com/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <Breadcrumbs items={[{ label: "Noticias", href: "/noticias" }, { label: article.title }]} />

        <header className="mt-8">
          <div className="text-sm text-gray-500 mb-4">
            {publishedDate?.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          {article.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">{article.excerpt}</p>
          )}
        </header>

        <div className="mt-8 prose prose-lg max-w-none">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content?.replace(/\n/g, "<br />") || "" }}
          />
        </div>

        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Última actualización:{" "}
              {new Date(article.updated_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
