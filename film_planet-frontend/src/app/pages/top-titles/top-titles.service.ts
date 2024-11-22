import {Injectable, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import { LIBRARY_ITEMS } from '../../core/mock-data/library-items';
import {MediaType} from '../../core/enums/media-type.enum';
import {FilmGenres} from '../../core/constants/film-genres.record';
import {TvGenres} from '../../core/constants/tv-genres.record';

@Injectable({
  providedIn: 'root',
})
export class TopTitlesService {

  filterByMediaType(type: MediaType) {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == type});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  //TODO: add filtering if existing filter is already applied
  filterByYear(year: number, mediaType: MediaType) {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => { return item.year == year });
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  filterByGenre(genre: string, mediaType: MediaType) {
    const selectedGenreList: Record<string,number> = mediaType === MediaType.Film ? FilmGenres : TvGenres;
    const genreId: number = selectedGenreList[genre];

    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter(
      (item) => { return item.mediaType == mediaType && item.genres.includes(genreId) }
    );
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  filterByRating(minRating: number, maxRating: number, mediaType: MediaType) {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter(
      (item) => {
        if (item.rating) {
          return item.mediaType == mediaType && item.rating >= minRating && item.rating <= maxRating
        }
        return false;
      }
    );
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  removeGenreFilter() {

  }

  getTopFilmsByYear(year: number): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.year == year});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopTvByYear(year: number): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.year == year});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopFilmsOfAllTime(): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == MediaType.Film});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopTvOfAllTime(): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == MediaType.TV});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }


}
