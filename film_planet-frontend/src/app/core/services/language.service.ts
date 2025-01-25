import {inject, Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class LanguageService {
  private document = inject(DOCUMENT);

  /**
   * Returns true if the application's language is currently hebrew
   */
  isHebrewLanguage(): boolean {
    return this.document.documentElement.classList.contains('lang-he');
  }
}
