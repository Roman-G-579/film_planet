import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-films-recent',
  standalone: true,
  imports: [],
  templateUrl: './films-recent.component.html',
  styleUrl: './films-recent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsRecentComponent {

}
