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
    path: 'library',
    loadChildren: () => import('./library/library-categories.routes'),
  },
  {
    path: 'genres',
    loadChildren: () => import('./genres/genres.routes'),
  },
  // {
  //   path: 'genres-film',
  //   data: { type: 'films' },
  //   loadChildren: () => import('./library/library-categories.routes'),
  //   //loadComponent: () => import('./genres/genres.component').then((c) => c.GenresComponent),
  // },
  // {
  //   path: 'genres-tv',
  //   data: { type: 'tv' },
  //   loadChildren: () => import('./library/library-categories.routes'),
  //   //loadComponent: () => import('./genres/genres.component').then((c) => c.GenresComponent),
  // },
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
  // {
  //   path: 'genres-film/:genre',
  //   data: { category: 'genre'},
  //   loadComponent: () => import('./library/library.component').then((c) => c.LibraryComponent),
  // },
  {
    path: '**',
    redirectTo: 'home'
  }
] as Route[];
