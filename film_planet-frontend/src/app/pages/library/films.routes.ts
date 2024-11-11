import { Route } from '@angular/router';

export default [
  {
    path: 'recent',
    loadComponent: () => import('./films-recent/films-recent.component').then((c) => c.FilmsRecentComponent),
  },
  {
    path: 'popular',
    loadComponent: () => import('./films-popular/films-popular.component').then((c) => c.FilmsPopularComponent),
  },{
    path: 'genres',
    loadComponent: () => import('./films-genres/films-genres.component').then((c) => c.FilmsGenresComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
] as Route[];
