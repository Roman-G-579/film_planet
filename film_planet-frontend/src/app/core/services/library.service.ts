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
import {ItemListResponse} from '../interfaces/api-responses/item-list-response.interface';
import {Credits} from '../interfaces/credits.interface';
import {CastCrewMember} from '../interfaces/cast-crew-member.interface';

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

  isLoading = signal<boolean>(true);

  libraryItems: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);
  searchResults: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  // Backup copy of original items list
  unfilteredItems: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  minDateFilter: string | undefined;
  maxDateFilter: string | undefined;
  genreIdFilter: number = 0;

  /**
   * ratingFilter[0] = minRating,
   * ratingFilter[1] = maxRating
   */
  ratingFilter: number[] = [0.0,10];

  applyFilters(year: number | undefined, genre: string | undefined, minRating: number, maxRating: number) {
    // Date Filters
    if (year) {
      this.minDateFilter = `${year}-01-01`;
      this.maxDateFilter = `${year}-12-31`;
    }

    if (genre) {
      this.genreIdFilter = this.dataUtils.getGenreIdFromName(<string>genre);
    }

    // Rating Filters
    this.ratingFilter[0] = (minRating);
    this.ratingFilter[1] = (maxRating);

    // Updates the items list
    this.getFilteredList();
  }

  /**
   * Clears the genre filter
   */
  removeGenreFilter() {
    this.genreIdFilter = 0;
  }

  /**
   * Clears the date filter
   */
  removeDateFilter() {
    this.minDateFilter = undefined;
    this.maxDateFilter = undefined;
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
  }

  /**
   * Fetches a list of items from the api based on the specified media type and category
   * @param mediaType item type - film or TV
   * @param category  recent / popular / top
   * @param genreId (optional) the item's genre TMDB ID
   * @param pageNum the number of page in the list of the relevant items
   */
  getItemListFromApi(mediaType: MediaType, category: string, genreId?: string, pageNum?: number) {
    let pageUrl;

    // Get items of a specific genre
    if (genreId) {
      pageUrl = `library/${mediaType}/genre/${genreId}`;
    }

    else {
      pageUrl = `library/${mediaType}/${category}`;
    }

    const { href } = new URL(pageUrl, this.apiUrl);

    const pageNumStr = pageNum?.toString() || '1';

    let headers = new HttpHeaders().set('page-num',pageNumStr);
    if (genreId) {
      headers = headers.set('genre', genreId);
    }

    this.http.get(href, {headers}).subscribe({
      next: (data) => {
        let resultItems: LibraryItem[];

        if (category === 'top') {
          const resultsObject = data as LibraryItem[];
          resultItems = [...this.libraryItems(), ...resultsObject];
        }
        else {
          const resultsObject = data as ItemListResponse;
          resultItems = [...this.libraryItems(), ...resultsObject.results];
        }

        for (let item of resultItems) {
          item.mediaType = mediaType;
        }

        this.libraryItems.set(resultItems);
        this.unfilteredItems.set(resultItems);

        this.isLoading.set(false);
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
   * Fetches a list of items from the API based on the given search query
   * @param query the name of the film or TV show that is being searched
   * @param mediaType (optional) the item's media type
   */
  getSearchResultsFromApi(query: string, mediaType?: MediaType) {
    query = query.toLowerCase().replace(/\s/g, '-');

    if (mediaType) {
      this.search(query, mediaType);
    } else {
      // Search both TV and Film if no mediaType is specified
      this.search(query, MediaType.Film);
      this.search(query, MediaType.TV);
    }

    this.isLoading.set(false);

  }

  /**
   * Searches the TMDB database using the given query and media type
   * @param query the search query
   * @param mediaType film or TV
   */
  private search(query: string, mediaType: MediaType) {
    const pageUrl = `library/search/${mediaType.toLowerCase()}/${query}`;
    const { href } = new URL(pageUrl, this.apiUrl);

    this.http.get(href).subscribe({
      next: (data) => {
        const resultsObject = data as ItemListResponse;
        const resultItems: LibraryItem[] = resultsObject.results;

        // Assign mediaType to all result items
        resultItems.forEach((item) => (item.mediaType = mediaType));

        // Update library items and sort them by popularity
        this.searchResults.set(
          [...this.searchResults(), ...resultItems].sort(
            (a: LibraryItem, b: LibraryItem) => {
              const popularityA = a.popularity ?? 0;
              const popularityB = b.popularity ?? 0;
              return popularityB - popularityA;
          })
        );
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  /**
   * @returns A list of library items filtered based on the values in the filter parameters
   * (minDateFilter, maxDateFilter, genreFilter, ratingFilter, mediaFilter)
   */
  getFilteredList() {
    const filteredItems: LibraryItem[] = this.unfilteredItems().filter(
      (item) => {

        const releaseDate = item.release_date || item.first_air_date || '';
        return (
          (!this.minDateFilter || releaseDate >= this.minDateFilter) &&
          (!this.maxDateFilter || releaseDate <= this.maxDateFilter) &&
          (!this.genreIdFilter || item.genre_ids?.includes(this.genreIdFilter)) &&
          (!this.ratingFilter || (item.vote_average && item.vote_average >= this.ratingFilter[0] && item.vote_average <= this.ratingFilter[1]))
        );
      }
    );

    this.libraryItems.set(filteredItems.sort((a,b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)));
  }

}
