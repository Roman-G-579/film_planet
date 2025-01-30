import { Pipe, PipeTransform } from '@angular/core';
import {API_DETAILS} from '../config/api-details';
import {API_IMG_SIZES} from '../config/api-image-sizes';

@Pipe({
  name: 'posterUrl',
  standalone: true
})

/**
 * Takes the last section of a film / TV show's poster's URL
 * and transforms it to a full URL for the poster image
 *
 * @posterPath: the final part of the poster URL
 * @size (optional) the poster width level (0-6, default 3):
 *
 * 0: 92px
 *
 * 1: 154px
 *
 * 2: 185px
 *
 * 3: 342px
 *
 * 4: 500px
 *
 * 5: 780px
 *
 * 6: original
 */
export class PosterUrlPipePipe implements PipeTransform {

  transform(posterPath: string | undefined | null, size?: number): string {
    if (!posterPath) {
      return '';
    }

    const posterSize: number = (size && size >= 0 && size <= 6)  ? size : 3;

    return `${API_DETAILS.base_url}${API_IMG_SIZES.poster_sizes[posterSize]}/${posterPath}`;
  }

}
