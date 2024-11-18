import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {TopService} from './top.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule
  ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopComponent implements OnInit {
  protected readonly topService = inject(TopService);

  topFilms: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

  ngOnInit() {
    this.topFilms.set(this.topService.getTopOfAllTime());
  }
}
