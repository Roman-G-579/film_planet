import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {UserResponse} from '../interfaces/db-responses/user-response.interface';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}auth`;
  private readonly http = inject(HttpClient);

  isLoggedIn: Signal<string | null> = computed(() => localStorage.getItem('token'));

  userData = signal<UserResponse>({
    __v: 0,
    _id: '',
    createdAt: new Date(),
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  });

  login(username: string, password: string): Observable<{ token: string, user: UserResponse }> {
    const pageUrl = `auth/login`;
    const { href } = new URL(pageUrl, this.apiUrl);

    return this.http
      .post<{ token: string, user: UserResponse }>(href, { username, password } )
      .pipe(
        tap({
          next: (data: { token: string, user: UserResponse}) => {
            const userData = data.user as UserResponse;
            this.userData.set(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log(this.userData())
          },
          error: (err: unknown) => {
            console.error('Error fetching protected data', err);
          }
        }),
      );
  }

  fetchUserData(token: string): Observable<UserResponse> {
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
    localStorage.removeItem('token');
  }
}
