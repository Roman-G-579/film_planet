import {Episode} from './episode.interface';

export interface Season {
  _id?: number;
  show_id?: number;
  id: number; // The season's TMDB id
  air_date?: string;
  number?: number; // season 0 reserved for specials
  name: string; // series 1 etc. for uk shows, miniseries for miniseries, pilot for individual pilots
  overview?: string;
  poster_path?: string;
  season_number?: string;
  vote_average?: number;
  episodes?: Episode[]; // Array of all episodes belonging to the season
}
