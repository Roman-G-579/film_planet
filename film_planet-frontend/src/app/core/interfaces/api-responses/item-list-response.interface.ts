import {LibraryItem} from '../library-item.interface';

/**
 * Interface for a JSON response object sent by the TMDB API.
 *
 * Used on the following responses:
 *
 * Film: Now PLaying, Popular, Top Rated
 *
 * TV: On The Air, Popular, Top Rated
 */
export interface ItemList {
  dates?: {
    maximum: string;
    minimum: string;
  }
  page: number;
  results: LibraryItem[];
  total_pages: number;
  total_results: number;
}
