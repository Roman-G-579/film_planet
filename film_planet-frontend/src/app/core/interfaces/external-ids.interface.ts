/**
 * Interface for URL ids of various websites and databases
 * The IDs are used to provide external sources for people, films, and TV shows
 */
export interface ExternalIDs {
  id?: number;
  freebase_mid?: string | null;
  freebase_id?: string | null;
  imdb_id?: string | null;
  tvrage_id?: number | null;
  wikidata_id?: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  tiktok_id?: string | null;
  twitter_id?: string | null;
  youtube_id?: string | null;
}
