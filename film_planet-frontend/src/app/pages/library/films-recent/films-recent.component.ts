import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-films-recent',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule
  ],
  templateUrl: './films-recent.component.html',
  styleUrl: './films-recent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsRecentComponent {

}
