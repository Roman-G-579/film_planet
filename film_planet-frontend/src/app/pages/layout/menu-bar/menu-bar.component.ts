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
import {NgIf} from '@angular/common';
import {SplitButtonModule} from 'primeng/splitbutton';

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
    NgIf,
    SplitButtonModule
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
      route: '/pages/films/recent',
      items: [
        {
          label: 'Recently released films',
          routerLink: '/pages/films/recent'
        },
        {
          label: 'Most popular Films',
          routerLink: '/pages/films/popular',
        },
        {
          label: 'Browse films by genre',
          routerLink: '/pages/genres/films',
        }
      ]
    },
    {
      label: 'TV',
      route: '/pages/tv/recent',
      items: [
        {
          label: 'Recently released TV Shows',
          routerLink: '/pages/tv/recent'
        },
        {
          label: 'Most popular TV Shows',
          routerLink: '/pages/tv/popular',
        },
        {
          label: 'Browse TV Shows by genre',
          routerLink: '/pages/genres/tv',
        }
      ]
    },
    {
      label: 'Top 100',
      route: '/pages/top',
      items: [],
    },
  ]

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

  showSearch() {
    console.log("search bar - on")
  }

  /**
   * Navigates to the specified route
   * @param route the destination route
   */
  navigate(route: string) {
    this.router.navigate([route]).then();
  }
}
