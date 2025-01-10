import {Filmography} from './filmography.interface';
import {ExternalIDs} from './external-ids.interface';

/**
 * Interface for a cast member or a crew member of a film / TV show
 */
export interface CastCrewMember {
  gender?: number;
  id: number;
  imdb_id?: string;
  known_for_department?: string;
  name: string;
  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  homepage?: string | null;
  place_of_birth?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  cast_id?: string;
  character?: string;
  credit_id?: string;
  order?: number;
  department?: string;
  job?: string | null;
  combined_credits?: Filmography;
  external_ids?: ExternalIDs;
}
