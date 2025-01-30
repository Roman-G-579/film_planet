import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-ratings-card',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './ratings-card.component.html',
  styleUrl: './ratings-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingsCardComponent {
  voteAverage: InputSignal<number> = input(0);
  voteCount: InputSignal<number> = input(0);
}
