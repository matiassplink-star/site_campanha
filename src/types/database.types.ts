// =============================================================================
// TIPOS DO BANCO DE DADOS — Supabase
// =============================================================================

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SiteSetting, "id" | "created_at">>;
      };
      hero_sections: {
        Row: HeroSection;
        Insert: Omit<HeroSection, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<HeroSection, "id" | "created_at">>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "created_at" | "updated_at" | "views">;
        Update: Partial<Omit<Post, "id" | "created_at">>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at" | "updated_at" | "post_count">;
        Update: Partial<Omit<Category, "id" | "created_at">>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, "id" | "created_at">;
        Update: Partial<Omit<Tag, "id" | "created_at">>;
      };
      contacts: {
        Row: Contact;
        Insert: Omit<Contact, "id" | "created_at" | "updated_at" | "status">;
        Update: Partial<Omit<Contact, "id" | "created_at">>;
      };
      gallery: {
        Row: GalleryItem;
        Insert: Omit<GalleryItem, "id" | "created_at">;
        Update: Partial<Omit<GalleryItem, "id" | "created_at">>;
      };
      gallery_folders: {
        Row: GalleryFolder;
        Insert: Omit<GalleryFolder, "id" | "created_at">;
        Update: Partial<Omit<GalleryFolder, "id" | "created_at">>;
      };
      agenda_events: {
        Row: AgendaEvent;
        Insert: Omit<AgendaEvent, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<AgendaEvent, "id" | "created_at">>;
      };
      seo_settings: {
        Row: SeoSetting;
        Insert: Omit<SeoSetting, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SeoSetting, "id" | "created_at">>;
      };
      activity_logs: {
        Row: ActivityLog;
        Insert: Omit<ActivityLog, "id" | "created_at">;
        Update: never;
      };
    };
  };
}

// =============================================================================
// INTERFACES
// =============================================================================

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  type: "text" | "url" | "image" | "boolean" | "json";
  label: string | null;
  group_name: string;
  created_at: string;
  updated_at: string;
}

export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  video_url: string;
  cta_whatsapp_label: string;
  cta_secondary_label: string;
  cta_secondary_url: string;
  badge_text: string;
  is_active: boolean;
  stats: HeroStat[];
  created_at: string;
  updated_at: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  post_count: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category_id: string | null;
  author_id: string | null;
  status: "draft" | "published" | "scheduled" | "archived";
  published_at: string | null;
  scheduled_at: string | null;
  meta_title: string;
  meta_description: string;
  og_image: string;
  keywords: string;
  canonical_url: string;
  reading_time: number;
  views: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  // Joins
  category?: Category;
  tags?: Tag[];
}

export interface GalleryFolder {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  folder_id: string | null;
  url: string;
  thumbnail_url: string;
  filename: string;
  alt_text: string;
  caption: string;
  width: number;
  height: number;
  size_bytes: number;
  mime_type: string;
  created_at: string;
  // Joins
  folder?: GalleryFolder;
}

export interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  city: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  ip_address: string;
  created_at: string;
  updated_at: string;
}

export interface AgendaEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  start_datetime: string;
  end_datetime: string | null;
  image_url: string;
  is_public: boolean;
  is_cancelled: boolean;
  event_type: "evento" | "reuniao" | "audiencia" | "visita" | "outros";
  created_at: string;
  updated_at: string;
}

export interface SeoSetting {
  id: string;
  page_path: string;
  page_label: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  keywords: string;
  robots: string;
  canonical_url: string;
  schema_json: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Json;
  ip_address: string;
  created_at: string;
}

// Tipo utilitário para settings como mapa
export type SiteSettingsMap = Record<string, string>;
