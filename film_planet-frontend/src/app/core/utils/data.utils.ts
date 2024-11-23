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
    console.log(mediaType)
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
}
