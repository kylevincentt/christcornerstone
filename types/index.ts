export interface Doctrine {
  id: string;
  slug: string;
  tag: string;
  name: string;
  verse: string;
  description: string;
  hover_verse_text: string;
  hover_verse_citation: string;
  full_content?: string;
  sort_order: number;
}

export interface ApologeticsQuestion {
  id: string;
  category: string;
  question: string;
  objection: string;
  response: string;
  go_deeper: string;
  sort_order: number;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  era: string;
  avatar_emoji: string;
  sort_order: number;
}

export interface LibraryItem {
  id: string;
  tab: 'bibles' | 'study' | 'theologians' | 'media';
  icon: string;
  name: string;
  description: string;
  url: string;
  link_text: string;
  sort_order: number;
}

export interface Religion {
  id: string;
  slug: string;
  icon: string;
  name: string;
  adherents: string;
  description: string;
  comparison_points: string[];
  full_content?: string;
  sort_order: number;
}

export interface MediaEmbed {
  id: string;
  type: 'youtube' | 'twitter';
  embed_id: string;
  title: string;
  description?: string;
  section: string;
  sort_order: number;
}

export interface DailyVerse {
  id: string;
  text: string;
  reference: string;
  date?: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribed_at: string;
  active: boolean;
}

export interface ApologeticsCategory {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
}

export interface WeeklySermon {
  id: string;
  slug: string;
  youtube_id: string;
  title: string;
  sermon_date: string;
  summary: string;
  key_points: string[];
  scripture_references: string[];
  additional_context?: string;
  sort_order: number;
  created_at?: string;
}
