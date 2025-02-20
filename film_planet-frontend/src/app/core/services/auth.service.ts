import {inject, Injectable, OnInit, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {UserResponse} from '../interfaces/db-responses/user-response.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}`;
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

  /**
   * Sends a login request to the server with the given credentials
   * If the credentials are valid, the server returns an access token and the User object
   * with the relevant details, and the function calls the handleSuccessfulLogin function
   * with the retrieved details
   * @param username the given username string
   * @param password the given password string
   */
  login(username: string, password: string): Observable<{ token: string, user: UserResponse }> {
    const { href } = new URL('auth/login', this.apiUrl); // localhost:3000/api/auth/login

    return this.http
      .post<{ token: string, user: UserResponse }>(href, { username, password }, {withCredentials: true} )
      .pipe(
        tap((data: { token: string, user: UserResponse }) => this.handleSuccessfulLogin(data)),
            catchError((err) => {
              console.error('Login error:', err);
              return throwError(() => new Error('Invalid email or password'));
            })
      );
  }

  /**
   * Sends a refresh token request to the server, which retrieves a new access token.
   *
   * The token is then saved in localStorage.
   */
  refreshToken(): Observable<{ token: string }> {
    const { href } = new URL('auth/refresh-token', this.apiUrl); // localhost:3000/api/auth/refresh-token

    return this.http
      .get<{ token: string }>(href, {withCredentials: true})
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
    const { href } = new URL('auth/user', this.apiUrl); // localhost:3000/api/auth/user
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserResponse>(href, { headers }).pipe(
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

  /**
   * Returns a 'true' observable if the user's access token is still valid,
   * returns a 'false' observable otherwise
   */
  isTokenValid(): Observable<boolean> {
    const token: string | null = localStorage.getItem('token');

    if (!token) { return of(false); }

    const { href } = new URL('auth/validate-token', this.apiUrl); // localhost:3000/api/auth/validate-token

    return this.http.get(href, {withCredentials: true}).pipe(
        map(() => true), // Valid token - returns a 'true' observable
        catchError((err) => {
          console.error(err)
          this.logout();
          return of(false); // Invalid token - - returns a 'false' observable
        })
      );
  }

  /**
   * Sets the user's data signal with the information stored in localStorage,
   * and sets their isLoggedIn status to true
   */
  restoreSession() {
        const userDataString: string | null = localStorage.getItem('userData');

        if (userDataString) {
          const parsedData = JSON.parse(userDataString);

          const parsedUser: UserResponse = {
            ...parsedData,
            createdAt: new Date(parsedData.createdAt),
            updatedAt: parsedData.updatedAt ? new Date(parsedData.updatedAt) : undefined
          };
          this.userData.set(parsedUser);
        }

        this.isLoggedIn.set(true);
  }

  /**
   * Logs the user out of the application:
   * The userData signal is cleared, the isLoggedIn status is set to false,
   * a logout request is sent to the server to clear the refresh token cookie,
   * and the access token and userData are removed from localStorage
   */
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

    // Stores the token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));

    this.userData.set(user);
    this.isLoggedIn.set(true);

    // Navigates to the home page
    this.router.navigate(['/','pages','home']).then();
  }
}
