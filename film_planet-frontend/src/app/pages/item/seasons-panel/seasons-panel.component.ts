import {ChangeDetectionStrategy, Component, inject, input, InputSignal, WritableSignal} from '@angular/core';
import {Accordion} from "primeng/accordion";
import {DatePipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {FieldsetModule} from "primeng/fieldset";
import {PosterUrlPipePipe} from "../../../core/pipes/poster-url-pipe.pipe";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {LibraryItem} from '../../../core/interfaces/library-item.interface';
import {LibraryService} from '../../../core/services/library.service';
import {MediaType} from '../../../core/enums/media-type.enum';
import {EpisodesPanelComponent} from '../episodes-panel/episodes-panel.component';

@Component({
  selector: 'app-seasons-panel',
  standalone: true,
  imports: [
    Accordion,
    DatePipe,
    DecimalPipe,
    FieldsetModule,
    NgIf,
    PosterUrlPipePipe,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    NgClass,
    EpisodesPanelComponent
  ],
  templateUrl: './seasons-panel.component.html',
  styleUrl: './seasons-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonsPanelComponent {
  protected readonly lib = inject(LibraryService);

  item: InputSignal<LibraryItem> = input<LibraryItem>({
    id: 0,
    mediaType: MediaType.TV,
    genres: []
  });
  currentDate: InputSignal<string> = input<string>('');

  loadingSeasonDetails: WritableSignal<boolean> = this.lib.loadingSeasonDetails;

  // The currently expanded tab of the seasons list
  activeSeason: number = 0;

  collapsedStates: { [season_number: number]: boolean } = {};

  showSeasonDetails(series_id: number, season_number: number) {
    this.loadingSeasonDetails.set(true);
    const isCollapsed = this.collapsedStates[season_number] ?? true;

    this.collapsedStates[season_number] = !isCollapsed;

    if (isCollapsed) {
      this.lib.getSeasonDetails(series_id, season_number);
    }
  }
}
