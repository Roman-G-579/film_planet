import {inject, Injectable, signal} from '@angular/core';
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

  userData = signal<UserResponse>({
    __v: 0,
    _id: '',
    createdAt: new Date(),
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  });

  login(email: string, password: string): Observable<{ token: string, user: UserResponse }> {
    const pageUrl = `auth/login`;
    const { href } = new URL(pageUrl, this.apiUrl);

    return this.http
      .post<{ token: string, user: UserResponse }>(href, { email, password } )
      .pipe(
        tap({
          next: (data: { token: string, user: UserResponse}) => {
            const protectedData = data.user as UserResponse;
            this.userData.set(protectedData);
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
}
