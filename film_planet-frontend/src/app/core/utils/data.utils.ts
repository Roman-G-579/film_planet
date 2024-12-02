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
    const genreNames: string[] | string = [];

    // The genre object corresponds to the given media type
    const selectedObject: Record<string,number> = mediaType === MediaType.Film ? FilmGenres : TvGenres;

    const genreIds = genres ? genres : Object.values(selectedObject);

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

}
