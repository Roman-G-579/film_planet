import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {UserResponse} from '../interfaces/db-responses/user-response.interface';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}auth`;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);

  userData: WritableSignal<UserResponse> = signal<UserResponse>({
    __v: 0,
    _id: '',
    createdAt: new Date(),
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  });

  login(username: string, password: string): Observable<{ token: string, user: UserResponse }> {
    const { href } = new URL('auth/login', this.apiUrl);

    return this.http
      .post<{ token: string, user: UserResponse }>(href, { username, password } )
      .pipe(
        tap((data: { token: string, user: UserResponse }) => this.handleSuccessfulLogin(data)),
            catchError((err) => {
              console.error('Login error:', err);
              return throwError(() => new Error('Invalid email or password'));
            })
      );
  }

  fetchUserProfile(token: string): Observable<UserResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserResponse>(`${this.apiUrl}/user`, { headers }).pipe(
      tap({
        next: (data: UserResponse) => {
          this.userData.set(data);
        },
        error: (err: unknown) => {
          console.error('Error fetching user data', err);
        },
      }),
    );
  }

  restoreSession() {
    const token: string | null = localStorage.getItem('token');
    const userDataString: string | null = localStorage.getItem('userData');
    if (token && userDataString) {
      try {
        const parsedData = JSON.parse(userDataString);

        const parsedUser: UserResponse = {
          ...parsedData,
          createdAt: new Date(parsedData.createdAt),
          updatedAt: parsedData.updatedAt ? new Date(parsedData.updatedAt) : undefined
        };
        this.userData.set(parsedUser);
        this.isLoggedIn.set(true);
      } catch (error) {
        console.error('Error restoring session', error);
        this.logout();
      }

    }
  }

  logout() {
    this.userData.set({
      __v: 0,
      _id: '',
      createdAt: new Date(),
      email: '',
      firstName: '',
      lastName: '',
      username: '',
    });
    this.isLoggedIn.set(false);

    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/','pages','home']).then();
  }

  private handleSuccessfulLogin(data: { token: string, user: UserResponse }) {
    const { token, user } = data;

    // Stores the token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));

    this.userData.set(user);
    this.isLoggedIn.set(true);

    // Navigates to the home page
    this.router.navigate(['/','pages','home']).then();
  }
}
