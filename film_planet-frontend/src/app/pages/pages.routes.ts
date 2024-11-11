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
    loadComponent: () => import('./films/films.component').then((c) => c.FilmsComponent),
  }
] as Route[];
