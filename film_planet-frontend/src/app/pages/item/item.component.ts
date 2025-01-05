import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';
import {LibraryService} from '../../core/services/library.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {FieldsetModule} from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {Review} from '../../core/interfaces/review.interface';
import {Credits} from '../../core/interfaces/credits.interface';
import {CastCrewMember} from '../../core/interfaces/cast-crew-member.interface';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {SkeletonModule} from 'primeng/skeleton';
import {ItemSkeletonComponent} from './item-skeleton/item-skeleton.component';
import {ItemStatus} from '../../core/enums/item-status.enum';
import {SeasonsPanelComponent} from './seasons-panel/seasons-panel.component';
import {DataUtils} from '../../core/utils/data.utils';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    NgIf,
    FieldsetModule,
    PanelModule,
    DatePipe,
    DecimalPipe,
    PosterUrlPipePipe,
    SkeletonModule,
    ItemSkeletonComponent,
    SeasonsPanelComponent,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;
  protected readonly MediaType = MediaType;
  protected readonly ItemStatus = ItemStatus;

  item: WritableSignal<LibraryItem> = this.lib.item;

  credits: WritableSignal<Credits> = this.lib.credits;
  mainCast: WritableSignal<CastCrewMember[]> = this.lib.mainCast;
  directorsAndCreators: WritableSignal<CastCrewMember[]> = this.lib.directorsAndCreators;
  originalWriters: WritableSignal<CastCrewMember[]> = this.lib.originalWriters;

  reviews: WritableSignal<Review[]> = signal<Review[]>([])

  isLoading: WritableSignal<boolean> = this.lib.isLoading;

  currentDate: WritableSignal<string> = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Extracts the full item name from the url (id + title)
      const itemName = params.get('item') || '';
      const mediaType: MediaType = (params.get('media-type') === 'film' ? MediaType.Film : MediaType.TV);

      // Extracts the id part of the full name, before the first hyphen
      const id = +itemName.split('-')[0];
      this.setParams(mediaType, id);
    });

    // Sets the current date in a YYY-MM-DD format for date comparisons in the item's relevant fields
    this.currentDate.set(this.dataUtils.formatDate(new Date()));
  }

  /**
   * Sets relevant parameters using the item's metadata
   * @param id the id of the item
   * @param mediaType film or TV show
   */
  setParams(mediaType: MediaType, id: number) {
    this.lib.getItemFromApi(mediaType, id);

    this.reviews.set(this.lib.getReviewsByItemId(id));
  }

}
