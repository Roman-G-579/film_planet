export interface Episode {
  id: number;
  series_id: number;
  season_id: number;
  name: string;
  description?: string;
  duration?: number; // In minutes
  releaseDate?: Date;
  rating?: number;
  directors?: string[];
  writers?: string[];

}
