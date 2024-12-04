import { Route } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'film/popular',
    pathMatch: 'full',
  },
  {
    path: 'tv/recent',
    data: { type: 'tv', category: 'recent'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'tv/popular',
    data: { type: 'tv', category: 'popular'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'tv/:genre',
    data: { type: 'tv', category: 'genre'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'film/recent',
    data: { type: 'film', category: 'recent'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'film/popular',
    data: { type: 'film', category: 'popular'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'film/:genre',
    data: { type: 'film', category: 'genre'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
] as Route[];
