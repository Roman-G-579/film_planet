import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      return  this.authService.fetchUserProfile(token).pipe(
        map( () => true),
        catchError( () => {
          this.router.navigate(['/', 'pages', 'home']).then();
          return of(false);
        }),
      );
    } else {
      this.router.navigate(['/', 'pages', 'home']).then();
      return false;
    }
  }

}
