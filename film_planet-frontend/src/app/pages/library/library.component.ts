import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent {

}
