import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';
import {LibraryService} from '../../core/services/library.service';
import {ActivatedRoute} from '@angular/router';
import {CardModule} from 'primeng/card';
import {DataUtils} from '../../core/utils/data.utils';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  protected readonly dataUtils = DataUtils;
  private route = inject(ActivatedRoute);
  protected readonly MediaType = MediaType;

  item: WritableSignal<LibraryItem> = signal<LibraryItem>({
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
  itemGenres: WritableSignal<string[]> = signal<string[]>([]);

  selectedMediaType: string = '';
  selectedItem: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const itemName = params.get('item') || '';
      const retrievedItem = this.lib.getItemByName(itemName);

      if (retrievedItem) {
        this.item.set(retrievedItem);

        let genreArray = [];
        for (let genre of retrievedItem.genres) {
         genreArray.push(this.dataUtils.getGenreNameFromId(genre, retrievedItem.mediaType));
        }
        this.itemGenres.set(genreArray);
      }
    })

  }

}