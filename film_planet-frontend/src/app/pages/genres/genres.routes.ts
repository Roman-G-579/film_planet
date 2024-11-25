import {Route} from '@angular/router';

export default  [
  {
    path: 'films',
    data: { category: 'films'},
    loadComponent: () => import('./genres.component').then((c) => c.GenresComponent),
  },
  {
    path: 'tv',
    data: { category: 'tv'},
    loadComponent: () => import('./genres.component').then((c) => c.GenresComponent),
  },
  {
    path: ':genre',
    data: { category: 'genre'},
    loadComponent: () => import('../library/library.component').then((c) => c.LibraryComponent),
  }
] as Route[];
