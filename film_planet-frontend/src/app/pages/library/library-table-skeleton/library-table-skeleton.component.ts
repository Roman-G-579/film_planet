import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SkeletonModule} from 'primeng/skeleton';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-library-table-skeleton',
  standalone: true,
  imports: [
    SkeletonModule,
    NgForOf
  ],
  templateUrl: './library-table-skeleton.component.html',
  styleUrl: './library-table-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryTableSkeletonComponent {

  counterArray(n: number): any[] {
    return Array(n);
  }
}
