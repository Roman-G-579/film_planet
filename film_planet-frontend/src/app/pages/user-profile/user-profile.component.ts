import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ProfileHeaderComponent} from './profile-header/profile-header.component';
import {ProfileRatingsPreviewComponent} from './profile-ratings-preview/profile-ratings-preview.component';
import {ProfileReviewsPreviewComponent} from './profile-reviews-preview/profile-reviews-preview.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ProfileRatingsPreviewComponent,
    ProfileReviewsPreviewComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {

}
