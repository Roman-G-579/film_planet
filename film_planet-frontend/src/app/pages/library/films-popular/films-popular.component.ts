import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-films-popular',
  standalone: true,
  imports: [],
  templateUrl: './films-popular.component.html',
  styleUrl: './films-popular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsPopularComponent {

}
