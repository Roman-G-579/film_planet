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
import {ActivatedRoute} from '@angular/router';
import {GenreNamesPipe} from '../../core/pipes/genre-names.pipe';
import {MediaType} from '../../core/enums/media-type.enum';

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
    GenreNamesPipe
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  private route = inject(ActivatedRoute);

  //TODO: fix genre page routing
  libraryItems: WritableSignal<LibraryItem[]> = this.lib.libraryItems;

  categoryText: WritableSignal<string> = signal("");
  mediaTypeText: WritableSignal<string> = signal("");

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
    this.route.data.subscribe((data) => {
      if (data['type'] === 'film') {
        this.lib.filterByMediaType(MediaType.Film);
        this.mediaTypeText.set("Films");
      }
      else if (data['type'] === 'tv') {
        this.lib.filterByMediaType(MediaType.TV);
        this.mediaTypeText.set("TV shows");
      }

      if(data['category'] === 'recent') {
        this.lib.filterByRecent();
        this.categoryText.set("Recent");
      }
      else if (data['category'] === 'popular') {
        this.lib.filterByPopular();
        this.categoryText.set("Popular");
      }
    });

    this.carouselItems = this.libraryItems().slice(0,5);
    this.tableItems = this.libraryItems().slice(5,10);
  }

  counterArray(n: number): any[] {
    return Array(n);
  }
}
