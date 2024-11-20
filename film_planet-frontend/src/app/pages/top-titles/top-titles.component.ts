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
    DatePickerModule
  ],
  templateUrl: './top-titles.component.html',
  styleUrl: './top-titles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitlesComponent implements OnInit {
  protected readonly topService = inject(TopTitlesService);

  topTitles: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);
  resultCriteria: WritableSignal<string> = signal("");

  mediaTypes = Object.keys(MediaType).filter((item) => {
    return isNaN(Number(item));
  });
  selectedMediaType: MediaType | undefined;

  minYear: Date | undefined;
  maxYear: Date | undefined;
  selectedYear: Date | undefined;

  ngOnInit() {
    this.topTitles.set(this.topService.getTopFilmsOfAllTime());
    this.resultCriteria.set(this.topService.resultCriteria());

    this.setMinAndMaxYears();
    console.log(this.mediaTypes)
  }

  setMinAndMaxYears() {
    const currentYear = new Date().getFullYear();

    this.minYear = new Date();
    this.minYear.setFullYear(1900);
    this.maxYear = new Date();
    this.maxYear.setFullYear(currentYear);
  }

  filterByMediaType(type: MediaType | undefined) {
    if (type) {
      this.topTitles.set(this.topService.filterByMediaType(type));
    }
  }

  filterByYear(year: Date | undefined) {
    if (year) {
      this.topTitles.set(this.topService.filterByYear(this.topTitles(), year.getFullYear()));
    }
  }

  clearFilter() {
    this.topTitles.set(this.topService.getTopFilmsOfAllTime());
  }
}
