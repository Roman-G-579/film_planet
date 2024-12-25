import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {IftaLabelModule} from 'primeng/iftalabel';
import {FormsModule} from '@angular/forms';
import {MediaType} from '../../core/enums/media-type.enum';
import {CalendarModule} from 'primeng/calendar';
import {DatePickerModule} from 'primeng/datepicker';
import {GenreNamesPipe} from '../../core/pipes/genre-names.pipe';
import {DataUtils} from '../../core/utils/data.utils';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {SliderModule} from 'primeng/slider';
import {LibraryService} from '../../core/services/library.service';
import {ItemUrlPipePipe} from '../../core/pipes/item-url-pipe.pipe';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {Drawer} from 'primeng/drawer';
import {TitlesFilterComponent} from './titles-filter/titles-filter.component';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {SkeletonModule} from 'primeng/skeleton';
import {TopTitlesTableSkeletonComponent} from './top-titles-table-skeleton/top-titles-table-skeleton.component';
import {MiscUtils} from '../../core/utils/misc.utils';

@Component({
  selector: 'app-top-titles',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    IftaLabelModule,
    FormsModule,
    CalendarModule,
    DatePickerModule,
    GenreNamesPipe,
    SliderModule,
    RouterLink,
    ItemUrlPipePipe,
    DatePipe,
    DecimalPipe,
    Drawer,
    TitlesFilterComponent,
    PosterUrlPipePipe,
    SkeletonModule,
    TopTitlesTableSkeletonComponent,
    NgIf,
  ],
  templateUrl: './top-titles.component.html',
  styleUrl: './top-titles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitlesComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;
  protected readonly miscUtils = MiscUtils;

  topDrawerVisible: boolean = false;

  libraryItems: WritableSignal<LibraryItem[]> = this.lib.libraryItems;
  titleText: WritableSignal<string> = signal("");

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);

  genres: WritableSignal<string[]> = signal([]);

  isLoading = this.lib.isLoading;

  // The height of a row in the table (used for the virtualScroll functionality)
  scrollItemSize = computed(() => {
    const screenWidth = this.miscUtils.getScreenWidth();
    return (screenWidth >= 1024) ? 175 : 600;
  })

  // The Page of the items list, used by the API
  private loadedPages = new Set<number>();

  ngOnInit() {
    this.lib.clearAllFilters();
    this.lib.libraryItems.set([]);
    //this.isLoading.set(true);

    this.route.data.subscribe((data) => {
      if (data['type'] === 'film') {
        this.selectedMediaType.set(MediaType.Film);
        this.titleText.set("Films");
      }
      else if (data['type'] === 'tv') {
        this.selectedMediaType.set(MediaType.TV);
        this.titleText.set("TV shows");
      }

      this.lib.getItemListFromApi(this.selectedMediaType(),'top');

      this.genres.set(this.dataUtils.getGenreNamesFromIds(this.selectedMediaType()));
    });
  }

  loadItemsLazy($event: TableLazyLoadEvent) {
    const pageSize = $event.rows || 20; // Number of items to load
    const pageIndex = (($event.first || 0) / pageSize) + 1; // Calculate the page index

    //console.log('Lazy load event triggered:', $event);
    //console.log('Loaded pages:', Array.from(this.loadedPages));
    if (this.libraryItems().length >= 100) {
      //console.log('100 items loaded');
      return;
    }
    if (this.loadedPages.has(pageIndex)) {
      //console.log(`Page ${pageIndex} already loaded`);
      return;
    }
    //console.log($event);
    this.loadedPages.add(pageIndex);
    //this.isLoading.set(true);
    this.lib.getItemListFromApi(this.selectedMediaType(),'top',undefined,pageIndex + 1);
  }

}
