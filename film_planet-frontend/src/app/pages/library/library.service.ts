import {Injectable} from '@angular/core';
import { LIBRARY_ITEMS} from '../../core/mock-data/library-items';
import {MediaType} from '../../core/enums/media-type.enum';
import {LibraryItem} from '../../core/interfaces/library-item.interface';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {

  /**
   * Retrieves X new movies from the TMDB library
   */
  getRecentFilms(): LibraryItem[] {
    return LIBRARY_ITEMS.filter(item => item.mediaType === MediaType.Film);
  }

  /**
   * Retrieves X new TV shows from the TMDB library
   */
  getRecentTV(): LibraryItem[] {
    return LIBRARY_ITEMS.filter(item => item.mediaType === MediaType.TV);

  }
}
