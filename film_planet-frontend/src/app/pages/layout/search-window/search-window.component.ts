import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ModelSignal, OnInit,
  WritableSignal
} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {LibraryService} from '../../../core/services/library.service';
import {Router, RouterLink} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {DatePipe, DecimalPipe, NgClass, NgForOf} from '@angular/common';
import {GenreNamesPipe} from '../../../core/pipes/genre-names.pipe';
import {ItemUrlPipePipe} from '../../../core/pipes/item-url-pipe.pipe';
import {PosterUrlPipePipe} from '../../../core/pipes/poster-url-pipe.pipe';
import {LibraryItem} from '../../../core/interfaces/library-item.interface';
import {DividerModule} from 'primeng/divider';
import {MediaType} from '../../../core/enums/media-type.enum';

@Component({
  selector: 'app-search-window',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RouterLink,
    DataViewModule,
    ItemUrlPipePipe,
    NgForOf,
    PosterUrlPipePipe,
    NgClass,
    DividerModule,
    DatePipe
  ],
  templateUrl: './search-window.component.html',
  styleUrl: './search-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWindowComponent {
  protected readonly lib = inject(LibraryService);

  isSearchVisible: ModelSignal<boolean> = model<boolean>(false);

  searchResults: WritableSignal<LibraryItem[]> = this.lib.libraryItems;

  searchItem(query: string) {
    //TODO: handle presses of spaces etc.
    if (!query) {
      return;
    }
    // Clears the list of search results
    this.searchResults.set([]);
    console.log(this.searchResults());
    this.lib.getSearchResultsFromApi(query);
  }

  protected readonly MediaType = MediaType;
}
