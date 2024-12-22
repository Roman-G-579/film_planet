import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';
import {LibraryService} from '../../core/services/library.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DatePipe, DecimalPipe, NgClass, NgIf} from '@angular/common';
import {Season} from '../../core/interfaces/season.interface';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {FieldsetModule} from 'primeng/fieldset';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {PanelModule} from 'primeng/panel';
import {Review} from '../../core/interfaces/review.interface';
import {MinutesToHoursPipe} from '../../core/pipes/minutes-to-hours.pipe';
import {Credits} from '../../core/interfaces/credits.interface';
import {CastCrewMember} from '../../core/interfaces/cast-crew-member.interface';
import {Genre} from '../../core/interfaces/genre.interface';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    NgIf,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    FieldsetModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    NgClass,
    PanelModule,
    DatePipe,
    MinutesToHoursPipe,
    DecimalPipe,
    PosterUrlPipePipe,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  private route = inject(ActivatedRoute);
  protected readonly MediaType = MediaType;

  item: WritableSignal<LibraryItem> = this.lib.item;

  credits: WritableSignal<Credits> = this.lib.credits;
  mainCast: WritableSignal<CastCrewMember[]> = this.lib.mainCast;
  directorsAndCreators: WritableSignal<CastCrewMember[]> = this.lib.directorsAndCreators;

  itemGenres: WritableSignal<Genre[]> = signal<Genre[]>([]);
  endYear: WritableSignal<string | undefined> = signal<string | undefined>(undefined);
  seasons: WritableSignal<Season[]> = signal<Season[]>([]);
  reviews: WritableSignal<Review[]> = signal<Review[]>([])

  // The currently expanded tab of the seasons list
  activeSeason: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Extracts the full item name from the url (id + title)
      const itemName = params.get('item') || '';
      const mediaType: MediaType = (params.get('media-type') === 'film' ? MediaType.Film : MediaType.TV);

      // Extracts the id part of the full name, before the first hyphen
      const id = +itemName.split('-')[0];
      this.setParams(mediaType, id);
    });
  }

  /**
   * Sets relevant parameters using the item's metadata
   * @param id the id of the item
   * @param mediaType film or TV show
   */
  setParams(mediaType: MediaType, id: number) {
    this.lib.getItemFromApi(mediaType, id);

    this.itemGenres.set(this.item().genres);

    this.reviews.set(this.lib.getReviewsByItemId(id));

    if (this.item().mediaType === MediaType.TV) {
      this.seasons.set(this.lib.getShowSeasons(id));

      for (const idx in this.seasons()) {
        const season = this.seasons()[idx];
        season.episodes = this.lib.getSeasonEpisodes(season.id);
      }
    }
  }
}
