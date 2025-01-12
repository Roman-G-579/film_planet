import { Pipe, PipeTransform } from '@angular/core';
import {ItemCredit} from '../interfaces/item-credit.interface';

@Pipe({
  name: 'itemCreditUrl',
  standalone: true
})

/**
 * Takes an ItemCredit's details and creates a link based on the item's
 * id and name
 */
export class ItemCreditUrlPipe implements PipeTransform {

  transform(credit: ItemCredit): string[] {
    const itemName = credit.title || credit.name || '';
    const pageName = `${credit.id}-${itemName
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-')}`;

    return ['/', 'pages', credit.media_type || 'film', pageName]
  }

}
