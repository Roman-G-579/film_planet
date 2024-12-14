import {MediaType} from '../enums/media-type.enum';

export interface LibraryItem {
  id: number;
  mediaType: MediaType;
  title: string; // used for films
  name?: string; // used for tv shows
  adult?: boolean;
  video?: boolean;
  release_date?: string; // used for films
  first_air_date?: string; // used for tv shows
  endYear?: string; // for tv shows
  duration?: number;
  overview?: string;
  genre_ids: number[];
  starring?: string[];
  directors?: string[];
  creators?: string[];
  original_language?: string;
  original_title?: string; // used for films
  original_name?: string; // used for tv shows
  popularity?: number;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
}
