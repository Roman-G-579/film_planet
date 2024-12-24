import {
  ChangeDetectionStrategy,
  Component,
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
import {DatePipe, DecimalPipe} from '@angular/common';
import {Drawer} from 'primeng/drawer';
import {TitlesFilterComponent} from './titles-filter/titles-filter.component';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {SkeletonModule} from 'primeng/skeleton';
import {TopTitlesTableSkeletonComponent} from './top-titles-table-skeleton/top-titles-table-skeleton.component';

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
  ],
  templateUrl: './top-titles.component.html',
  styleUrl: './top-titles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitlesComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;

  topDrawerVisible: boolean = false;

  libraryItems: WritableSignal<LibraryItem[]> = this.lib.libraryItems;
  titleText: WritableSignal<string> = signal("");

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);

  genres: WritableSignal<string[]> = signal([]);

  isLoading = this.lib.isLoading;

  // The Page of the items list, used by the API
  currentPage: number = 1;

  ngOnInit() {
    this.lib.clearAllFilters();
    this.currentPage = 1;
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
    // let pageNum = $event.rows;
    // console.log(pageNum);
    this.currentPage += 1;
    console.log(this.currentPage);
    this.lib.getItemListFromApi(this.selectedMediaType(),'top',undefined,this.currentPage);
  }
}
