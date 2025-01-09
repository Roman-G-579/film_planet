import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';
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
import {DetailsService} from '../../core/services/details.service';
import {CastPanelComponent} from './cast-panel/cast-panel.component';
import {PersonUrlPipe} from '../../core/pipes/person-url.pipe';

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
    CastPanelComponent,
    PersonUrlPipe,
    PersonUrlPipe,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  protected readonly det = inject(DetailsService);
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;
  protected readonly MediaType = MediaType;
  protected readonly ItemStatus = ItemStatus;

  item: WritableSignal<LibraryItem> = this.det.item;

  credits: WritableSignal<Credits> = this.det.credits;
  mainCast: WritableSignal<CastCrewMember[]> = this.det.mainCast;
  directorsAndCreators: WritableSignal<CastCrewMember[]> = this.det.directorsAndCreators;
  originalWriters: WritableSignal<CastCrewMember[]> = this.det.originalWriters;

  reviews: WritableSignal<Review[]> = signal<Review[]>([])

  isLoading: WritableSignal<boolean> = this.det.isLoading;

  currentDate: WritableSignal<string> = signal<string>('');

  ngOnInit() {
    this.isLoading.set(true);
    this.route.paramMap.subscribe(params => {
      // Extracts the full item name from the url (id + title)
      const pageSegment = params.get('item') || '';
      const mediaType: MediaType = (params.get('media-type') === 'film' ? MediaType.Film : MediaType.TV);

      const id = this.dataUtils.getIdFromUrlSegment(pageSegment);
      this.setItemData(mediaType, id);
    });

    // Sets the current date in a YYY-MM-DD format for date comparisons in the item's relevant fields
    this.currentDate.set(this.dataUtils.formatDate(new Date()));
  }

  /**
   * Sets relevant parameters using the item's metadata
   * @param id the id of the item
   * @param mediaType film or TV show
   */
  setItemData(mediaType: MediaType, id: number) {
    this.det.getItemFromApi(mediaType, id);

    this.reviews.set(this.det.getReviewsByItemId(id));
  }

}
