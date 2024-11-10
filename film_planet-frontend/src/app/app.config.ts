import {ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling
} from '@angular/router';

import routes from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {NgPipesModule} from 'ngx-pipes';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {GlobalErrorHandler} from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withHashLocation(),
    ),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    provideAnimations(),
    importProvidersFrom(NgPipesModule),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
};
