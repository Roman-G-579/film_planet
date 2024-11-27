import {Route} from '@angular/router';

export default  [
  {
    path: 'film',
    data: { type: 'film'},
    loadComponent: () => import('./genres.component').then((c) => c.GenresComponent),
  },
  {
    path: 'tv',
    data: { type: 'tv'},
    loadComponent: () => import('./genres.component').then((c) => c.GenresComponent),
  },
  // {
  //   path: ':genre',
  //   data: { category: 'genre'},
  //   loadComponent: () => import('../library/library.component').then((c) => c.LibraryComponent),
  // }
] as Route[];
