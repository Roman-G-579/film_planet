import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  OnInit, Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CarouselModule, CarouselResponsiveOptions} from "primeng/carousel";
import {DataViewModule} from "primeng/dataview";
import {NgForOf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {SkeletonModule} from "primeng/skeleton";
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {LibraryService} from '../../core/services/library.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {GenreNamesPipe} from '../../core/pipes/genre-names.pipe';
import {MediaType} from '../../core/enums/media-type.enum';
import {DataUtils} from '../../core/utils/data.utils';
import {ItemUrlPipe} from '../../core/pipes/item-url.pipe';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {LibraryTableSkeletonComponent} from './library-table-skeleton/library-table-skeleton.component';
import {LibraryCarouselSkeletonComponent} from './library-carousel-skeleton/library-carousel-skeleton.component';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {Genre} from '../../core/interfaces/genre.interface';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    ButtonModule,
    CarouselModule,
    DataViewModule,
    NgForOf,
    SharedModule,
    SkeletonModule,
    GenreNamesPipe,
    RouterLink,
    ItemUrlPipe,
    PosterUrlPipePipe,
    LibraryTableSkeletonComponent,
    LibraryCarouselSkeletonComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  protected readonly dataUtils = DataUtils;
  private route = inject(ActivatedRoute);

  libraryItems: WritableSignal<LibraryItem[]> = this.lib.libraryItems;

  categoryText: WritableSignal<string> = signal("");
  mediaTypeText: WritableSignal<string> = signal("");

  // Stores a genre's name and TMDB id if the page has been accessed by selecting a specific genre
  genre: WritableSignal<Genre> = signal({id: '', name: ''});

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);
  // Items appearing on the carousel at the top-titles of the page
  carouselItems: Signal<LibraryItem[]> = computed<LibraryItem[]>(() => this.libraryItems().slice(0,5));

  // Items appearing on the table below the carousel
  tableItems: Signal<LibraryItem[]> = computed<LibraryItem[]>(() => this.libraryItems().slice(5));

  isLoading = this.lib.isLoading;

  // The number of the next page of TMDB items that will be retrieved
  nextPage: number = 2;


  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit() {
    this.lib.clearAllFilters();
    this.libraryItems.set([]);
    this.isLoading.set(true);

    this.route.data.subscribe((data) => {
      // Selecting media type for current page
      if (data['type'] === 'film') {
        this.selectedMediaType.set(MediaType.Film);
        this.mediaTypeText.set("Films");
      }
      else if (data['type'] === 'tv') {
        this.selectedMediaType.set(MediaType.TV);
        this.mediaTypeText.set("TV shows");
      }


      // Selecting category of current page
      if(data['category'] === 'recent') {
        this.lib.getItemListFromApi(this.selectedMediaType(), 'recent');
        this.categoryText.set("Recent");
      }
      else if (data['category'] === 'popular') {
        this.lib.getItemListFromApi(this.selectedMediaType(), 'popular');
        this.categoryText.set("Popular");
      }
      else if (data['category'] === 'genre') {
        this.setGenreParams();

        // Filters the library items based on the given genre
        this.lib.getItemListFromApi(this.selectedMediaType(), 'genre', this.genre().id);
      }

    });

  }

  /**
   * Saves the parameters of the selected genre for later use
   */
  setGenreParams() {
    this.route.paramMap.subscribe((params) => {
      const genreId = params.get('genre') || '';
      const genreName = this.dataUtils.getGenreNameFromId(Number(genreId), this.selectedMediaType());

      // Sets the page text based on the given genre
      this.categoryText.set(`Popular ${genreName}`);

      this.genre.set({id: genreId, name: genreName});
    });
  }

  onScroll() {
      this.lib.getItemListFromApi(this.selectedMediaType(), this.categoryText().toLowerCase(), this.genre().id, this.nextPage);
      this.nextPage++;
  }

}
