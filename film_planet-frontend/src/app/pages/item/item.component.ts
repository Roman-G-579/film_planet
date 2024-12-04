import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';
import {LibraryService} from '../../core/services/library.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';
import {DataUtils} from '../../core/utils/data.utils';
import {ButtonModule} from 'primeng/button';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    NgTemplateOutlet,
    NgIf
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
    starring: []
  });
  itemGenres: WritableSignal<string[]> = signal<string[]>([]);
  releaseYear: WritableSignal<number> = signal<number>(0);
  endYear: WritableSignal<number | undefined> = signal<number | undefined>(undefined);
  episodes: WritableSignal<string[] | undefined> = signal<string[] | undefined>(undefined);
  reviews: WritableSignal<string[]> = signal<string[]>([])

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const itemName = params.get('item') || '';

      this.setParams(itemName);
    });
  }

  /**
   * Sets relevant parameters using the item's metadata
   * @param itemName the name of the item TODO: change to id
   */
  setParams(itemName: string) {
    const retrievedItem = this.lib.retrieveItemByName(itemName);

    if (retrievedItem) {
      this.item.set(retrievedItem);
      this.itemGenres.set(this.dataUtils.getGenreNamesFromIds(retrievedItem.mediaType, retrievedItem.genres));

      this.releaseYear.set(this.dataUtils.getYearFromDate(retrievedItem.releaseDate));
      if (retrievedItem.endYear) {
        this.endYear.set(this.dataUtils.getYearFromDate(retrievedItem.endYear));
      }
    }
  }

}
