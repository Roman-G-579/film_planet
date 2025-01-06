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
    genres: []
  });

  credits: WritableSignal<Credits> = signal<Credits>({
    id: 0,
    cast: [],
    crew: []
  });

  mainCast: WritableSignal<CastCrewMember[]> = signal<CastCrewMember[]>([]);
  directorsAndCreators: WritableSignal<CastCrewMember[]> = signal<CastCrewMember[]>([]);
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
      const job: string | undefined = person.job?.toLowerCase();
      return job?.includes('novel') || job?.includes('short story');
    })
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
}
