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

  mediaFilter: MediaType = MediaType.Film;
  yearFilter: number | undefined;
  genreFilter: number | undefined;

  /**
   * ratingFilter[0] = minRating,
   * ratingFilter[1] = maxRating
   */
  ratingFilter: number[] = [0.0,10];

  topTitles: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);


  filterByMediaType(type: MediaType) {
    this.mediaFilter = type;

    this.getFilteredList();
  }

  filterByYear(year: Date | undefined) {
    if (year) {
      this.yearFilter = year.getFullYear();
    }

    this.getFilteredList();
  }

  filterByGenre(genre: string | undefined) {
    console.log(genre);
    const selectedGenreList: Record<string,number> = this.mediaFilter === MediaType.Film ? FilmGenres : TvGenres;
    if (genre) {
      this.genreFilter = selectedGenreList[genre];
    }

    this.getFilteredList();
  }

  filterByRating(minRating: number, maxRating: number) {
    this.ratingFilter[0] = (minRating);
    this.ratingFilter[1] = (maxRating);

    this.getFilteredList();
  }

  removeGenreFilter() {
    this.genreFilter = undefined;
    this.getFilteredList();
  }

  removeYearFilter() {
    this.yearFilter = undefined;
    this.getFilteredList();
  }

  removeRatingFilter() {
    this.ratingFilter = [0.0,10];
  }


  getTopFilmsOfAllTime(): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == MediaType.Film});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopTvOfAllTime(): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == MediaType.TV});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  /**
   * @returns A list of library items filtered based on the values in the filter parameters
   * (yearFilter, genreFilter, ratingFilter, mediaFilter)
   */
  getFilteredList() {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter(
      (item) => {
        return (
          (!this.yearFilter || item.year === this.yearFilter) &&
          (!this.genreFilter || item.genres.includes(this.genreFilter)) &&
          (!this.ratingFilter || (item.rating && item.rating >= this.ratingFilter[0] && item.rating <= this.ratingFilter[1])) &&
          (!this.mediaFilter || item.mediaType === this.mediaFilter)
        );
      }
    );

    this.topTitles.set(filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0)));
  }


}
