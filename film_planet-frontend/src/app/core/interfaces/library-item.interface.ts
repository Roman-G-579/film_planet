import {MediaType} from '../enums/media-type.enum';

export interface LibraryItem {
  id: number;
  mediaType: MediaType;
  title: string;
  adult?: boolean;
  video?: boolean;
  release_date: string;
  endYear?: string; // for tv shows
  duration?: number;
  overview?: string;
  genre_ids: number[];
  starring?: string[];
  directors?: string[];
  creators?: string[];
  original_language?: string;
  original_title?: string;
  popularity?: number;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
}
