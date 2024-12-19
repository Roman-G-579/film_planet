import {ChangeDetectionStrategy, Component, EventEmitter, inject, input, InputSignal, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {IftaLabelModule} from "primeng/iftalabel";
import {Select} from "primeng/select";
import {SliderModule} from "primeng/slider";
import {FormsModule} from '@angular/forms';
import {LibraryService} from '../../../core/services/library.service';
import {DataUtils} from '../../../core/utils/data.utils';

@Component({
  selector: 'app-titles-filter',
  standalone: true,
  imports: [
    ButtonModule,
    IftaLabelModule,
    Select,
    SliderModule,
    FormsModule
  ],
  templateUrl: './titles-filter.component.html',
  styleUrl: './titles-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitlesFilterComponent {
  protected readonly lib = inject(LibraryService);
  protected readonly dataUtils = DataUtils;

  genres: InputSignal<string[]> = input<string[]>([]);

  selectedGenre: string | undefined;

  years: number[] = this.dataUtils.getYearList();
  selectedYear: number | undefined;

  ratingRangeValues: number[] = [0.0, 10.0];
  @Output() closeDrawer = new EventEmitter<void>();

  clearAllFilters() {
    this.selectedGenre = undefined;
    this.selectedYear = undefined;
    this.ratingRangeValues = [0, 10];
    this.lib.clearAllFilters();
  }

  clearDateFilter() {
    this.selectedYear = undefined;
    this.lib.removeDateFilter();
  }

  clearGenreFilter() {
    this.selectedGenre = undefined;
    this.lib.removeGenreFilter();
  }

  onCloseDrawer() {
    this.closeDrawer.emit();
  }

  applyFilters() {
    this.onCloseDrawer();
    this.lib.applyFilters(
      this.selectedYear,
      this.selectedGenre,
      this.ratingRangeValues[0],
      this.ratingRangeValues[1]);
  }
}
