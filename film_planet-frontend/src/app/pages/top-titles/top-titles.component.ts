import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {TopTitlesService} from './top-titles.service';

@Component({
  selector: 'app-top-titles',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule
  ],
  templateUrl: './top-titles.component.html',
  styleUrl: './top-titles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitlesComponent implements OnInit {
  protected readonly topService = inject(TopTitlesService);

  topFilms: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  ngOnInit() {
    this.topFilms.set(this.topService.getTopOfAllTime());
  }
}
