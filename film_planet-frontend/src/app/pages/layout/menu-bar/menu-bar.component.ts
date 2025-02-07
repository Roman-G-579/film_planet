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
import {NgIf} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {LoginWindowComponent} from './login-window/login-window.component';

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
    SearchWindowComponent,
    NgIf,
    InputTextModule,
    LoginWindowComponent
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
      flag_img: '/assets/language-flags/english.png'
    },
    {
      language: Language.Hebrew,
      name: 'HE',
      flag_img: '/assets/language-flags/hebrew.png'
    },
    {
      language: Language.Russian,
      name: 'RU',
      flag_img: '/assets/language-flags/russian.png'
    }
  ];

  menuOptions = [
    {
      label: $localize`:@@menu.films:Films`,
      route: '/pages/library/film/recent',
      items: [
        {
          label: $localize`:@@menu.films.recent:Recently released films`,
          routerLink: '/pages/library/film/recent',
        },
        {
          label: $localize`:@@menu.films.popular:Most popular Films`,
          routerLink: '/pages/library/film/popular',
        },
        {
          label: $localize`:@@menu.films.top200:Top 200 Films`,
          routerLink: '/pages/top-films',
        },
        {
          label: $localize`:@@menu.films.genre:Browse films by genre`,
          routerLink: '/pages/genres/film',
        }
      ]
    },
    {
      label: $localize`:@@menu.tv:TV`,
      route: '/pages/library/tv/recent',
      items: [
        {
          label: $localize`:@@menu.tv.recent:Recently released TV Shows`,
          routerLink: '/pages/library/tv/recent',
        },
        {
          label: $localize`:@@menu.tv.popular:Most popular TV Shows`,
          routerLink: '/pages/library/tv/popular',
        },
        {
          label: $localize`:@@menu.tv.top200:Top 200 TV shows`,
          routerLink: '/pages/top-tv',
        },
        {
          label: $localize`:@@menu.tv.genre:Browse TV Shows by genre`,
          routerLink: '/pages/genres/tv',
        }
      ]
    },
    {
      label: $localize`:@@menu.top200:Top 200`,
      route: '/pages/top-films',
      items: [],
    },
  ];


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
