import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
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
    const { href } = new URL('auth/login', this.apiUrl); // localhost:3000/api/auth/login

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

  refreshToken(): Observable<{ token: string }> {
    const { href } = new URL('auth/refresh-token', this.apiUrl); // localhost:3000/api/auth/refresh-token

    return this.http
      .get<{ token: string }>(href)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
        }),
        catchError((err) => {
          this.logout();
          return throwError(() => new Error('Session expired'));
        })
      );
  }

  /**
   * Returns all available details for the user with the corresponding token,
   * including their personal data, their ratings, and their reviews
   * @param token the user's access token
   */
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
        console.log("TEST")
        this.logout();
        //TODO: alter function to work with refresh tokens

        // return throwError(() => new Error('Error restoring session'));
      }

    }
  }

  logout() {
    const { href } = new URL('auth/logout', this.apiUrl); // localhost:3000/api/auth/logout

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

    this.http.post(href, {}).subscribe();
    this.router.navigate(['/','pages','home']).then();
  }

  /**
   * Saves the user data and the access token, and sets the isloggedIn signal's state to 'true'
   * @param data the user's details and access token
   */
  private handleSuccessfulLogin(data: { token: string, user: UserResponse }) {
    const { token, user } = data;
    console.log(data);
    console.log(token);
    // Stores the token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));

    this.userData.set(user);
    this.isLoggedIn.set(true);

    // Navigates to the home page
    this.router.navigate(['/','pages','home']).then();
  }
}
