import {MediaType} from '../enums/media-type.enum';
import {Credits} from './credits.interface';
import {Genre} from './genre.interface';
import {CastCrewMember} from './cast-crew-member.interface';
import {ItemStatus} from '../enums/item-status.enum';
import {Season} from './season.interface';

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
  last_air_date?: string;
  runtime?: number; // in minutes
  overview?: string;
  genres: Genre[];
  genre_ids?: number[];
  starring?: string[];
  directors?: string[];
  created_by?: CastCrewMember[];
  origin_country?: string[];
  original_language?: string;
  original_title?: string; // used for films
  original_name?: string; // used for tv shows
  popularity?: number;
  poster_path?: string | null;
  revenue?: number;
  tagline?: string;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  credits: Credits;
  ranking?: number; // Used for top-items component
  status?: ItemStatus;
  seasons?: Season[];
}
