import {Route} from '@angular/router';

export default  [
  {
    path: 'films',
    data: { category: 'films'},
    loadComponent: () => import('./genres.component').then((c) => c.GenresComponent),
  },{
    path: 'tv',
    data: { category: 'tv'},
    loadComponent: () => import('./genres.component').then((c) => c.GenresComponent),
  }
] as Route[];
