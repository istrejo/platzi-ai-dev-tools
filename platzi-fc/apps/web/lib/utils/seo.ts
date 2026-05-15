import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function generateSEO({ title, description, path = "", image }: SEOProps): Metadata {
  const baseUrl = "https://platzifc.com";
  const url = `${baseUrl}${path}`;
  const defaultImage = `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Platzi FC",
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || defaultImage],
      creator: "@platzifc",
    },
    alternates: {
      canonical: url,
    },
  };
}
