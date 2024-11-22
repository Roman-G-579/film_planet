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

  topTitles: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);
  resultCriteria: WritableSignal<string> = signal("");

  selectedMediaType: MediaType = MediaType.Film;

  genres = this.dataUtils.getGenreNamesFromIds(MediaType.Film);
  selectedGenre: string | undefined;

  minYear: Date | undefined;
  maxYear: Date | undefined;
  selectedYear: Date | undefined;

  rangeValues: number[] = [0.0, 10.0];

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data['type'] === 'films') {
        this.topTitles.set(this.topService.getTopFilmsOfAllTime());
        this.resultCriteria.set("Top 100 Films");
      }
      else if (data['type'] === 'tv') {
        this.topTitles.set(this.topService.getTopTvOfAllTime());
        this.resultCriteria.set("Top 100 TV shows");
        this.selectedMediaType = MediaType.TV;
      }
    });

    this.setMinAndMaxYears();
  }

  setMinAndMaxYears() {
    const currentYear = new Date().getFullYear();

    this.minYear = new Date();
    this.minYear.setFullYear(1900);
    this.maxYear = new Date();
    this.maxYear.setFullYear(currentYear);
  }

  filterByYear(year: Date | undefined) {
    if (year) {
      this.topTitles.set(this.topService.filterByYear(year.getFullYear(), this.selectedMediaType));
    }
  }

  filterByGenre(genre: string | undefined) {
    if (genre) {
      this.topTitles.set(this.topService.filterByGenre(genre, this.selectedMediaType));
    }
  }

  filterByRating(minRating: number, maxRating: number) {
    this.topTitles.set(this.topService.filterByRating(minRating, maxRating, this.selectedMediaType));
  }
  removeGenreFilter() {

  }

  removeYearFilter() {

  }

  removeRatingFilter() {

  }

  clearFilters() {
    if (this.selectedMediaType === MediaType.Film) {
      this.topTitles.set(this.topService.getTopFilmsOfAllTime());
    }
    else if (this.selectedMediaType === MediaType.TV) {
      this.topTitles.set(this.topService.getTopTvOfAllTime());
    }
    this.selectedYear = undefined;
    this.selectedGenre = undefined;
  }

  protected readonly MediaType = MediaType;
}
