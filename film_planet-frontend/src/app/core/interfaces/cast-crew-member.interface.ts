/**
 * Interface for a cast member or a crew member of a film / TV show
 */
export interface CastCrewMember {
  gender?: number;
  id: number;
  known_for_department?: string;
  name: string;
  original_name?: string;
  popularity?: string;
  profile_path?: string;
  cast_id?: string;
  character?: string;
  credit_id?: string;
  order?: number;
  department?: string;
  job: string;
}
