import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak',
  standalone: true
})
/**
 * Replaces existing /n symbols in the string with line breaks ( <br> )
 */
export class LineBreakPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '';
    }

    return value.replace(/\n/g, '<br>');
  }

}
