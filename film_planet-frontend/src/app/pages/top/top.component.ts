import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopComponent {

}
