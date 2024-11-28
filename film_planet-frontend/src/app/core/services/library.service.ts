import {Injectable, signal, WritableSignal} from '@angular/core';
import { LIBRARY_ITEMS} from '../mock-data/library-items';
import {MediaType} from '../enums/media-type.enum';
import {LibraryItem} from '../interfaces/library-item.interface';
import {FilmGenres} from '../constants/film-genres.record';
import {TvGenres} from '../constants/tv-genres.record';

@Injectable({
  providedIn: 'root',
})

/**
 * Contains functions related to filtering and sorting items from the media library
 */
export class LibraryService {
  libraryItems: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  mediaFilter: MediaType = MediaType.Film;

  minDateFilter: Date | undefined;
  maxDateFilter: Date | undefined;
  genreFilter: number | undefined;

  /**
   * ratingFilter[0] = minRating,
   * ratingFilter[1] = maxRating
   */
  ratingFilter: number[] = [0.0,10];

  /**
   * Filters by the library item's type of media (film, tv etc.)
   * @param type the chosen media type
   */
  filterByMediaType(type: MediaType) {
    this.mediaFilter = type;
    //this.getFilteredList();
  }

  /**
   * Filters by the library item's year of release
   * @param date the item's release date
   */
  filterByYear(date: Date | undefined) {
    if (date) {
      this.minDateFilter = new Date(date.getFullYear(), 0, 1);
      this.maxDateFilter = new Date(date.getFullYear(), 11, 31);
    }

    this.getFilteredList();
  }

  /**
   * Filters by items released in the last 2 months
   */
  filterByRecent() {
    const currentDate = new Date();

    const minDate = new Date(currentDate);
    minDate.setMonth(minDate.getMonth() - 2);
    minDate.setDate(1); // Sets the min date to the first of the month
    this.minDateFilter = minDate;
    this.maxDateFilter = currentDate;
    this.getFilteredList();
  }

  /**
   * Filters by the library item's genre
   * @param genre the chosen genre
   */
  filterByGenre(genre: string | undefined) {
    const selectedGenreList: Record<string,number> = this.mediaFilter === MediaType.Film ? FilmGenres : TvGenres;
    if (genre) {
      this.genreFilter = selectedGenreList[genre];
    }

    this.getFilteredList();
  }

  /**
   * Filters by the library item's user rating
   * @param minRating minimum user rating
   * @param maxRating maximum user rating
   */
  filterByRating(minRating: number, maxRating: number) {
    this.ratingFilter[0] = (minRating);
    this.ratingFilter[1] = (maxRating);

    this.getFilteredList();
  }

  /**
   * Filters by recently popular items
   */
  filterByPopular() {
    this.clearAllFilters();
    this.getFilteredList();
  }

  /**
   * Clears the genre filter
   */
  removeGenreFilter() {
    this.genreFilter = undefined;
    this.getFilteredList();
  }

  /**
   * Clears the date filter
   */
  removeDateFilter() {
    this.minDateFilter = undefined;
    this.maxDateFilter = undefined;
    this.getFilteredList();
  }

  /**
   * Clears the genre, date, and rating filters
   */
  clearAllFilters() {
    this.removeGenreFilter();
    this.removeDateFilter();
    this.ratingFilter[0] = 0.0;
    this.ratingFilter[1] = 10;
  }

  /**
   * @returns A list of library items filtered based on the values in the filter parameters
   * (minDateFilter, maxDateFilter, genreFilter, ratingFilter, mediaFilter)
   */
  getFilteredList() {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter(
      (item) => {
        // The item's release date is converted to a Date object if necessary
        const releaseDate = item.releaseDate instanceof Date ? item.releaseDate : new Date(item.releaseDate, 0, 1);
        return (
          (!this.minDateFilter || releaseDate >= this.minDateFilter) &&
          (!this.maxDateFilter || releaseDate <= this.maxDateFilter) &&
          (!this.genreFilter || item.genres.includes(this.genreFilter)) &&
          (!this.ratingFilter || (item.rating && item.rating >= this.ratingFilter[0] && item.rating <= this.ratingFilter[1])) &&
          (!this.mediaFilter || item.mediaType === this.mediaFilter)
        );
      }
    );

    this.libraryItems.set(filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0)));
  }

}
