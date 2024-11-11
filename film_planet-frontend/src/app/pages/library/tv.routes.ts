import { Route } from '@angular/router';

export default [
  {
    path: 'recent',
    loadComponent: () => import('./tv-recent/tv-recent.component').then((c) => c.TvRecentComponent),
  },
  {
    path: 'popular',
    loadComponent: () => import('./tv-popular/tv-popular.component').then((c) => c.TvPopularComponent),
  },{
    path: 'genres',
    loadComponent: () => import('./tv-genres/tv-genres.component').then((c) => c.TvGenresComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
] as Route[];
