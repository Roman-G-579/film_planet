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
    path: 'top',
    loadComponent: () => import('./top/top.component').then((c) => c.TopComponent),
  }
] as Route[];
