export type HeroBlock = {
  headline: string;
  subhead: string;
  urgency_chip: string | null;
  savings_chip: string | null;
  image_url?: string | null;
};

export type QuickStat = { label: string; value: string };

export type SellingPoint = { title: string; body: string };

export type Suite = {
  type: string;
  sqft?: string;
  price_from?: string;
  notes?: string;
};

export type DepositStep = {
  label: string;
  value: string;
  due_at?: string | null;
};

export type Incentive = { title: string; value?: string | null };

export type LocationBlock = {
  blurb?: string;
  transit?: string[];
  schools?: string[];
  retail?: string[];
};

export type GalleryImage = {
  url: string;
  category: "exterior" | "amenity" | "interior" | "neighbourhood";
  caption?: string;
};

export type DeveloperProfile = { name?: string; blurb?: string };

export type FaqEntry = { q: string; a: string };

export type PageMeta = { title?: string; description?: string };

export type PagePlan = {
  hero: HeroBlock;
  quick_stats: QuickStat[];
  urgency_signals: string[];
  story_md: string;
  selling_points: SellingPoint[];
  suites: Suite[];
  deposit_timeline: DepositStep[];
  incentives: Incentive[];
  amenities: string[];
  location: LocationBlock;
  gallery: GalleryImage[];
  developer: DeveloperProfile;
  faq: FaqEntry[];
  meta: PageMeta;
  sources: string[];
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
  page_plan: Partial<PagePlan>;
  updated_at: string | null;
};

export type ProjectsSnapshot = {
  version: number;
  count: number;
  projects: Project[];
};
