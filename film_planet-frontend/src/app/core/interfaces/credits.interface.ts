import { CastCrewMember } from "./cast-crew-member.interface";

/**
 * Interface for a credits object, containing the film / TV show's cast and crew
 */
export interface Credits {
  id: number;
  cast: CastCrewMember[];
  crew: CastCrewMember[];
}
