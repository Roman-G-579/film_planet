import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  WritableSignal
} from '@angular/core';
import {Accordion} from "primeng/accordion";
import {DatePipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {FieldsetModule} from "primeng/fieldset";
import {PosterUrlPipePipe} from "../../../core/pipes/poster-url-pipe.pipe";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {LibraryItem} from '../../../core/interfaces/library-item.interface';
import {MediaType} from '../../../core/enums/media-type.enum';
import {EpisodesPanelComponent} from '../episodes-panel/episodes-panel.component';
import {DetailsService} from '../../../core/services/details.service';

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
export class SeasonsPanelComponent implements OnInit {
  protected readonly det = inject(DetailsService);

  item: InputSignal<LibraryItem> = input<LibraryItem>({
    id: 0,
    mediaType: MediaType.TV,
    genres: [],
    seasons: []
  });
  currentDate: InputSignal<string> = input<string>('');

  loadingSeasonDetails: WritableSignal<boolean> = this.det.loadingSeasonDetails;

  // The currently expanded tab of the seasons list
  activeSeason: number = 0;

  collapsedStates: { [season_number: number]: boolean } = ({});

  ngOnInit() {
    // Initialize the collapsed states of all seasons to 'true'
    this.item().seasons?.forEach(season => {
      this.collapsedStates[season.season_number] = true;
    });
  }

  showSeasonDetails(series_id: number, season_number: number) {

    if ( this.collapsedStates[season_number] ) {
      this.loadingSeasonDetails.set(true);
    }
    const isCollapsed = this.collapsedStates[season_number] ?? true;

    this.collapsedStates[season_number] = !isCollapsed;

    if (isCollapsed) {
      this.det.getSeasonDetails(series_id, season_number);
    }
  }
}
