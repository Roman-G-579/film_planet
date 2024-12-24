import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SkeletonModule} from "primeng/skeleton";
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-library-carousel-skeleton',
  standalone: true,
  imports: [
    SkeletonModule,
    NgClass,
    NgForOf,
  ],
  templateUrl: './library-carousel-skeleton.component.html',
  styleUrl: './library-carousel-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryCarouselSkeletonComponent {

  skeletonArray(): number[] {
    return Array.from({ length: 6 }, (_, i) => i);
  }
}
