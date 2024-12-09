import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {GenreNamesPipe} from '../../core/pipes/genre-names.pipe';
import {MediaType} from '../../core/enums/media-type.enum';
import {DataUtils} from '../../core/utils/data.utils';

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
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  protected readonly dataUtils = DataUtils;
  private route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  libraryItems: WritableSignal<LibraryItem[]> = this.lib.libraryItems;

  categoryText: WritableSignal<string> = signal("");
  mediaTypeText: WritableSignal<string> = signal("");

  selectedMediaType: WritableSignal<MediaType> = signal(MediaType.Film);
  // Items appearing on the carousel at the top-titles of the page
  carouselItems: LibraryItem[] = [];

  // Items appearing on the table below the carousel
  tableItems: LibraryItem[] = [];

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
        this.lib.filterByMediaType(MediaType.Film);
        this.mediaTypeText.set("Films");
      }
      else if (data['type'] === 'tv') {
        this.selectedMediaType.set(MediaType.TV);
        this.lib.filterByMediaType(MediaType.TV);
        this.mediaTypeText.set("TV shows");
      }


      // Selecting category of current page
      if(data['category'] === 'recent') {
        this.lib.filterByRecent();
        this.categoryText.set("Recent");
      }
      else if (data['category'] === 'popular') {
        this.lib.filterByPopular();
        this.categoryText.set("Popular");
      }
      else if (data['category'] === 'genre') {
        this.getGenreItemsAndSetCategoryText();
      }
    });

    this.carouselItems = this.libraryItems().slice(0,5);
    this.tableItems = this.libraryItems().slice(5,10);
  }

  /**
   * Returns a list of library items matching the specified genre,
   * and sets a matching value for the title string
   */
  getGenreItemsAndSetCategoryText() {
    this.route.paramMap.subscribe((params) => {

      const genreNum = Number(params.get('genre'));

      // Sets the page text based on the given genre
      const genreName = this.dataUtils.getGenreNameFromId(genreNum, this.selectedMediaType());
      this.categoryText.set(genreName);

      // Filters the library items based on the given genre
      this.lib.filterByGenre(params.get('genre') || '');
    })
  }

  counterArray(n: number): any[] {
    return Array(n);
  }

}
