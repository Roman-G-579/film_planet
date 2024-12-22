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

import {ItemUrlPipePipe} from '../../core/pipes/item-url-pipe.pipe';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';

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
    ItemUrlPipePipe,
    PosterUrlPipePipe,
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

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);
  // Items appearing on the carousel at the top-titles of the page
  carouselItems: Signal<LibraryItem[]> = computed<LibraryItem[]>(() => this.libraryItems().slice(0,5));

  // Items appearing on the table below the carousel
  tableItems: Signal<LibraryItem[]> = computed<LibraryItem[]>(() => this.libraryItems().slice(5,20));

  isLoading = this.lib.isLoading;


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
        this.getGenreItemsAndSetCategoryText();
      }

    });

  }

  /**
   * Returns a list of library items matching the specified genre,
   * and sets a matching value for the title string
   */
  getGenreItemsAndSetCategoryText() {
    this.route.paramMap.subscribe((params) => {

      const genre = params.get('genre') || '';

      // Filters the library items based on the given genre
      this.lib.getItemListFromApi(this.selectedMediaType(), 'genre', genre);

      // Sets the page text based on the given genre
      const genreName = this.dataUtils.getGenreNameFromId(Number(genre), this.selectedMediaType());
      this.categoryText.set(genreName);
    })
  }

  counterArray(n: number): any[] {
    return Array(n);
  }
}
