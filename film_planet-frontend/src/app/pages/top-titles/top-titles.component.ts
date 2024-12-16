import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {IftaLabelModule} from 'primeng/iftalabel';
import {Select} from 'primeng/select';
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
import {API_DETAILS} from '../../core/config/api-details';
import {API_IMG_SIZES} from '../../core/config/api-image-sizes';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-top-titles',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    IftaLabelModule,
    Select,
    FormsModule,
    CalendarModule,
    DatePickerModule,
    GenreNamesPipe,
    SliderModule,
    RouterLink,
    ItemUrlPipePipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './top-titles.component.html',
  styleUrl: './top-titles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitlesComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;
  protected readonly MediaType = MediaType;

  libraryItems: WritableSignal<LibraryItem[]> = this.lib.libraryItems;
  titleText: WritableSignal<string> = signal("");

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);

  genres: string[] = [];
  selectedGenre: string | undefined;

  minYear: Date | undefined = new Date(new Date().setFullYear(1900));
  maxYear: Date | undefined = new Date();
  selectedYear: Date | undefined;

  rangeValues: number[] = [0.0, 10.0];

  ngOnInit() {
    this.lib.clearAllFilters();

    this.route.data.subscribe((data) => {
      if (data['type'] === 'film') {
        this.selectedMediaType.set(MediaType.Film);
        this.titleText.set("Films");
      }
      else if (data['type'] === 'tv') {
        this.selectedMediaType.set(MediaType.TV);
        this.titleText.set("TV shows");
      }

      //this.lib.filterByMediaType(this.selectedMediaType());
      //this.lib.getFilteredList();
      this.lib.getItemListFromApi(this.selectedMediaType(),'top');

      this.genres = this.dataUtils.getGenreNamesFromIds(this.selectedMediaType());
    });
  }

  protected readonly API_DETAILS = API_DETAILS;
  protected readonly API_IMG_SIZES = API_IMG_SIZES;
}
