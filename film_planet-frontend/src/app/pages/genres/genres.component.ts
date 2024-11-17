import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresComponent {

  genres: string[] = [
    "Action",
    "Adventure",
    "Biopic",
    "Comedy",
    "Crime",
    "Drama",
    "Horror",
    "Musical",
    "Romance",
    "Sfi-Fi",
    "Sports",
    "Thriller"
  ]
}
