export interface OutlineSection {
  heading: string;
  points: string[];
}

export interface Discussion {
  id: string;
  slug: string;
  youtube_id: string;
  title: string;
  date: string;
  series: string;
  summary: string;
  key_points: string[];
  scripture_references: string[];
  outline?: OutlineSection[];
}
