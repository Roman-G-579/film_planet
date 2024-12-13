import {FilmGenres} from '../constants/film-genres.record';
import {MediaType} from '../enums/media-type.enum';
import {TvGenres} from '../constants/tv-genres.record';
import {LibraryItem} from '../interfaces/library-item.interface';

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
   * Converts a date object to a year
   * If the date is already a number, returns it as is
   * @param date the given date object or number
   */
  static getYearFromDate(date: string): string {
    const dateParts = date.split('-');
    return dateParts[0];
  }

  /**
   * Takes a library item's details and creates a link based on them
   * @param item the library items, containing the film or TV show's relevant metadata
   * @returns URL based on the given data
   */
  static generateItemLink(item: LibraryItem): string[] {
    // const itemName = `${item.id}-${item.title
    //   .toLowerCase() // Convert to lowercase
    //   .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    //   .replace(/\s+/g, '-')}`;
    //
    // return ['/', 'pages', item.mediaType.toLowerCase(), itemName];
    return [];
  }

  /**
   * Converts a JSON object of a library item to a LibraryItem object
   * @param data the JSON object (cast to LibraryItem)
   * @returns the item in LibraryItem form
   */
  static convertToLibraryItem(data: LibraryItem): LibraryItem {
    const item: LibraryItem = {
      id: data.id,
      title: data.title,
      mediaType: data.mediaType,
      release_date: data.release_date,
      genre_ids: data.genre_ids
    }

    return item;
  }

}
