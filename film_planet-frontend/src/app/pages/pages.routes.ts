import {Route, UrlMatchResult, UrlSegment} from '@angular/router';

/**
 * Matches a route against a URL containing 'film' or 'tv' in its segments array
 *
 * If no such value exists, returns null
 * @param segments the URL segments array
 */
export function mediaTypeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length === 2 && (segments[0].path === 'film' || segments[0].path === 'tv')) {
    return {
      consumed: segments,
      posParams: {
        'media-type': segments[0],
        item: segments[1],
      },
    };
  }
  return null; // Reject the route if it doesn't match
}

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
    matcher: mediaTypeMatcher, // 'film/:item' , 'tv/:item'
    loadComponent: () => import('./item/item.component').then((c)=> c.ItemComponent),
  },
  {
    path: 'person/:id',
    loadComponent: () => import('./person/person.component').then((c)=> c.PersonComponent),
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
