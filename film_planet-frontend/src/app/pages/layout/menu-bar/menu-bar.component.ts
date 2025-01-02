import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {Language} from '../../../core/enums/language.enum';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MenuModule} from 'primeng/menu';
import {Router} from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {SearchWindowComponent} from '../search-window/search-window.component';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    ButtonModule,
    ToggleSwitchModule,
    Select,
    FormsModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    SplitButtonModule,
    DialogModule,
    SearchWindowComponent
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent implements OnInit {
  private readonly router = inject(Router);

  isDarkModeEnabled: boolean = this.isSystemDark();

  languages = [
    {
      language: Language.English,
      name: 'EN',
    },
    {
      language: Language.Hebrew,
      name: 'HE',
    },
    {
      language: Language.Russian,
      name: 'RU',
    }
  ];

  menuOptions = [
    {
      label: 'Films',
      route: '/pages/library/film/recent',
      items: [
        {
          label: 'Recently released films',
          routerLink: '/pages/library/film/recent',
        },
        {
          label: 'Most popular Films',
          routerLink: '/pages/library/film/popular',
        },
        {
          label: 'Top 200 Films',
          routerLink: '/pages/top-films',
        },
        {
          label: 'Browse films by genre',
          routerLink: '/pages/genres/film',
        }
      ]
    },
    {
      label: 'TV',
      route: '/pages/library/tv/recent',
      items: [
        {
          label: 'Recently released TV Shows',
          routerLink: '/pages/library/tv/recent',
        },
        {
          label: 'Most popular TV Shows',
          routerLink: '/pages/library/tv/popular',
        },
        {
          label: 'Top 200 TV shows',
          routerLink: '/pages/top-tv',
        },
        {
          label: 'Browse TV Shows by genre',
          routerLink: '/pages/genres/tv',
        }
      ]
    },
    {
      label: 'Top 200',
      route: '/pages/top-films',
      items: [],
    },
  ]

  isSearchVisible = false;

  ngOnInit() {
    // Automatically toggles dark mode based on user's system preferences
    if (this.isSystemDark()) {
      this.toggleDarkMode();
    }
  }

  //TODO: change selected language to be based on user preferences
  selectedLanguage = this.languages[0];

  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }

  toggleDarkMode() {
    const element: HTMLHtmlElement | null = document.querySelector('html');
    if (element) {
      element.classList.toggle('film_planet-dark', this.isDarkModeEnabled);
    }
  }

  /**
   * Navigates to the specified route
   * @param route the destination route
   */
  navigate(route: string) {
    this.router.navigate([route]).then();
  }

}
