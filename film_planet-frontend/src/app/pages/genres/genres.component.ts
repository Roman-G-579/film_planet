import {ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataUtils} from '../../core/utils/data.utils';
import {MediaType} from '../../core/enums/media-type.enum';
import {ButtonModule} from 'primeng/button';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    ButtonModule,
    AsyncPipe
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresComponent {
  private route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly dataUtils = DataUtils;

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);

  titleText = computed(() =>
    this.route.snapshot.data['type'] == 'film' ? 'Film Genres:' : 'TV Genres:'
  )

  genres$: Observable<string[]> = this.route.data.pipe(
    map(params => this.getGenres(params['type']))
  );

  getGenres(type: string): string[] {
    if (type === 'film') {
      this.selectedMediaType.set(MediaType.Film);
      return this.dataUtils.getGenreNamesFromIds(MediaType.Film);
    } else if (type === 'tv') {
      this.selectedMediaType.set(MediaType.TV);
      return this.dataUtils.getGenreNamesFromIds(MediaType.TV);
    }
    return [];
  }

  /**
   * Navigates to the specified genre page
   * @param genre the selected genre
   */
  navigate(genre: string) {
    const genreId = this.dataUtils.getGenreIdFromName(genre, this.selectedMediaType());
    this.router.navigate(['pages','library', this.selectedMediaType().toLowerCase(), genreId]).then();
  }
}
