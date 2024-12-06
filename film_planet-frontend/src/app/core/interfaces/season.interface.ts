import {Episode} from './episode.interface';

export interface Season {
  series_id: number;
  id: number;
  number: number; // season 0 reserved for specials
  name?: string; // series 1 etc. for uk shows, miniseries for miniseries, pilot for individual pilots
  episodes?: Episode[]; // Array of all episodes belonging to the season
}
