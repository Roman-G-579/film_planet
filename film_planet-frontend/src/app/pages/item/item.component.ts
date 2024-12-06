import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';
import {LibraryService} from '../../core/services/library.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CardModule} from 'primeng/card';
import {DataUtils} from '../../core/utils/data.utils';
import {ButtonModule} from 'primeng/button';
import {NgClass, NgIf} from '@angular/common';
import {Season} from '../../core/interfaces/season.interface';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {FieldsetModule} from 'primeng/fieldset';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';

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
    NgClass
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
    id: 0,
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
  seasons: WritableSignal<Season[]> = signal<Season[]>([]);
  reviews: WritableSignal<string[]> = signal<string[]>([])

  activeTab: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Extracts the full item name from the url (id + title)
      const itemName = params.get('item') || '';

      // Extracts the id part of the full name, before the first hyphen
      const id = +itemName.split('-')[0];
      this.setParams(id);
    });
  }

  /**
   * Sets relevant parameters using the item's metadata
   * @param id the id of the item
   */
  setParams(id: number) {
    const retrievedItem = this.lib.retrieveItemById(id);

    if (retrievedItem) {
      this.item.set(retrievedItem);
      this.itemGenres.set(this.dataUtils.getGenreNamesFromIds(retrievedItem.mediaType, retrievedItem.genres));

      this.releaseYear.set(this.dataUtils.getYearFromDate(retrievedItem.releaseDate));
      if (retrievedItem.endYear) {
        this.endYear.set(this.dataUtils.getYearFromDate(retrievedItem.endYear));
      }

      if (retrievedItem.mediaType === MediaType.TV) {
        this.seasons.set(this.lib.getShowSeasons(id));

        for (const idx in this.seasons()) {
          const season = this.seasons()[idx];
          season.episodes = this.lib.getSeasonEpisodes(season.id);
        }


      }
    }
  }

}
