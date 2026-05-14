export type PageCopy = {
  hero_headline: string;
  hero_subhead: string;
  description_md: string;
  key_features: string[];
  neighborhood_blurb: string;
  faq: Array<{ q: string; a: string }>;
  meta_title: string;
  meta_description: string;
};

export type Project = {
  id: number;
  slug: string;
  project_name: string | null;
  developer: string | null;
  city: string | null;
  address: string | null;
  project_type: string | null;
  status: string | null;
  starting_price: number | null;
  price_per_sqft: number | null;
  unit_count: number | null;
  completion_date: string | null;
  drive_folder_url: string | null;
  cover_image_url: string | null;
  cover_image_source: string | null;
  page_copy: Partial<PageCopy>;
  updated_at: string | null;
};

export type ProjectsSnapshot = {
  version: number;
  count: number;
  projects: Project[];
};
