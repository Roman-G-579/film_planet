import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ContentComponent} from './layout/content/content.component';
import {MenuBarComponent} from './layout/menu-bar/menu-bar.component';
import {FooterComponent} from './layout/footer/footer.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    ContentComponent,
    MenuBarComponent,
    FooterComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent {

}
