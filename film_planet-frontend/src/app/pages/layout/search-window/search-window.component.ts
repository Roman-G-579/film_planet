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
import {RouterLink} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ItemUrlPipe} from '../../../core/pipes/item-url.pipe';
import {ImageUrlPipePipe} from '../../../core/pipes/image-url.pipe';
import {DividerModule} from 'primeng/divider';
import {MediaType} from '../../../core/enums/media-type.enum';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {MiscUtils} from '../../../core/utils/misc.utils';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {Select} from 'primeng/select';
import {MultiSearchItem} from '../../../core/interfaces/multi-search-item.interface';
import {PersonUrlPipe} from '../../../core/pipes/person-url.pipe';

interface MediaOption {
  name: string,
  searchType: (MediaType | undefined)}

@Component({
  selector: 'app-search-window',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    RouterLink,
    DataViewModule,
    ItemUrlPipe,
    NgForOf,
    ImageUrlPipePipe,
    NgClass,
    DividerModule,
    DatePipe,
    NgIf,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    CheckboxModule,
    Select,
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

  searchResults: WritableSignal<MultiSearchItem[]> = this.lib.searchResults;

  // The height of a row in the table (used for the virtualScroll functionality)
  isSmallScreen = computed(() => {
    const screenWidth = this.miscUtils.getScreenWidth();
    return (screenWidth < 1024);
  })

  searchOptions: MediaOption[] = [
    { name: $localize`:@@search.filterAll:All`, searchType: undefined },
    { name: $localize`:@@search.filterFilms:Films`, searchType: MediaType.Film },
    { name: $localize`:@@search.filterTV:TV`, searchType: MediaType.TV },
    { name: $localize`:@@search.filterPeople:People`, searchType: MediaType.Person}
  ];

  selectedOption: MediaOption = this.searchOptions[0];

  ngOnInit(): void {
    // Subscribe to the search subject with debounce logic
    this.searchSubject
      .pipe(
        debounceTime(500), // Wait 500ms after the user stops typing
        distinctUntilChanged(), // Avoid duplicate searches for the same input
        takeUntil(this.destroy$) // Unsubscribe when the component is destroyed
      )
      .subscribe((query) => {
        this.search(query, this.selectedOption.searchType);
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
   * @param mediaType
   */
  search(query: string, mediaType?: MediaType) {
    if (!query) {
      return;
    }

    // Clears the list of search results
    this.searchResults.set([]);
    this.lib.getSearchResultsFromApi(query, mediaType);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
