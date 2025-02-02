import {MediaType} from '../enums/media-type.enum';
import {LibraryItem} from './library-item.interface';

/**
 * Interface for a general media item - Film, TV Show, or Person
 */
export interface MultiSearchItem {
  id: number;
  mediaType: MediaType;
  name?: string;
  title?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  original_language?: string;
  original_title?: string; // used for films
  overview?: string;
  genre_ids?: number[];
  popularity?: number;
  release_date?: string; // used for films
  first_air_date?: string; // used for TV shows
  vote_average?: number;
  vote_count?: number;
  known_for?: LibraryItem[];

}
