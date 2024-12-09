import {Route} from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.routes'),
    loadComponent: () => import('./pages/pages.component').then((c) => c.PagesComponent),
  },
  {
    path: '**',
    redirectTo: 'pages/home',
  }
] as Route[];
