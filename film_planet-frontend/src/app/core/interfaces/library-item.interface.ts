import {MediaType} from '../enums/media-type.enum';
import {CastCrewMember} from './cast-crew-member.interface';

/**
 * Interface for an individual film or tv show
 */
export interface LibraryItem {
  id: number;
  mediaType: MediaType;
  title?: string; // used for films
  name?: string; // used for tv shows
  budget?: number;
  release_date?: string; // used for films
  first_air_date?: string; // used for tv shows
  endYear?: string; // for tv shows
  runtime?: number; // in minutes
  overview?: string;
  genre_ids?: number[];
  starring?: string[];
  directors?: string[];
  created_by?: string[];
  origin_country?: string;
  original_language?: string;
  original_title?: string; // used for films
  original_name?: string; // used for tv shows
  popularity?: number;
  poster_path?: string;
  revenue?: number;
  tagline?: string;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
  credits?: CastCrewMember[];
}
