import {MediaType} from '../enums/media-type.enum';

export interface LibraryItem {
  mediaType: MediaType;
  title: string;
  year: number;
  genres: string[];
  starring: string[];
  directors?: string[];
  creators?: string[];
  image?: string;
  rating?: number;
}
