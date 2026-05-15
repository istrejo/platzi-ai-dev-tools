export interface Article {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string | null;
  cover_media_ref_id: string | null;
  published_at: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface MediaRef {
  id: string;
  bucket: string;
  object_path: string;
  media_type: string;
  width: number | null;
  height: number | null;
  mime_type: string | null;
  alt: string | null;
  title: string | null;
  created_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  slug: string | null;
  sponsor_level: "top" | "mid" | "low";
  website_url: string | null;
  logo_media_ref_id: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Stadium {
  id: string;
  name: string;
  slug: string | null;
  address: string | null;
  city: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  capacity: number | null;
  hero_media_ref_id: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}
