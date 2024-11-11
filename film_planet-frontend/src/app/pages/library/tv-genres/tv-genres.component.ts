import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tv-genres',
  standalone: true,
  imports: [],
  templateUrl: './tv-genres.component.html',
  styleUrl: './tv-genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvGenresComponent {

}
