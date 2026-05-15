import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Article } from "@/types";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const publishedDate = article.published_at ? new Date(article.published_at) : null;

  return (
    <Link href={`/noticias/${article.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="text-sm text-gray-500 mb-2">
            {publishedDate?.toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
