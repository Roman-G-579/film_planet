/**
 * Interface for an actor's or a crew member's credit in a film or TV show, containing
 * the film's/TV show's details and the person's role/job in it
 */
export interface ItemCredit {
  id: number;
  credit_id: string;
  genre_ids?: number[];
  original_language?: string;
  title?: string;
  name?: string;
  episode_count?: number;
  department?: string;
  job?: string;
  original_title?: string; // used for films
  original_name?: string; // used for tv shows
  origin_country?: string[];
  overview?: string;
  popularity?: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string; // used for films
  first_air_date?: string; // used for tv shows
  last_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  character?: string;
  order?: number;
  media_type?: string;
}
