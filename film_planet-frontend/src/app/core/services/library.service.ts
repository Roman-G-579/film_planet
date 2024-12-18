import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { LIBRARY_ITEMS} from '../mock-data/library-items';
import {MediaType} from '../enums/media-type.enum';
import {LibraryItem} from '../interfaces/library-item.interface';
import {SEASONS} from '../mock-data/seasons';
import {EPISODES} from '../mock-data/episodes';
import {REVIEWS} from '../mock-data/reviews';
import {DataUtils} from '../utils/data.utils';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ItemList} from '../interfaces/api-responses/item-list-response.interface';

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

  // Backup copy of original items list
  unfilteredItems: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  mediaFilter: MediaType = MediaType.Film;

  minDateFilter: string | undefined;
  maxDateFilter: string | undefined;
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
  }

  /**
   * Filters by the library item's year of release
   * @param year the item's release year
   */
  filterByYear(year: number | undefined) {
    if (year) {
      this.minDateFilter = `${year}-01-01`;
      this.maxDateFilter = `${year}-12-31`;
    }

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

  applyFilters(year: number | undefined, genre: string | number | undefined, minRating: number, maxRating: number) {
    // Date Filters
    if (year) {
      this.minDateFilter = `${year}-01-01`;
      this.maxDateFilter = `${year}-12-31`;
    }

    // Genre Filters
    if (Number(genre)) {
      this.genreFilter = Number(genre);
    }
    else if (genre) {
      this.genreFilter = this.dataUtils.getGenreIdFromName(<string>genre);
    }

    // Rating Filters
    this.ratingFilter[0] = (minRating);
    this.ratingFilter[1] = (maxRating);

    // Updates the items list
    this.getFilteredList();
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
    this.getFilteredList();
    //this.libraryItems.set([]);
  }

  /**
   * Fetches a list of items from the api based on the specified media type and category
   * @param mediaType item type - film or TV
   * @param category  recent / popular / top
   * @param genre (optional) the item's genre
   */
  getItemListFromApi(mediaType: MediaType, category: string, genre?: string) {
    let pageUrl;
    if (genre) {
      pageUrl = `library/${mediaType}/genre/${genre}`;
    }
    else {
      pageUrl = `library/${mediaType}/${category}`;
    }
    console.log(pageUrl)
    const { href } = new URL(pageUrl, this.apiUrl);
    const headers = genre ? new HttpHeaders().set('genre', genre) : undefined;

    this.http.get(href, {headers}).subscribe({
      next: (data) => {
        const resultsObject = data as ItemList;
        let resultItems: LibraryItem[] = resultsObject.results;
        if (mediaType === MediaType.TV) {
          resultItems = this.setItemNames(resultItems);
        }

        this.libraryItems.set(resultItems);
        this.unfilteredItems.set(resultItems);
      },
      error: (err) => {
        console.log(err);
      }
    });

    // GET MOCK DATA
    // this.libraryItems.set(LIBRARY_ITEMS.filter( (item) => {
    //   return item.mediaType === mediaType;
    // }));
    // this.unfilteredItems.set(this.libraryItems());
  }

  /**
   * Sets the title fields for all library items (tv shows are generated with name fields
   * instead of title fields)
   * @param libraryItems the item array
   * @private
   */
  private setItemNames(libraryItems: LibraryItem[]) {
    for (let item of libraryItems) {
      item.title = item.name || '';
      item.original_title = item.original_name;
    }
    return libraryItems;
  }
  /**
   * Fetches an expanded list of details of a film or TV show
   * @param id the id of the film or TV show
   */
  getItemDetailsFromApi(id: number) {

  }

  /**
   * Fetches the
   * @param id the id of the film or TV show
   * @param mediaType item type - film or TV show
   */
  getCreditsFromApi(id: number, mediaType: MediaType) {

  }

  /**
   * @returns A list of library items filtered based on the values in the filter parameters
   * (minDateFilter, maxDateFilter, genreFilter, ratingFilter, mediaFilter)
   */
  getFilteredList() {
    const filteredItems: LibraryItem[] = this.unfilteredItems().filter(
      (item) => {
        // The item's release date is converted to a Date object if necessary
        //const releaseDate = item.release_date instanceof Date ? item.release_date : new Date(item.release_date, 0, 1);
        const releaseDate = item.release_date || item.first_air_date || '';
        return (
          (!this.minDateFilter || releaseDate >= this.minDateFilter) &&
          (!this.maxDateFilter || releaseDate <= this.maxDateFilter) &&
          (!this.genreFilter || item.genre_ids.includes(this.genreFilter)) &&
          (!this.ratingFilter || (item.vote_average && item.vote_average >= this.ratingFilter[0] && item.vote_average <= this.ratingFilter[1]))
        );
      }
    );

    this.libraryItems.set(filteredItems.sort((a,b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)));
  }

}
