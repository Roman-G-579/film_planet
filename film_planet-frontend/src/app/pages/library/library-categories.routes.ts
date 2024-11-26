import { Route } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'popular',
    pathMatch: 'full',
  },
  {
    path: 'recent',
    data: { category: 'recent'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: 'popular',
    data: { category: 'popular'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: ':genre',
    data: { category: 'genre'},
    loadComponent: () => import('./library.component').then((c) => c.LibraryComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
] as Route[];
