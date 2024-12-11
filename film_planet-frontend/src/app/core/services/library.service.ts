import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { LIBRARY_ITEMS} from '../mock-data/library-items';
import {MediaType} from '../enums/media-type.enum';
import {LibraryItem} from '../interfaces/library-item.interface';
import {SEASONS} from '../mock-data/seasons';
import {EPISODES} from '../mock-data/episodes';
import {REVIEWS} from '../mock-data/reviews';
import {DataUtils} from '../utils/data.utils';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

/**
 * Contains functions related to filtering and sorting items from the media library
 */
export class LibraryService {
  protected readonly dataUtils = DataUtils;
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}`;

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
   *
   * //TODO: take media type as parameter in filterByRecent,filterByPopular,filterByTop
   */
  filterByRecent() {
    const { href } = new URL(`library/film/recent`, this.apiUrl);
    this.http.get(href).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });

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
   * @param genre the chosen genre - either its id, or its name
   */
  filterByGenre(genre: string | number | undefined) {
    if (Number(genre)) {
      this.genreFilter = Number(genre);
    }
    else {
      this.genreFilter = this.dataUtils.getGenreIdFromName(<string>genre);
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
    const { href } = new URL(`library/film/popular`, this.apiUrl);
    this.http.get(href).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.clearAllFilters();
    this.getFilteredList();
  }

  filterByTop() {
    const { href } = new URL(`library/film/top`, this.apiUrl);
    this.http.get(href).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Retrieves an item from the library matching the given name
   * @param id the TMDB id of the film or tv show
   */
  getItemById(id: number): LibraryItem | undefined {
    return LIBRARY_ITEMS.find( (item) => {
      return item.id === id;
    });
  }

  /**
   * Returns every season with a series id matching the given id
   * @param id the id that each season's series_id value is compared with
   */
  getShowSeasons(id: number) {
    return SEASONS.filter( (season) => {
      return season.series_id === id;
    });
  }

  /**
   * //TODO: place episode objects directly inside season objects to avoid searching through the entire database
   * Returns every episode with a season id matching the given id
   * @param id the id that each episode's season_id value is compared with
   */
  getSeasonEpisodes(id: number) {
    return EPISODES.filter( (episode) => {
      return episode.season_id === id;
    });
  }

  /**
   * Returns every review written for the item with the given id
   * @param id the id of the film or tv show
   */
  getReviewsByItemId(id: number) {
    return REVIEWS.filter( (review) => {
      return review.item_id === id;
    });
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
