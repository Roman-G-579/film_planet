import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataUtils} from '../../core/utils/data.utils';
import {MediaType} from '../../core/enums/media-type.enum';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresComponent implements OnInit {
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;

  genres: string[] = [];
  titleText: string = '';

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data['type'] === 'films') {
        this.genres = this.dataUtils.getGenreNamesFromIds(MediaType.Film);
        this.titleText = "Film Genres:"
      }
      else if (data['type'] === 'tv') {
        this.genres = this.dataUtils.getGenreNamesFromIds(MediaType.TV);
        this.titleText = "TV Genres:"
      }
    });
  }
}
