import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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

  selectedMediaType: string = '';
  // type$: Observable<string> = this.route.data.pipe(
  //   map(params => params['type'])
  // );
  genres$: Observable<string[]> = this.route.data.pipe(
    map(params => this.getGenres(params['type']))
  );

  titleText$: Observable<string> = this.route.data.pipe(
    map(params => this.getTitleText(params['type']))
  );

  getGenres(type: string): string[] {
    if (type === 'film') {
      this.selectedMediaType = 'film';
      return this.dataUtils.getGenreNamesFromIds(MediaType.Film);
    } else if (type === 'tv') {
      this.selectedMediaType = 'tv';
      return this.dataUtils.getGenreNamesFromIds(MediaType.TV);
    }
    return [];
  }

  getTitleText(type: string): string {
    return type === 'film' ? 'Film Genres:' : type === 'tv' ? 'TV Genres:' : '';
  }

  /**
   * Navigates to the specified route
   * @param route the destination route
   * @param genre media type of the associated routes - tv or film
   */
  navigate(route: string, genre: string) {
    //TODO: make route override existing
    this.router.navigate([route, this.selectedMediaType, genre],  { queryParams: { type: genre } }).then();
  }
}
