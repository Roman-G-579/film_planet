import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  model,
  ModelSignal, OnDestroy, OnInit,
  WritableSignal
} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {LibraryService} from '../../../core/services/library.service';
import {Router, RouterLink} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {GenreNamesPipe} from '../../../core/pipes/genre-names.pipe';
import {ItemUrlPipePipe} from '../../../core/pipes/item-url-pipe.pipe';
import {PosterUrlPipePipe} from '../../../core/pipes/poster-url-pipe.pipe';
import {LibraryItem} from '../../../core/interfaces/library-item.interface';
import {DividerModule} from 'primeng/divider';
import {MediaType} from '../../../core/enums/media-type.enum';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {MiscUtils} from '../../../core/utils/misc.utils';

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
    DatePipe,
    NgIf
  ],
  templateUrl: './search-window.component.html',
  styleUrl: './search-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWindowComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  protected readonly lib = inject(LibraryService);
  protected readonly miscUtils = MiscUtils;
  protected readonly MediaType = MediaType;

  isSearchVisible: ModelSignal<boolean> = model<boolean>(false);

  searchResults: WritableSignal<LibraryItem[]> = this.lib.libraryItems;

  // The height of a row in the table (used for the virtualScroll functionality)
  isSmallScreen = computed(() => {
    const screenWidth = this.miscUtils.getScreenWidth();
    return (screenWidth < 1024);
  })

  ngOnInit(): void {
    // Subscribe to the search subject with debounce logic
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the user stops typing
        distinctUntilChanged(), // Avoid duplicate searches for the same input
        takeUntil(this.destroy$) // Unsubscribe when the component is destroyed
      )
      .subscribe((query) => {
        this.searchItem(query);
      });
  }

  /**
   * Emits changes to the search subject when the search input value changes
   * @param query the text in the input element
   */
  onSearchInputChange(query: string): void {
    this.searchSubject.next(query);
  }

  /**
   * Calls the search function to get new results matching the given query,
   * after clearing the current search results
   * @param query the search string, equal to the text in the input element
   */
  searchItem(query: string) {
    if (!query) {
      return;
    }
    // Clears the list of search results
    this.searchResults.set([]);
    this.lib.getSearchResultsFromApi(query);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
