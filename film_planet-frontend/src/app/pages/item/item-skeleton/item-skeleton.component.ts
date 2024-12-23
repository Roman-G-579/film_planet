import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SkeletonModule} from 'primeng/skeleton';

@Component({
  selector: 'app-item-skeleton',
  standalone: true,
  imports: [
    SkeletonModule
  ],
  templateUrl: './item-skeleton.component.html',
  styleUrl: './item-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemSkeletonComponent {

}
