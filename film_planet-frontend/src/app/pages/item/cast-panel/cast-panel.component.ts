import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {CarouselModule, CarouselResponsiveOptions} from 'primeng/carousel';
import {CastCrewMember} from '../../../core/interfaces/cast-crew-member.interface';
import {ImageUrlPipePipe} from '../../../core/pipes/image-url.pipe';
import {Credits} from '../../../core/interfaces/credits.interface';
import {RouterLink} from '@angular/router';
import {PersonUrlPipe} from '../../../core/pipes/person-url.pipe';

@Component({
  selector: 'app-cast-panel',
  standalone: true,
  imports: [
    CarouselModule,
    ImageUrlPipePipe,
    RouterLink,
    PersonUrlPipe
  ],
  templateUrl: './cast-panel.component.html',
  styleUrl: './cast-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastPanelComponent {

  credits: InputSignal<Credits> = input<Credits>({
    id: 0,
    cast: [],
    crew: []
  })

  actors: InputSignal<CastCrewMember[]> = input<CastCrewMember[]>([]);

  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '2100px',
      numVisible: 8,
      numScroll: 4,
    },
    {
      breakpoint: '1800px',
      numVisible: 7,
      numScroll: 3,
    },
    {
      breakpoint: '1400px',
      numVisible: 5,
      numScroll: 3,
    },
    {
      breakpoint: '1199px',
      numVisible: 5,
      numScroll: 3,
    },
    {
      breakpoint: '767px',
      numVisible: 4,
      numScroll: 2,
    },
    {
      breakpoint: '575px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '400px',
      numVisible: 2,
      numScroll: 2,
    },
  ];
}
