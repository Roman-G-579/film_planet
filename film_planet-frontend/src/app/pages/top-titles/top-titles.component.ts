import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {TableModule} from 'primeng/table';
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
import {ItemUrlPipe} from '../../core/pipes/item-url.pipe';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {Drawer} from 'primeng/drawer';
import {TitlesFilterComponent} from './titles-filter/titles-filter.component';
import {ImageUrlPipePipe} from '../../core/pipes/image-url.pipe';
import {SkeletonModule} from 'primeng/skeleton';
import {TopTitlesTableSkeletonComponent} from './top-titles-table-skeleton/top-titles-table-skeleton.component';
import {MiscUtils} from '../../core/utils/misc.utils';
import {MenubarModule} from "primeng/menubar";
import {SplitButtonModule} from "primeng/splitbutton";
import {ToggleSwitchModule} from "primeng/toggleswitch";
import {TooltipModule} from "primeng/tooltip";

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
        ItemUrlPipe,
        DatePipe,
        DecimalPipe,
        Drawer,
        TitlesFilterComponent,
        ImageUrlPipePipe,
        SkeletonModule,
        TopTitlesTableSkeletonComponent,
        NgIf,
        MenubarModule,
        SplitButtonModule,
        ToggleSwitchModule,
        TooltipModule,
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

  // Specified whether the filter drawer is open or closed
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

  // The width of the table, adjusted based on the viewport width
  tableWidth = computed(() => {
    const screenWidth = this.miscUtils.getScreenWidth();
    return (screenWidth >= 1024) ? `60rem` : `${screenWidth}px`;
  })

  ngOnInit() {
    this.lib.clearAllFilters();
    this.lib.libraryItems.set([]);
    this.isLoading.set(true);

    this.route.data.subscribe((data) => {
      if (data['type'] === 'film') {
        this.selectedMediaType.set(MediaType.Film);
        const titleStr = $localize `:@@top-titles.filmsString:Films`;
        this.titleText.set(titleStr);
      }
      else if (data['type'] === 'tv') {
        this.selectedMediaType.set(MediaType.TV);
        const titleStr = $localize `:@@top-titles.tvShowsString:TV Shows`;
        this.titleText.set(titleStr);
      }

      this.lib.getItemListFromApi(this.selectedMediaType(),'top');

      this.genres.set(this.dataUtils.getGenreNamesFromIds(this.selectedMediaType()));
    });
  }

}
