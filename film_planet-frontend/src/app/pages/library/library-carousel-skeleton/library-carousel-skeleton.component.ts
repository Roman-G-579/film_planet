import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-library-carousel-skeleton',
  standalone: true,
  imports: [
    SkeletonModule,
  ],
  templateUrl: './library-carousel-skeleton.component.html',
  styleUrl: './library-carousel-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryCarouselSkeletonComponent {

  counterArray(n: number): any[] {
    return Array(n);
  }
}
