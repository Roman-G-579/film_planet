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
    data: { type: 'films' },
    loadChildren: () => import('./library/library-categories.routes'),
    loadComponent: () => import('./library/library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'tv',
    data: { type: 'tv' },
    loadChildren: () => import('./library/library-categories.routes'),
    loadComponent: () => import('./library/library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'genres',
    loadChildren: () => import('./genres/genres.routes'),
    loadComponent: () => import('./genres/genres.component').then((c) => c.GenresComponent),
  },
  {
    path: 'top-films',
    data: { type: 'films' },
    loadComponent: () => import('./top-titles/top-titles.component').then((c) => c.TopTitlesComponent),
  },
  {
    path: 'top-tv',
    data: { type: 'tv' },
    loadComponent: () => import('./top-titles/top-titles.component').then((c) => c.TopTitlesComponent),
  },
  {
    path: '**',
    redirectTo: 'home'
  }
] as Route[];
