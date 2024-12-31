import {CastCrewMember} from './cast-crew-member.interface';

export interface Episode {
  id: number;
  series_id: number;
  season_id: number;
  production_code?: string;
  name: string;
  episode_number: number;
  season_number: number;
  overview?: string;
  runtime?: number; // In minutes
  air_date?: string;
  still_path?: string;
  vote_average?: number;
  vote_count?: number;
  crew?: CastCrewMember[];
  directors?: string[];
  writers?: string[];
  guest_stars?: CastCrewMember[];
}
