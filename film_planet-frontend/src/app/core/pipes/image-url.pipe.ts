import { Pipe, PipeTransform } from '@angular/core';
import {API_DETAILS} from '../config/api-details';
import {API_IMG_SIZES} from '../config/api-image-sizes';

@Pipe({
  name: 'ImageUrlPipe',
  standalone: true
})

/**
 * Takes the last section of a film / TV show's poster's URL,
 * or a person's profile path, and transforms it
 * to a full URL for the poster image or person photo
 *
 * @imagePath: the final part of the image URL
 * @size (optional) the image width level (0-6, default 3):
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
export class ImageUrlPipePipe implements PipeTransform {

  transform(imagePath: string | undefined | null, size?: number): string {
    if (!imagePath) {
      return '';
    }

    const imgSize: number = (size && size >= 0 && size <= 6)  ? size : 3;

    return `${API_DETAILS.base_url}${API_IMG_SIZES.poster_sizes[imgSize]}/${imagePath}`;
  }

}
