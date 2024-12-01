import {FilmGenres} from '../constants/film-genres.record';
import {MediaType} from '../enums/media-type.enum';
import {TvGenres} from '../constants/tv-genres.record';

export class DataUtils {

  /**
   * Converts genre ids to their corresponding names based on the id array and the media type
   * @param mediaType The given media type: Film or TV
   * @returns all genre names as an array of strings
   */
  static getGenreNamesFromIds(mediaType: MediaType): string[] {
    const genreNames: string[] = [];

    // The genre object corresponds to the given media type
    const selectedObject: Record<string,number> = mediaType === MediaType.Film ? FilmGenres : TvGenres;
    const genreIds = Object.values(selectedObject);
    for (const id of genreIds) {
      const name = Object.keys(selectedObject).find((key) => selectedObject[key] === id);
      if (name) {
        genreNames.push(name);
      }
    }

    return genreNames;
  }

  static getGenreNameFromId(genreId: number, mediaType: MediaType): string {
    const genresObject: Record<string, number> = mediaType === MediaType.Film ? FilmGenres : TvGenres;
    return Object.keys(genresObject).find((key) => genresObject[key] === genreId) || '';
  }
  static getGenreIdFromName(genreName: string, mediaType: MediaType): number {
    const genresObject: Record<string, number> = mediaType === MediaType.Film ? FilmGenres : TvGenres;
    return genresObject[genreName];
  }

  // /**
  //  * Sanitizes the given string for use in webpage urls.
  //  * -Removes leading and trailing whitespaces
  //  * -Converts the string to lowercase
  //  * -Replaces spaces with hyphens
  //  * -Removes special characters
  //  * @param text the given string
  //  */
  // static sanitizeString(text: string): string {
  //   return text
  //     .trim()
  //     .toLowerCase()
  //     .replace(/[\s]+/g, '-')
  //     .replace(/[^a-z0-9-]/g, '')
  //     .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
  // }
}
