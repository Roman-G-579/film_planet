import {MediaType} from '../enums/media-type.enum';

export interface LibraryItem {
  id: number;
  mediaType: MediaType;
  title: string;
  release_date: Date | number;
  endYear?: Date | number; // for tv shows
  duration?: number;
  overview?: string;
  genre_ids: number[];
  starring?: string[];
  directors?: string[];
  creators?: string[];
  poster_path?: string;
  vote_average?: number;
}
