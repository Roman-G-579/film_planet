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
  {
    path: 'tv/:item',
    loadComponent: () => import('./item/item.component').then((c)=> c.ItemComponent),
  },
  {
    path: 'film/:item',
    loadComponent: () => import('./item/item.component').then((c)=> c.ItemComponent),
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
