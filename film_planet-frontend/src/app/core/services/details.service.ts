import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {CastCrewMember} from '../interfaces/cast-crew-member.interface';
import {REVIEWS} from '../mock-data/reviews';
import {Review} from '../interfaces/review.interface';
import {MediaType} from '../enums/media-type.enum';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LibraryItem} from '../interfaces/library-item.interface';
import {environment} from '../../../environments/environment';
import {Credits} from '../interfaces/credits.interface';
import {Season} from '../interfaces/season.interface';
import {Episode} from '../interfaces/episode.interface';
import {PEOPLE} from '../mock-data/people';
import {ItemCredit} from '../interfaces/item-credit.interface';
import {LIBRARY_ITEMS} from '../mock-data/library-items';

@Injectable({
  providedIn: 'root',
})

/**
 * Contains functions related to data retrieval of films, TV shows (along with their seasons and episodes),
 * their credits etc.
 *
 */
export class DetailsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}`;

  isLoading = signal<boolean>(true);
  loadingSeasonDetails = signal<boolean>(false);

  // Details of specific item
  item: WritableSignal<LibraryItem> = signal<LibraryItem>({
    id: 0,
    mediaType: MediaType.Film,
    genres: [],
    genre_ids: [],
    credits: {
      id: 0,
      cast: [],
      crew: []
    }
  });

  // Details of specific person
  person: WritableSignal<CastCrewMember> = signal<CastCrewMember>({
    id: 0,
    name: '',
    job: ""
  });

  // List of acting credits associated with a specific person
  castCredits: WritableSignal<ItemCredit[]> = signal<ItemCredit[]>([{
    id: 0,
    credit_id: ''
  }]);

  // List of various non-acting credits associated with a specific person,
  // grouped by their departments
  crewCredits: WritableSignal<ItemCredit[][]> = signal<ItemCredit[][]>([]);

  // Lists of cast and crew associated with a specific film or TV show
  credits: WritableSignal<Credits> = signal<Credits>({
    id: 0,
    cast: [],
    crew: []
  });

  // List of actors who acted in a specific film or TV show
  mainCast: WritableSignal<CastCrewMember[]> = signal<CastCrewMember[]>([]);

  // List of directors and creators associated with a specific film or TV show
  directorsAndCreators: WritableSignal<CastCrewMember[]> = signal<CastCrewMember[]>([]);

  // List of the original writers of a specific film or TV show
  originalWriters: WritableSignal<CastCrewMember[]> = signal<CastCrewMember[]>([]);

  /**
   * Returns every review written for the item with the given id
   * @param id the id of the film or tv show
   */
  getReviewsByItemId(id: number): Review[] {
    return REVIEWS.filter( (review) => {
      return review.item_id === id;
    });
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

    this.item.set(LIBRARY_ITEMS[0]);
    if (LIBRARY_ITEMS[0].credits) {
      this.credits.set(LIBRARY_ITEMS[0].credits);
    }

    this.setMainCredits(this.credits());
    this.isLoading.set(false);
    // let headers = new HttpHeaders().set('media-type', mediaTypeHeader);
    // headers = headers.set('id',id.toString());
    //
    // let resultItem: LibraryItem;
    //
    // this.http.get(href, {headers}).subscribe({
    //   next: (data) => {
    //     resultItem = data as LibraryItem;
    //     resultItem.mediaType = mediaType;
    //
    //     // Setting item's genre ids
    //     resultItem.genre_ids = [];
    //     for (let genre of resultItem.genres) {
    //       resultItem.genre_ids.push(Number(genre.id));
    //     }
    //
    //     this.item.set(resultItem);
    //     if (resultItem.credits) {
    //       this.credits.set(resultItem.credits);
    //     }
    //
    //     this.setMainCredits(this.credits());
    //     this.isLoading.set(false);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });

  }

  /**
   * Returns the details of the season matching the given show id combined with the season number
   * @param series_id the show's TMDB id
   * @param season_number the number of the season
   */
  getSeasonDetails(series_id: number, season_number: number) {
    const pageUrl = `details/tv/${series_id}/season/${season_number}`;
    const { href } = new URL(pageUrl, this.apiUrl);

    let headers = new HttpHeaders().set('series-id',series_id.toString());
    headers = headers.set('season-number',season_number.toString());

    let resultItem: Season;

    const itemData = this.item();

    this.http.get(href, {headers}).subscribe({
      next: (data) => {
        resultItem = data as Season;

        if (itemData.seasons) {
          // Finds the index of the relevant season in the item's seasons array
          const seasonIdx = itemData.seasons.findIndex((season) => season.id === resultItem.id);
          // Updates the relevant season object with the retrieved season data
          if (seasonIdx !== -1) {
            itemData.seasons[seasonIdx] = resultItem;

            // Extracts extra details for each episode of the season
            if (itemData.seasons[seasonIdx].episodes) {
              let seasonEpisodes: Episode[] = itemData.seasons[seasonIdx].episodes;

              for (let episode of seasonEpisodes) {
                episode = this.getEpisodeDirectorsAndWriters(episode);
              }
            }

            this.item.set(itemData);
          }
          this.loadingSeasonDetails.set(false);
        }
        else {
          console.error("Seasons array is undefined")
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  /**
   * Returns the details of a person matching the given id from the TMDB database
   * @param id the person's id
   */
  getPersonDetails(id: number) {
    const pageUrl = `details/person/${id}`;
    const { href } = new URL(pageUrl, this.apiUrl);

    // let headers = new HttpHeaders().set('id',id.toString());
    //
    // this.http.get(href, {headers}).subscribe({
    //   next: (data) => {
    //     let result: CastCrewMember = data as CastCrewMember;
    //
    //     this.person.set(result);
    //
    //     this.isLoading.set(false);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });

    // MOCK DATA
    this.person.set(PEOPLE[0]);


    if (PEOPLE[0].combined_credits?.cast) {
      this.castCredits.set(this.sortCreditsByDate(PEOPLE[0].combined_credits?.cast));
    }
    if (PEOPLE[0].combined_credits?.crew) {
      this.crewCredits.set(this.createDepartmentsCreditsArray(PEOPLE[0].combined_credits?.crew));
    }

  }
  /**
   * Sets the values of the item's main actors and directors/creators
   * @param credits the film or TV show's full credits list
   */
  private setMainCredits(credits: Credits) {
    this.mainCast.set(credits.cast.slice(0,3));

    // Finds every credited director for the film (if the credits list is of a film)
    const directors: CastCrewMember[] = credits.crew.filter((person) => {
      return person.job?.toLowerCase() === 'director';
    });

    // Finds every original writer for the item (if it is based on a novel or a short story)
    const originalWriters: CastCrewMember[] = credits.crew.filter((person) => {
      let job: string | undefined = person.job?.toLowerCase();
      if (job?.includes('novel') || job?.includes('book')) {
        person.job = $localize`:@@details-service.novel:novel`;
        return true;
      }
      else if (job?.includes('short story')) {
        person.job = $localize`:@@details-service.shortStory:short story`;
        return true;
      }
      else {
        return false;
      }
    });

    this.directorsAndCreators.set(this.item().created_by || directors);
    this.originalWriters.set(originalWriters);
  }

  /**
   * Extracts extra data from the episode object
   * @param episode the episode object
   */
  private getEpisodeDirectorsAndWriters(episode: Episode) {
    if (episode && episode.crew) {
      const directors: string[] = episode.crew
        .filter((person) => person.job?.toLowerCase() === 'director')
        .map((person) => person.name);

      const writers: string[] = episode.crew
        .filter((person) => person.job?.toLowerCase() === 'writer')
        .map((person) => person.name);

      episode.directors = directors;
      episode.writers = writers;
    }

    return episode;
  }

  /**
   * Sorts a list of film/TV show credits by date (newest to oldest)
   * @param itemCredits a list of film/ TV show credits
   */
  private sortCreditsByDate(itemCredits: ItemCredit[]): ItemCredit[] {
    return itemCredits.sort((a,b) => {
      const dateA = new Date(a.release_date || a.first_air_date || '').getTime();
      const dateB = new Date(b.release_date || b.first_air_date || '').getTime();

      if (!dateA && !dateB) {
        return 0; // Both have no dates, so they are considered equal
      } else if (!dateA) {
        return -1; // `a` has no date, so place it before `b`
      } else if (!dateB) {
        return 1; // `b` has no date, so place it before `a`
      }

      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
  }

  private createDepartmentsCreditsArray(crewCredits: ItemCredit[]) {
    const departmentMap = new Map<string, ItemCredit[]>();

    for (const credit of crewCredits) {
      const department = credit.department || 'Unknown'; // Use 'Unknown' if department is missing
      if (!departmentMap.has(department)) {
        departmentMap.set(department, []);
      }
      departmentMap.get(department)!.push(credit);
    }

    // Convert the Map values to an array of arrays
    return Array.from(departmentMap.values()).map((credits) => this.sortCreditsByDate(credits));
  }
}
