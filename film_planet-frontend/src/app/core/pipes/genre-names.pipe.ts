import {Pipe, PipeTransform} from '@angular/core';
import {FilmGenres} from '../constants/film-genres.record';
import {TvGenres} from '../constants/tv-genres.record';

@Pipe({
  name: 'genreNames',
  standalone: true
})
/**
 * Transforms genre id's into their respective names
 */
export class GenreNamesPipe implements PipeTransform {

  // Combines both genre records into a single object
  private readonly allGenres = {...FilmGenres, ...TvGenres};

  transform(genreIds: number[]): string {
    return genreIds
      .map((id) => Object.keys(this.allGenres).find((key) => this.allGenres[key] === id) || '')
      .filter((name) => name)
      .join(', ');
  }

}
