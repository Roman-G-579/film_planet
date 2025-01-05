import {FilmGenres} from '../constants/film-genres.record';
import {MediaType} from '../enums/media-type.enum';
import {TvGenres} from '../constants/tv-genres.record';

export class DataUtils {

  /**
   * Converts genre ids of the given media type to their corresponding names based on the id array and the media type
   * Will convert a subset of genre ids if a genres array is provided
   * @param mediaType The given media type: Film or TV
   * @param genres <i>(optional)</i> An array of specific genre numbers
   * @returns all genre names as an array of strings
   */
  static getGenreNamesFromIds(mediaType: MediaType, genres?: number[]): string[] {
    // The genre object corresponds to the given media type
    const selectedObject: Record<string,number> = mediaType === MediaType.Film ? FilmGenres : TvGenres;

    // Returns all genre names if no specific genres are provided
    if (!genres) {
      return Object.keys(selectedObject);
    }

    // Returns genre names corresponding to the IDs in the given genres array
    return Object.keys(selectedObject).filter(genreName =>
      genres.includes(selectedObject[genreName])
    );
  }

  /**
   * Converts a single genre ID to its matching genre name
   * @param genreId the id of the genre
   * @param mediaType the media type that the genre is associated with (Film or TV)
   */
  static getGenreNameFromId(genreId: number, mediaType: MediaType): string {
    const genresObject: Record<string, number> = mediaType === MediaType.Film ? FilmGenres : TvGenres;
    return Object.keys(genresObject).find((key) => genresObject[key] === genreId) || '';
  }

  /**
   * Converts a single genre name to its matching genre id
   * @param genreName the name of the genre
   */
  static getGenreIdFromName(genreName: string | undefined): number {
    if ( genreName) {
      return FilmGenres[genreName] || TvGenres[genreName];
    }
    return 0;
  }

  /**
   * Formats a Date object in the YYYY-MM-DD format
   * @param date the given Date object
   */
  static formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  static getYearList() {
    const currentYear = new Date().getFullYear();
    return Array.from({length: currentYear - 1880 + 1}, (_, i) => currentYear - i);
  }

}
