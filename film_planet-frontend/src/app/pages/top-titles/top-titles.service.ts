import {Injectable, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import { LIBRARY_ITEMS } from '../../core/mock-data/library-items';
import {MediaType} from '../../core/enums/media-type.enum';

@Injectable({
  providedIn: 'root',
})
export class TopTitlesService {
  resultCriteria: WritableSignal<string> = signal("");

  filterByMediaType(type: MediaType) {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == type});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  //TODO: add filtering if existing filter is already applied
  filterByYear(items: LibraryItem[], year: number) {
    const filteredItems: LibraryItem[] = items.filter((item) => { return item.year == year });
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopFilmsByYear(year: number): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.year == year});
    this.resultCriteria.set(`Films of ${year}`);
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopTvByYear(year: number): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.year == year});
    this.resultCriteria.set(`TV shows of ${year}`);
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopFilmsOfAllTime(): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == MediaType.Film});
    this.resultCriteria.set("Films of All Time");
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopTvOfAllTime(): LibraryItem[] {
    const filteredItems: LibraryItem[] = LIBRARY_ITEMS.filter((item) => {return item.mediaType == MediaType.TV});
    this.resultCriteria.set("TV shows of All Time");
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }


}
