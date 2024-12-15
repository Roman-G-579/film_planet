import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DataUtils} from '../../core/utils/data.utils';
import {MediaType} from '../../core/enums/media-type.enum';
import {ButtonModule} from 'primeng/button';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FilmGenres} from '../../core/constants/film-genres.record';
import {TvGenres} from '../../core/constants/tv-genres.record';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    ButtonModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresComponent {
  private route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly dataUtils = DataUtils;
  protected readonly FilmGenres = FilmGenres;
  protected readonly TvGenres = TvGenres;

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);

  titleText: WritableSignal<string> = signal<string>('');

  genres$: Observable<string[]> = this.route.data.pipe(
    map(params => this.getGenresAndMediaType(params['type']))
  );

  getGenresAndMediaType(type: string): string[] {
    if (type === 'film') {
      this.selectedMediaType.set(MediaType.Film);
      this.titleText.set('Film Genres:');
      return this.dataUtils.getGenreNamesFromIds(MediaType.Film);
    } else if (type === 'tv') {
      this.selectedMediaType.set(MediaType.TV);
      this.titleText.set('TV Genres:');
      return this.dataUtils.getGenreNamesFromIds(MediaType.TV);
    }
    return [];
  }


}
