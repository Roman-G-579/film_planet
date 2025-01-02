import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ModelSignal,
  WritableSignal
} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {LibraryService} from '../../../core/services/library.service';
import {Router, RouterLink} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {DecimalPipe, NgClass, NgForOf} from '@angular/common';
import {GenreNamesPipe} from '../../../core/pipes/genre-names.pipe';
import {ItemUrlPipePipe} from '../../../core/pipes/item-url-pipe.pipe';
import {PosterUrlPipePipe} from '../../../core/pipes/poster-url-pipe.pipe';
import {LibraryItem} from '../../../core/interfaces/library-item.interface';

@Component({
  selector: 'app-search-window',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RouterLink,
    DataViewModule,
    DecimalPipe,
    GenreNamesPipe,
    ItemUrlPipePipe,
    NgForOf,
    PosterUrlPipePipe,
    NgClass
  ],
  templateUrl: './search-window.component.html',
  styleUrl: './search-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWindowComponent {
  protected readonly lib = inject(LibraryService);
  private readonly router = inject(Router);

  isSearchVisible: ModelSignal<boolean> = model<boolean>(false);

  searchResults: WritableSignal<LibraryItem[]> = this.lib.libraryItems;

  searchItem(query: string) {
    // Clears the list of search results
    this.searchResults.set([]);

    this.lib.getSearchResultsFromApi(query);
  }
}
