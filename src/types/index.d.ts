import type { CollectionEntry } from 'astro:content';

// =============================================================================
// Utility types
// =============================================================================

/** Make a type easier to read in IDE tooltips */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** T or undefined */
export type Maybe<T> = T | undefined;

/** T or null */
export type Nullable<T> = T | null;

/** T or null or undefined */
export type Optional<T> = T | null | undefined;

/** Guarantee at least one element */
export type NonEmptyArray<T> = [T, ...T[]];

/** Extract value types from an object */
export type ValueOf<T> = T[keyof T];

/** Recursive partial */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/** Recursive readonly */
export type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
    ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
    : T;

/** Pick only the keys whose values match a type */
export type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

// =============================================================================
// Enum-like types (mirrors Zod enums in content.config.ts)
// =============================================================================

export type Complexity = 'intro' | 'intermediate' | 'advanced';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type VideoType = 'video' | 'shorts' | 'livestream';
export type TalkCategory = 'conference' | 'workshop' | 'meetup' | 'webinar' | 'panel';

// =============================================================================
// Content collection entry types
// =============================================================================

export type Article = CollectionEntry<'articles'>;
export type Talk = CollectionEntry<'talks'>;
export type Package = CollectionEntry<'packages'>;
export type Video = CollectionEntry<'videos'>;
export type ApiGuide = CollectionEntry<'apiGuides'>;
export type Testimonial = CollectionEntry<'testimonials'>;
export type Podcast = CollectionEntry<'podcasts'>;

/** Frontmatter data shapes */
export type ArticleData = Article['data'];
export type TalkData = Talk['data'];
export type PackageData = Package['data'];
export type VideoData = Video['data'];
export type ApiGuideData = ApiGuide['data'];
export type TestimonialData = Testimonial['data'];
export type PodcastData = Podcast['data'];

/** Any collection entry */
export type AnyCollectionEntry =
  | Article
  | Talk
  | Package
  | Video
  | ApiGuide
  | Testimonial
  | Podcast;

/** Collection names as a union */
export type CollectionName =
  | 'articles'
  | 'talks'
  | 'packages'
  | 'videos'
  | 'apiGuides'
  | 'testimonials'
  | 'podcasts';

// =============================================================================
// Site
// =============================================================================

export type SocialPlatform =
  | 'github'
  | 'twitter'
  | 'bluesky'
  | 'mastodon'
  | 'linkedin'
  | 'youtube'
  | 'twitch'
  | 'instagram'
  | 'discord'
  | 'rss'
  | 'email'
  | 'website';

export interface Social {
  platform: SocialPlatform;
  url: string;
  handle?: string;
  label?: string;
}

export interface Author {
  name: string;
  bio?: string;
  avatar?: string;
  email?: string;
  socials?: Social[];
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author: Author;
  socials: Social[];
  defaultOgImage?: string;
  locale?: string;
}

// =============================================================================
// Navigation
// =============================================================================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  external?: boolean;
  active?: boolean;
  items?: NavItem[];
  variant?: 'default' | 'highlight' | 'cta';
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

// =============================================================================
// SEO / Meta
// =============================================================================

export type OgType = 'website' | 'article' | 'profile' | 'book';
export type TwitterCardType = 'summary' | 'summary_large_image' | 'app' | 'player';

export interface OpenGraph {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: OgType;
  publishedTime?: Date;
  modifiedTime?: Date;
  author?: string;
  tags?: string[];
  siteName?: string;
}

export interface TwitterCard {
  card?: TwitterCardType;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  creator?: string;
  site?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  og?: Partial<OpenGraph>;
  twitter?: Partial<TwitterCard>;
  /** ISO date string or Date */
  publishedTime?: Date | string;
  modifiedTime?: Date | string;
  author?: string;
  tags?: string[];
  type?: OgType;
}

// =============================================================================
// Layout
// =============================================================================

export interface LayoutProps {
  meta: PageMeta;
  class?: string;
}

// =============================================================================
// Pagination
// =============================================================================

export interface PaginationLink {
  href: string;
  label: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  prev?: PaginationLink;
  next?: PaginationLink;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: Pagination;
}

// =============================================================================
// Content rendering
// =============================================================================

export interface TocEntry {
  depth: number;
  slug: string;
  text: string;
  children?: TocEntry[];
}

export interface ReadingTime {
  minutes: number;
  words: number;
}

export interface ImageMeta {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

// =============================================================================
// Search
// =============================================================================

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  collection: CollectionName;
  tags?: string[];
  score?: number;
}

// =============================================================================
// UI primitives
// =============================================================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Variant = 'default' | 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
export type ColorScheme = 'light' | 'dark' | 'system';
export type Alignment = 'left' | 'center' | 'right';
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Orientation = 'horizontal' | 'vertical';

// =============================================================================
// Feed / RSS
// =============================================================================

export interface FeedItem {
  title: string;
  description: string;
  url: string;
  pubDate: Date;
  updatedDate?: Date;
  categories?: string[];
  author?: string;
  image?: string;
}
