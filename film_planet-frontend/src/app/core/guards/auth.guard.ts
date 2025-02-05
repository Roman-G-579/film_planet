import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';

export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      return  this.authService.fetchUserData(token).pipe(
        map( () => true),
        catchError( () => {
          this.router.navigate(['/login']);
          return of(false);
        }),
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
