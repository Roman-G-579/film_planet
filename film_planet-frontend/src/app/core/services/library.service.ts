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
import {Genre} from '../interfaces/genre.interface';

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

  //TODO: move loading skeletons to inside of table in top0titles.component
  isLoading = signal<boolean>(true);

  libraryItems: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  // Backup copy of original items list
  unfilteredItems: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  // Details of specific item
  item: WritableSignal<LibraryItem> = signal<LibraryItem>({
    id: 0,
    mediaType: MediaType.Film,
    genres: []
  });

  credits: WritableSignal<Credits> = signal<Credits>({
    id: 0,
    cast: [],
    crew: []
  });

  mainCast: WritableSignal<CastCrewMember[]> = signal<CastCrewMember[]>([]);
  directorsAndCreators: WritableSignal<CastCrewMember[]> = signal<CastCrewMember[]>([]);

  mediaFilter: MediaType = MediaType.Film;

  minDateFilter: string | undefined;
  maxDateFilter: string | undefined;
  genreIdFilter: number = 0;

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


  //TODO: update genre filter to use Genre object type

  // /**
  //  * Filters by the library item's genre
  //  * @param genre the chosen genre - either its id, or its name
  //  */
  // filterByGenre(genre: Genre | number | undefined) {
  //   if (Number(genre)) {
  //     this.genreFilter = Number(genre);
  //   }
  //   else {
  //     this.genreFilter = this.dataUtils.getGenreIdFromName(<string>genre);
  //   }
  //   this.getFilteredList();
  // }

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
   * Fetches an item from the api based on the specified id
   * @param mediaType item type - film or TV (used for url generation)
   * @param id the item's TMDB id
   */
  getItemFromApi(mediaType: MediaType, id: number) {
    const pageUrl = `details/${mediaType}/${id}`;
    const { href } = new URL(pageUrl, this.apiUrl);
    const mediaTypeHeader = mediaType === MediaType.Film ? 'movie' : 'tv';

    let headers = new HttpHeaders().set('media-type', mediaTypeHeader);
    headers = headers.set('id',id.toString());

    let resultItem: LibraryItem;

    this.http.get(href, {headers}).subscribe({
      next: (data) => {
        resultItem = data as LibraryItem;
        resultItem.mediaType = mediaType;

        this.item.set(resultItem);

        if (resultItem.credits) {
          this.credits.set(resultItem.credits);
        }

        this.setMainCredits(this.credits());
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  /**
   * Sets the values of the item's main actors and directors/creators
   * @param credits the film or TV show's full credits list
   */
  setMainCredits(credits: Credits) {
    this.mainCast.set(credits.cast.slice(0,3));

    const directors: CastCrewMember[] = credits.crew.filter((person) => {
      return person.job?.toLowerCase() === 'director';
    });

    this.directorsAndCreators.set(this.item().created_by || directors);
  }

  /**
   * Fetches an expanded list of details of a film or TV show
   * @param id the id of the film or TV show
   */
  getItemDetailsFromApi(id: number) {

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
