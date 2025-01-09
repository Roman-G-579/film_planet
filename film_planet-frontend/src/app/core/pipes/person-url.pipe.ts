import { Pipe, PipeTransform } from '@angular/core';
import {CastCrewMember} from '../interfaces/cast-crew-member.interface';

@Pipe({
  name: 'personUrl',
  standalone: true
})

/**
 * Takes a person's details and creates a link based on the
 * person's id and name
 */
export class PersonUrlPipe implements PipeTransform {

  transform(person: CastCrewMember): string[] {
    const personName = person.name || '';
    const pageName = `${person.id}-${personName
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-')}`;

    return ['/', 'pages', 'person', pageName];
  }

}
