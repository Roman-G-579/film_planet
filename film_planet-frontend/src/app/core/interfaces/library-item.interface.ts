import {MediaType} from '../enums/media-type.enum';

export interface LibraryItem {
  mediaType: MediaType;
  title: string;
  releaseDate: Date | number;
  endYear?: Date | number; // for tv shows
  duration?: number;
  overview?: string;
  genres: number[];
  starring: string[];
  directors?: string[];
  creators?: string[];
  image?: string;
  rating?: number;
}
