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
import {LibraryService} from './library.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
    imports: [
        ButtonModule,
        CarouselModule,
        DataViewModule,
        NgForOf,
        SharedModule,
        SkeletonModule
    ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent implements OnInit {
  protected readonly lib = inject(LibraryService);
  private route = inject(ActivatedRoute);

  libraryItems: WritableSignal<LibraryItem[]> = signal<LibraryItem[]>([]);

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
    this.route.data.subscribe(data => {
      if (data['type'] === 'films') {
        this.libraryItems.set(this.lib.getRecentFilms());
      }
      else if (data['type'] === 'tv') {
        this.libraryItems.set(this.lib.getRecentTV());
      }
    });


    this.carouselItems = this.libraryItems().slice(0,5);
    this.tableItems = this.libraryItems().slice(5,10);
  }

  counterArray(n: number): any[] {
    return Array(n);
  }
}
