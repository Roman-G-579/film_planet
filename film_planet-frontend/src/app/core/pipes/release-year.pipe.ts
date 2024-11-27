import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseYear',
  standalone: true
})
export class ReleaseYearPipe implements PipeTransform {

  transform(value: number | Date): number {
    if (value instanceof Date) {
      return value.getFullYear();
    }
    return value;
  }

}
