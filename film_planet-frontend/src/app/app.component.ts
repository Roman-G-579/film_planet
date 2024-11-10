import {AfterViewInit, Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {PrimeNGConfig} from 'primeng/api';
import {Aura} from 'primeng/themes/aura';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  template: '<router-outlet/>',
})
export class AppComponent {

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: '.film_planet-dark',
        cssLayer: false
      }
    })
  }


}
