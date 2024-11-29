import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  libraryItem: WritableSignal<LibraryItem> = signal<LibraryItem>({
    mediaType: MediaType.Film,
    title: "",
    releaseDate: new Date(),
    duration: 0,
    genres:[],
    starring: [],
    directors:[],
    creators: [],
    image: "",
    rating: 0
  });
}
