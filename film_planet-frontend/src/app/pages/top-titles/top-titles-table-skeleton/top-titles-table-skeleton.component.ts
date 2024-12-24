import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-top-titles-table-skeleton',
  standalone: true,
    imports: [
        NgForOf,
        SkeletonModule
    ],
  templateUrl: './top-titles-table-skeleton.component.html',
  styleUrl: './top-titles-table-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitlesTableSkeletonComponent {
  counterArray(n: number): any[] {
    return Array(n);
  }
}
