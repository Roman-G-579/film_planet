import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-seach-bar',
  standalone: true,
  imports: [],
  templateUrl: './seach-bar.component.html',
  styleUrl: './seach-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeachBarComponent {

}
