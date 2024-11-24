import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {TopTitlesService} from './top-titles.service';
import {IftaLabelModule} from 'primeng/iftalabel';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {MediaType} from '../../core/enums/media-type.enum';
import {CalendarModule} from 'primeng/calendar';
import {DatePickerModule} from 'primeng/datepicker';
import {GenreNamesPipe} from '../../core/pipes/genre-names.pipe';
import {DataUtils} from '../../core/utils/data.utils';
import {ActivatedRoute} from '@angular/router';
import {SliderModule} from 'primeng/slider';

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
    SliderModule
  ],
  templateUrl: './top-titles.component.html',
  styleUrl: './top-titles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitlesComponent implements OnInit {
  protected readonly topService = inject(TopTitlesService);
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;
  protected readonly MediaType = MediaType;

  topTitles: WritableSignal<LibraryItem[]> = this.topService.topTitles;
  resultCriteria: WritableSignal<string> = signal("");

  selectedMediaType: MediaType = MediaType.Film;

  genres: string[] = [];
  selectedGenre: string | undefined;

  minYear: Date | undefined = new Date(new Date().setFullYear(1900));
  maxYear: Date | undefined = new Date();
  selectedYear: Date | undefined;

  rangeValues: number[] = [0.0, 10.0];

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data['type'] === 'films') {
        this.selectedMediaType = MediaType.Film;
        this.resultCriteria.set("Films");
      }
      else if (data['type'] === 'tv') {
        this.selectedMediaType = MediaType.TV;
        this.resultCriteria.set("TV shows");
      }

      this.topService.filterByMediaType(this.selectedMediaType);
      this.genres = this.dataUtils.getGenreNamesFromIds(this.selectedMediaType);
    });
  }

  clearFilters() {
    this.topService.genreFilter = undefined;
    this.topService.yearFilter = undefined;
    this.topService.ratingFilter = [0.0,10];

    if (this.selectedMediaType === MediaType.Film) {
      this.topService.filterByMediaType(MediaType.Film);
    }
    else if (this.selectedMediaType === MediaType.TV) {
      this.topService.filterByMediaType(MediaType.TV);
    }

  }

}
