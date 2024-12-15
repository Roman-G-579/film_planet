import { Pipe, PipeTransform } from '@angular/core';
import {LibraryItem} from '../interfaces/library-item.interface';

@Pipe({
  name: 'itemUrl',
  standalone: true
})

/**
 * Takes a libraryItem's details and creates a link based on its
 * id and name
 */
export class ItemUrlPipePipe implements PipeTransform {

  transform(item: LibraryItem): string[] {
    const itemName = `${item.id}-${item.title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-')}`;

    return ['/', 'pages', item.mediaType, itemName];
  }

}
