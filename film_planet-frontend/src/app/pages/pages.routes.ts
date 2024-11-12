import {Route} from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import ('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'films',
    loadChildren: () => import('./library/films.routes'),
    loadComponent: () => import('./library/films-recent/films-recent.component').then((c) => c.FilmsRecentComponent),
  },
  {
    path: 'tv',
    loadChildren: () => import('./library/tv.routes'),
    loadComponent: () => import('./library/tv-recent/tv-recent.component').then((c) => c.TvRecentComponent),
  },
  {
    path: 'top',
    loadComponent: () => import('./top/top.component').then((c) => c.TopComponent),
  }
] as Route[];
