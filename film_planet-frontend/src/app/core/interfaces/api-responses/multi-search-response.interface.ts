import {MultiSearchItem} from '../multi-search-item.interface';

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchItem[];
  total_pages: number;
  total_results: number;
}
