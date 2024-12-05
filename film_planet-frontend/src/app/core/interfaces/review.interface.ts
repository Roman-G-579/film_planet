export interface Review {
  id: number;
  item_id: number; // the ID of the film/tv show
  author: string;
  content: string;
  rating?: number;
  created_at: Date;

}
