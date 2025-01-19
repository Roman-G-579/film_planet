import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {AccordionContent, AccordionHeader, AccordionPanel} from "primeng/accordion";
import {DatePipe, NgIf} from "@angular/common";
import {LineBreakPipe} from "../../../core/pipes/line-break.pipe";
import {MinutesToHoursPipe} from "../../../core/pipes/minutes-to-hours.pipe";
import {PosterUrlPipePipe} from "../../../core/pipes/poster-url-pipe.pipe";
import {Season} from '../../../core/interfaces/season.interface';

@Component({
  selector: 'app-episodes-panel',
  standalone: true,
  imports: [
    AccordionContent,
    AccordionHeader,
    AccordionPanel,
    DatePipe,
    LineBreakPipe,
    MinutesToHoursPipe,
    PosterUrlPipePipe,
    NgIf
  ],
  templateUrl: './episodes-panel.component.html',
  styleUrl: './episodes-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodesPanelComponent {
  season: InputSignal<Season> = input<Season>({
    id: 0,
    name: '',
    season_number: 0,
    episodes: []
  })

  currentDate: InputSignal<string> = input<string>('');

}
