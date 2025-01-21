import {Component, Inject, LOCALE_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {PrimeNGConfig} from 'primeng/api';
import {Aura} from 'primeng/themes/aura';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  template: '<router-outlet/>',
})
export class AppComponent {

  constructor(
    private config: PrimeNGConfig,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private locale: string) {
    this.config.theme.set({
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: '.film_planet-dark',
        cssLayer: false
      }
    });

    this.setLanguageClass(this.locale);
  }

  /**
   * Sets a class based on the chosen language. Used to handle right-to-left languages like hebrew and arabic.
   * @param locale the locale name
   */
  private setLanguageClass(locale: string): void {
    const htmlElement = this.document.documentElement;
    if (locale === 'he') {
      htmlElement.classList.add('lang-he');
    } else {
      htmlElement.classList.remove('lang-he');
    }
  }
}
